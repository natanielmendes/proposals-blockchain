# Use Node.js LTS version
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies first (caching)
COPY package*.json ./
RUN npm install

# Copy project files
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"] 