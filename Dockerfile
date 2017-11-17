FROM registry.dataos.io/jiangtong/web-base-image

COPY . /data/blur-admin/

WORKDIR /data/blur-admin

# Install nginx & node

RUN bower install

ENV ADAPTER_API_SERVER=localhost SVCAMOUNT_API_SERVER=localhost RELEASE_EDITION='prod'

EXPOSE 3000

CMD ["gulp", "serve:dist"]



