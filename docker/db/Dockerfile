FROM mysql:8.0.19

MAINTAINER wangjun(wonder070431@gmail.com)

ENV TZ=Asia/Shanghai

RUN ln -sf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY ./1schema.sql /docker-entrypoint-initdb.d

COPY ./2barrier.sql /docker-entrypoint-initdb.d