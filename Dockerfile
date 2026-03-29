# Use Node 20 image as the base
FROM node:lts-bullseye

# Set working directory
WORKDIR /portfolio

# Copy project files
COPY package*.json ./
RUN yarn install --immutable

# Copy remaining files (excluding node_modules via .dockerignore)
COPY . .

# Build for production
RUN yarn build

# Expose Vite preview server port
EXPOSE 8000

# Serve the production build
CMD [ "yarn", "preview", "--host" ]
