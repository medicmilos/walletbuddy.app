# FROM nginx:alpine
# COPY .  /usr/share/nginx/html

# FROM node:lts-alpine
# WORKDIR /usr/src/app
# COPY package*.json ./
# RUN npm install
# COPY . ./
# RUN npm run build
# COPY nodeServer.js dist/nodeServer.js
# WORKDIR /usr/src/app/dist
# EXPOSE 80
# CMD [ "node", "nodeServer.js" ]

FROM node:lts-alpine
RUN npm install -g http-server
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm run build
EXPOSE 80
CMD [ "http-server", "dist" ]