FROM node:18-alpine

RUN \
    apk add --no-cache \
    curl \
    git \
    nginx \
    && unlink /usr/local/bin/npm \
    && unlink /usr/local/bin/npx \
    && :

WORKDIR /mock_server
COPY ./nginx.conf       /etc/nginx
COPY ./default.conf     /etc/nginx/conf.d

RUN yarn add prism