FROM java:8-jre

MAINTAINER wangjun(wonder070431@gmail.com)

ENV TZ=Asia/Shanghai

RUN ln -sf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN mkdir -p /dcmx-upms

WORKDIR /dcmx-upms

EXPOSE 8088

ADD ./target/barrier-web.jar ./

CMD java -Xms128m -Xmx2048m -Djava.security.egd=file:/dev/./urandom -jar barrier-web.jar
