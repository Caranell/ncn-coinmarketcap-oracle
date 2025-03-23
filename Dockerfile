# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json before installing dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Set environment variables (can be overridden at runtime)
ENV COINMARKETCAP_API_ADDRESS="https://pro-api.coinmarketcap.com/v1/"
# ENV COINMARKETCAP_API_KEY="your_api_key" # Best practice: set this at runtime

# Define the default interval (can be overridden at runtime)
ENV INTERVAL=60

# Command to run the script
CMD ["node", "oracle.js"]
