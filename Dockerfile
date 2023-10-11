# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json to the container
COPY package*.json ./
COPY resources ./

# Install application dependencies
RUN npm install

# Bundle your source code inside the Docker image
COPY . .

# Expose a port that your application will listen on
EXPOSE 3035

# Define the command to run your application
CMD [ "npm", "start" ]
