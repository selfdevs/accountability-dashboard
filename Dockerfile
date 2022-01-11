FROM node:16

WORKDIR /app/frontend
COPY /frontend/package.json .
COPY /frontend/yarn.lock .
RUN yarn

WORKDIR /app/backend
COPY /backend/package.json .
COPY /backend/yarn.lock .
RUN yarn

WORKDIR /app/frontend
COPY /frontend .
RUN yarn build

WORKDIR /app/backend
COPY /backend .
RUN yarn build
CMD yarn serve
