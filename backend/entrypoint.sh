#!/bin/sh
# Run migrations and generate Prisma client
npx prisma migrate dev --name init --skip-seed
npx prisma generate

# Start the server
node index.js
