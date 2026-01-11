# Use Node.js 20 as the base image
FROM node:20-slim

# Set the working directory for the extension
WORKDIR /extension

# Copy all extension files into the image
COPY . .

# Go into the server directory, install dependencies and build
WORKDIR /extension/mcp-server
RUN npm ci
RUN npm run build

# Set the final working directory back to the extension root
WORKDIR /extension
