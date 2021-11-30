#FROM node:lts-alpine
#WORKDIR /usr/src/app
#COPY package*.json ./
#RUN npm install
#COPY . ./
#RUN npm run build
#COPY nodeServer.js dist/nodeServer.js
#WORKDIR /usr/src/app/dist
#EXPOSE 80
#CMD [ "node", "nodeServer.js" ]

# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

WORKDIR /usr/src/app/dist
EXPOSE 80
CMD [ "http-server", "dist" ]
