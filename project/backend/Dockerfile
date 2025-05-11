FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies
RUN npm install

# Create directory for frontend files
RUN mkdir -p /app/public

# We don't need to copy the source code here
# as it will be mounted as a volume

EXPOSE 3000

# Use nodemon in development for hot reloading
RUN npm install -g nodemon

# Start with nodemon for development
CMD ["nodemon", "server.js"]