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

# Choose the Image which has Node installed already
FROM node:lts-alpine

# install simple http server for serving static content
RUN npm install -g http-server

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# build app for production with minification
RUN npm run build

EXPOSE 80
CMD [ "http-server", "dist" ]
