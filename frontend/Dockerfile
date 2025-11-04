FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# # 👇 Add this line (forces Next.js to run in watch mode)
# ENV CHOKIDAR_USEPOLLING=true
# ENV WATCHPACK_POLLING=true

EXPOSE 3000

CMD ["npm", "run", "dev"]
