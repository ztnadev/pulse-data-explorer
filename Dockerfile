# This is the newer version

FROM node:18-alpine

WORKDIR /app

COPY package.json .

COPY package-lock.json .

RUN npm install

#RUN npm i -g serve

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "dev" ]
