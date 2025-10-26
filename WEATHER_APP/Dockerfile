FROM node:22-alpine

WORKDIR /app

# Copy dependency files first for better caching
COPY package*.json ./

RUN npm install

# Copy the rest of the app
COPY . .

CMD ["npm", "start"]
