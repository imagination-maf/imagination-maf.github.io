FROM node:9.8.0-alpine

RUN apk add --no-cache git openssh-client nginx

RUN rm /etc/nginx/conf.d/default.conf
COPY deploy/nginx-site.conf /etc/nginx/conf.d/
RUN mkdir -p /run/nginx

COPY deploy/id_rsa* /root/.ssh/
RUN chmod 600 /root/.ssh/id_rsa
RUN ssh-keyscan -H bitbucket.org >> /root/.ssh/known_hosts

WORKDIR /app

COPY package*.json ./
COPY webpack.config.js ./

RUN npm install

COPY src ./src
COPY .babelrc ./

RUN npm run build
RUN rm package*.json && rm webpack.config.js

COPY index.html frame.html ./
RUN rm -rf src node_modules

CMD ["/usr/sbin/nginx", "-g", "daemon off;"]
