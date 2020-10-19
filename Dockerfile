FROM node:12.16

RUN yarn add discord.js 

COPY . .

RUN yarn install

CMD ["node", "index.js"]


