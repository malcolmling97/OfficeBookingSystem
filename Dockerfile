FROM node:20

WORKDIR /app

COPY package*.json .

RUN npm ci --only=production

COPY . .

ENV PORT 3000
EXPOSE $PORT
ENV POSTGRES_USER $POSTGRES_USER
ENV POSTGRES_PASSWORD $POSTGRES_PASSWORD
ENV POSTGRES_PORT $POSTGRES_PORT
ENV POSTGRES_HOST $POSTGRES_HOST
ENV POSTGRES_DB_NAME $POSTGRES_DB_NAME

CMD ["npm", "start"]