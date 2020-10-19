FROM node:12.16-alpine

RUN apk add --no-cache curl

COPY . .

RUN npm install

CMD ["node", "index.js"]


