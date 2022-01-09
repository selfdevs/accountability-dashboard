FROM node:16
RUN mkdir app
WORKDIR app
COPY . .
WORKDIR frontend
RUN yarn
RUN yarn build
WORKDIR /app/backend
RUN yarn
RUN yarn build
CMD yarn serve