FROM node:18

WORKDIR /app

COPY backend/package*.json ./

RUN npm install --omit=dev

COPY backend/src ./src

COPY frontend ./frontend

EXPOSE 3000

CMD ["npm", "start"]
