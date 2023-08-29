from flask import Flask, jsonify, request
import requests
from flask_cors import CORS
from flask_mail import Mail, Message
import os
from dotenv import load_dotenv
import collections
from datetime import datetime

# Load environment variables from .env
load_dotenv()

SMTP_ID = os.getenv("SMTP_ID")
SMTP_GMAIL_PWD = os.getenv("SMTP_GMAIL_PWD")
OWM_API_KEY = os.getenv("OWM_API_KEY")

# Configure Flask-Mail for email sending
app = Flask(__name__)
CORS(app)
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = SMTP_ID
app.config['MAIL_PASSWORD'] = SMTP_GMAIL_PWD
mail = Mail(app)

# Constants for OpenWeatherMap API
API_KEY = OWM_API_KEY
BASE_URL = 'https://api.openweathermap.org/data/2.5/'

# Endpoint to retrieve weather forecast data for a city
@app.route('/forecast/<city>', methods=['GET'])
def get_forecast(city):
    try:
        response = requests.get(BASE_URL + "forecast?" + "q=" + city + "&appid=" + API_KEY)
        response.raise_for_status()  # Check if the API request was successful
        data = response.json()
        tmprange = collections.defaultdict(lambda: collections.defaultdict(list))
        for each in data["list"]:
            dt_object = datetime.fromtimestamp(each["dt"]).strftime("%Y-%m-%d")
            tempF = (each["main"]["temp"] - 273.15) * 9/5 + 32
            tmprange[dt_object]["humidity"].append(each["main"]["humidity"])
            tmprange[dt_object]["temp"].append(round(tempF, 2))
        return jsonify(tmprange)
    except requests.exceptions.RequestException as e:
        return jsonify({"error": "Error fetching forecast data"}), 500

# Endpoint to retrieve current weather data for a city
@app.route('/weather/<city>', methods=['GET'])
def get_weather(city):
    try:
        response = requests.get(BASE_URL + "weather?q={}&appid={}".format(city, API_KEY))
        response.raise_for_status()  # Check if the API request was successful
        data = response.json()
        temperature = (data['main']['temp'] - 273.15) * 9/5 + 32
        data["main"]["tempF"] = round(temperature, 2)
        data["main"]["tempC"] = round(data["main"]["temp"] - 273.15, 2)
        
        if temperature > 90:
            send_alert_email(city, temperature)
        
        return jsonify(data)
    except requests.exceptions.RequestException as e:
        return jsonify({"error": "Error fetching weather data"}), 500
    except Exception as e:
        return jsonify({"error": "An unexpected error occurred"}), 500

# Function to send email alert for high temperature
def send_alert_email(city, temperature):
    msg = Message("High Temperature Alert",
                  sender=SMTP_ID,
                  recipients=["poojan.p@myittechjobs.com"])  # Replace with your email
    msg.body = f"High temperature alert in {city}. Current temperature: {temperature}°F."
    mail.send(msg)

if __name__ == "__main__":
    app.run(debug=True)
