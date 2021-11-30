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

FROM node:10.15.0 as ui-builder
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
RUN npm install
RUN npm install -g @vue/cli
COPY . /usr/src/app
RUN npm run build
 
FROM nginx
COPY  --from=ui-builder /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
