FROM java:8-jre

MAINTAINER wangjun(wonder070431@gmail.com)

ENV TZ=Asia/Shanghai

RUN ln -sf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN mkdir -p /dcmx-upms

WORKDIR /dcmx-upms

EXPOSE 8888

ADD ./target/barrier-web.jar ./

CMD java -Xms512m -Xmx4096m -Djava.security.egd=file:/dev/./urandom -jar barrier-web.jar
