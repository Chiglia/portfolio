FROM node:latest

WORKDIR /test

COPY package.json .

RUN npm install
RUN npm install -g nodemon

COPY . .

EXPOSE ${ENV_PORT}

CMD nodemon index.js