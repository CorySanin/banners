FROM node:lts-alpine3.19 as deploy

WORKDIR /usr/src/banners

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080
CMD [ "node", "index.js"]
