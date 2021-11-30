FROM node:lts-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build
COPY nodeServer.js dist/nodeServer.js
WORKDIR /usr/src/app/dist
EXPOSE 80
CMD [ "node", "nodeServer.js" ]
#end
