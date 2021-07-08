FROM node:lts-alpine

WORKDIR /usr/src/app/backend

COPY backend/package*.json ./
RUN npm install

COPY backend/. .

CMD ["npm", "start"]