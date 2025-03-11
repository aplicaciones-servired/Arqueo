# Use Node.js 18 as the base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock first to leverage layer caching
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application files
COPY . .

# Debug: List files in the container
RUN ls -R /app

# Expose the port
EXPOSE 3000

# Command to run the application
CMD ["yarn", "start"]