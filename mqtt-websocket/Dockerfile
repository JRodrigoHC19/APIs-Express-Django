FROM node:18

WORKDIR /home/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 8060

CMD ["npm", "run", "dev"]

# CMD ["npm", "run", "prod"]