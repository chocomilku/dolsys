FROM node:18.16.0-alpine
RUN apk add g++ make py3-pip

ARG APP_VERSION

WORKDIR /app

COPY package*.json ./
COPY interfaces ./interfaces
COPY utils ./utils

RUN npm ci

COPY client ./client
COPY server ./server

WORKDIR /app/client
RUN npm ci

WORKDIR /app/server
RUN npm ci

WORKDIR /app
RUN npm run build

LABEL version=$APP_VERSION
ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "run", "server:start"]
