FROM node:12
RUN apt-get update && apt-get install -y openjdk-8-jdk



WORKDIR /app

copy package.json ./


RUN npm install

COPY . .


EXPOSE 5000

CMD ["node","index.js"]


