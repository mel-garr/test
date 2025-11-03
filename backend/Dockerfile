FROM node:20

WORKDIR /app

# Copy only package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm install -g nodemon 
# Copy prisma folder and source code
COPY prisma ./prisma/
COPY . .

# Generate Prisma client inside the container
RUN npx prisma generate

# Expose port
EXPOSE 4000

# Start app
CMD ["node", "nodemon", "index.js"]
