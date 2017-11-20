FROM alpine:latest

COPY . /data/blur-admin/

WORKDIR /data/blur-admin

# Install nginx & node

RUN sed -i s#http://dl-cdn.alpinelinux.org#https://mirrors.aliyun.com#g /etc/apk/repositories && \
        apk add --update nodejs git nodejs-npm && \
        npm install -g bower gulp && \
        echo '{ "allow_root": true }' > /root/.bowerrc && \
        git config --global url."https://".insteadOf git:// && \
        npm install && \
        bower install

ENV ADAPTER_API_SERVER=localhost SVCAMOUNT_API_SERVER=localhost RELEASE_EDITION='prod'

EXPOSE 3000

CMD ["gulp", "serve:dist"]



