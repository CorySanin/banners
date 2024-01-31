FROM node:lts-alpine3.19 as deploy

EXPOSE 8080
ENV PORT=8080
HEALTHCHECK  --timeout=3s \
  CMD curl --fail http://localhost:${PORT}/healthcheck || exit 1

WORKDIR /usr/src/banners

COPY package*.json ./

RUN apk add --no-cache curl &&\
    npm install

COPY . .

CMD [ "node", "index.js"]
