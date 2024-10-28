# Use an official node image as the base
FROM node:14-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy the rest of the application and build it
COPY . .
RUN yarn build

# Use nginx to serve the static files
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expose the default port
EXPOSE 80
