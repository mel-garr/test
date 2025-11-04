FROM node:20

WORKDIR /app

# Copy only package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install
# Copy prisma folder and source code
COPY prisma ./prisma/
COPY . .

# Generate Prisma client inside the container
EXPOSE 4000


# Expose port

# Start app
ENTRYPOINT ["./entrypoint.sh"]
