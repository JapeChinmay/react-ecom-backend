# Use lightweight Node
FROM node:18-alpine

# Set work dir
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all backend files
COPY . .

# Generate prisma client
RUN npx prisma generate

# Expose backend port
EXPOSE 5000

# Start app
CMD ["npm", "start"]
