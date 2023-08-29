FROM python:3.8-slim

# Set the working directory
WORKDIR /Flask_weather_Notification

# Copy the requirements file
COPY requirements.txt .

# Install the requirements
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . .

# Set the command to run your application
CMD ["python", "./app.py"]
