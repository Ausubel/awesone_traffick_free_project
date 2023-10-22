FROM node:18

WORKDIR /home
COPY package.json .
RUN npm install

COPY . .
CMD npm start