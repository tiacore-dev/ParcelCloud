# Use an official node image as the base
FROM node:20 as build

# Set working directory
WORKDIR /app

RUN npm install --save-dev webpack-bundle-analyzer


# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install



# Copy the rest of the application and build it
COPY . .
RUN npm run build




# Use nginx to serve the static files
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the default port
EXPOSE 8005
