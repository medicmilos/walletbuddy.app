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

# build environment
FROM node:12.2.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install --silent
RUN npm install @vue/cli@2.6.11 -g
COPY . /app
RUN npm run build

# production environment
FROM nginx:1.16.0-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
