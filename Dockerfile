FROM node:18.16.0-alpine
WORKDIR /client
COPY client/package* ./
RUN npm install

FROM node:18.16.0-alpine
WORKDIR /server
COPY server/package* ./
RUN npm install

EXPOSE 3000
CMD ["npm", "run", "server:dev"]