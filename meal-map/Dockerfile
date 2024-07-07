# latest alpine node image
FROM node:alpine

WORKDIR /app

RUN npm install -g pnpm
RUN apk add --no-cache postgresql-client

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

RUN ppnpm prisma generate

RUN pnpm build

EXPOSE 3000

# Create a script to run migrations, seed data, and start the application
RUN echo '#!/bin/sh' > /app/start.sh && \
    echo 'pnpm prisma migrate deploy' >> /app/start.sh && \
    echo 'pnpm prisma db seed' >> /app/start.sh && \
    echo 'pnpm start' >> /app/start.sh && \
    chmod +x /app/start.sh

# Run the script
CMD ["sh", "/app/start.sh"]