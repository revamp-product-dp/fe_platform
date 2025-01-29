FROM node:18-alpine

RUN \
    apk add --no-cache \
        build-base \
        curl \
        git \
        openjdk11-jre \
        python3 \
 && unlink /usr/local/bin/npm \
 && unlink /usr/local/bin/npx \
 && :

WORKDIR /app
COPY ../../package.json ../../yarn.lock ../../
RUN yarn install
COPY . .
EXPOSE 3000
EXPOSE 4173
CMD ["yarn", "dev"]
