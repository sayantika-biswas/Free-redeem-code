# Stage 1: Build React App
FROM node:20-slim AS build
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Build the app (make sure this creates 'dist' or 'build')
RUN npm run build

# Stage 2: Serve React App using Node.js
FROM node:20-alpine AS production

WORKDIR /app

# Install a lightweight static file server
RUN npm install -g serve

# Copy built React files from previous stage
COPY --from=build /app/dist ./dist

# Expose correct Vite port (default 5173 for dev; 3000 when served)
EXPOSE 5173

# Start the static file server
CMD ["serve", "-s", "dist", "-l", "5173"]
