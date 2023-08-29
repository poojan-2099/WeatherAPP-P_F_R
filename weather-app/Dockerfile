FROM node:14

# Set the working directory
WORKDIR /weather-app

# Copy the requirements file
COPY package*.json ./

# Install the requirements
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port 80 for the app
EXPOSE 80

# Build the app
RUN npm run build

# Set the command to run your application
# Run the app
CMD ["npm", "start"]


# Build the Docker Image:

# Open a terminal in the directory containing your Dockerfile and run the following command to build the Docker image:


# docker build -t my-react-app .
# Replace my-react-app with a suitable name for your image.

# Run the Docker Container:

# After building the image, you can run a container using the following command:


# docker run -p 3000:80 my-react-app
# Replace 3000 with the port you want to expose on your host machine. The app will be accessible at http://localhost:3000.

# Remember to include any necessary configuration files, environment variables, and dependencies your React app needs to function properly within the Docker container.





