
Architecture Overview

1>Frontend
The frontend of the app is built using React. It includes components for displaying current weather, weather forecasts, and user input handling. The app communicates with the backend API to fetch weather data.
=> API Calls
Fetching weather data and forecast data is done using the fetch API.
User input triggers API calls to the Flask backend using the http://127.0.0.1:5000 base URL.

=> API Endpoints
=> /weather/<city>: Returns current weather data for the specified city.
=> /forecast/<city>: Returns forecast data for the specified city.

=>Frontend Setup:

i>Navigate to the frontend directory:

cd weather-app

ii>Install dependencies:

npm install

iii> Run Front-END 

npm start

=>you can see the front-end at :-  http://localhost:3000/

2> Backend
The backend of the app is built using Flask, a Python web framework. It handles requests from the frontend, retrieves weather data from the OpenWeatherMap API, and sends email alerts for high temperatures using Flask-Mail.

i>start the virtual environment using conda to use the safe and proper backend:

=>Creating a Conda Virtual Environment:
        >Install Conda: If you haven't already, download and install Miniconda or Anaconda, which are package managers that include Conda.

        >Open Terminal or Command Prompt: Open a terminal or command prompt on your system.

        >Create a Virtual Environment: Run the following command to create a new Conda virtual environment. Replace myenv with the name you want for your environment.
        
        =>Run the following commands on command prompts with the solution code directory
        1>conda create --name myenv
        
        >Activate the Environment: Activate the newly created environment with:

        On macOS and Linux:
        >conda activate myenv
        
        On Windows:
        >conda activate myenv

ii>Install dependencies:

pip install -r requirements.txt

iii> Run backend

python app.py

Run the app
terminal1 : npm start
terminal2 : python app.py


3>Features and Functionality

=>Current Weather Display
The app displays the current weather information for the specified city. It shows temperature in both Celsius and Fahrenheit, humidity, and weather description.

Weather Forecast Display
The app provides a weather forecast for the specified city. The forecast includes temperature ranges and humidity for each date.

High Temperature Alert
If the current temperature is above 90°F, the app displays a high temperature alert to the user.
=>ALert using email, user has to add their email on spicified location at app.py file.

User Input and Fetching Data
Users can input a city name in the search bar and fetch weather information by clicking the "Get Weather" button. They can also fetch weather forecasts by clicking the "Forecast Weather" button.

4> Extending Functionality
Adding Additional Weather Data
        =>You can extend the frontend to display more detailed weather information such as wind speed, pressure, and more.
        =>Modify the backend to fetch additional weather parameters from the OpenWeatherMap API.

Implementing User Authentication
        =>Enhance the app by adding user authentication to allow users to save their favorite cities and settings.
        =>Utilize libraries like Flask-Login and frontend components for authentication.

5> References
OpenWeatherMap API Documentation-https://openweathermap.org/api
React Documentation- https://legacy.reactjs.org/docs/getting-started.html
Flask Documentation- https://flask.palletsprojects.com/en/2.1.x/
