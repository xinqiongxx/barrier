FROM java:8-jre

MAINTAINER wangjun(wonder070431@gmail.com)

ENV TZ=Asia/Shanghai

RUN ln -sf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN mkdir -p /dcmx-upms

WORKDIR /dcmx-upms

EXPOSE 80

ADD ./target/barrier-web.jar ./

CMD java -Xms128m -Xmx512m -Djava.security.egd=file:/dev/./urandom -jar barrier-web.jar
