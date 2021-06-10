FROM node:latest

ENV NODE_ENV production
ENV LISTEN_PORT=3003

RUN mkdir app
COPY ./docker/node/app/app.js /app/app.js
WORKDIR /app
CMD [ "node", "app.js" ]
