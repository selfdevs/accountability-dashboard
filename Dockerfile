FROM node:16

WORKDIR app

WORKDIR frontend
RUN yarn
COPY . .
RUN yarn build

WORKDIR /app/backend
RUN yarn
RUN yarn build
CMD yarn serve
