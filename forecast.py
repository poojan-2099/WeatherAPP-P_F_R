from flask import Flask, jsonify
import requests

app = Flask(__name__)

API_KEY = OWM_API_KEY
BASE_URL = 'http://api.openweathermap.org/data/2.5/forecast?'

@app.route('/forecast/<city>', methods=['GET'])
def get_forecast(city):
    response = requests.get(BASE_URL + "q=" + city + "&appid=" + API_KEY)
    return jsonify(response.json())

if __name__ == '__main__':
    app.run(debug=True)
