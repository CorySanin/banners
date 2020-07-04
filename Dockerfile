FROM node:12-alpine

WORKDIR /usr/src/banners

COPY package*.json ./

RUN apk update && npm install

COPY . .

EXPOSE 8080
CMD [ "node", "index.js"]
