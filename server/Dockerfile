FROM node:18-alpine

WORKDIR /servidor

COPY package*.json .

RUN npm i

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "dev"]