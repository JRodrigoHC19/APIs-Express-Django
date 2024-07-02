FROM node:18-alpine

WORKDIR /home/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 8040

CMD ["npm", "run", "dev"]

# CMD ["npm", "run", "prod"]