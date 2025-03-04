# Use Node 20 image as the base
FROM node:lts-bullseye

# Set working directory
WORKDIR /portfolio

# Copy project files
COPY package*.json ./
RUN yarn install --frozen-lockfile

# Copy remaining files (excluding node_modules)
COPY . . .gitignore/

# Expose Vite development server port (default: 5173)
EXPOSE 5173

# Start the development server using yarn
CMD [ "yarn", "start" ]
