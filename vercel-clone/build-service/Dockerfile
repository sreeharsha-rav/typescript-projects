FROM node:lts-alpine3.19

# install git
RUN apk add --no-cache git

WORKDIR /home/app

COPY main.sh script.js ./

# Make scripts executable
RUN chmod +x main.sh script.js

# Set environment variables
ENV API_SERVER_URL=http://api-server-url:3000/build-job

ENTRYPOINT ["/home/app/main.sh"]