FROM node:16

WORKDIR app

WORKDIR frontend
COPY /frontend/package.json .
COPY /frontend/yarn.lock .
RUN yarn

WORKDIR /app/backend
COPY /frontend/package.json .
COPY /frontend/yarn.lock .
RUN yarn

WORKDIR frontend
COPY /frontend .
RUN yarn build

WORKDIR /app/backend
COPY /backend .
RUN yarn build
CMD yarn serve
