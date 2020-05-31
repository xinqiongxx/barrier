FROM buildpack-deps:stretch

MAINTAINER wangjun(wonder070431@gmail.com)

ENV TZ=Asia/Shanghai

RUN ln -sf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
# Versions of Nginx and nginx-rtmp-module to use
ENV NGINX_VERSION nginx-1.18.0
ENV NGINX_RTMP_MODULE_VERSION 1.2.1

# 如下可修改debian9的源
RUN mv /etc/apt/sources.list /etc/apt/sources.list.bak && \
   echo "deb http://mirrors.aliyun.com/debian/ stretch main non-free contrib" >/etc/apt/sources.list && \
   echo "deb-src http://mirrors.aliyun.com/debian/ stretch main non-free contrib" >/etc/apt/sources.list && \
   echo "deb http://mirrors.aliyun.com/debian-security stretch/updates main" >>/etc/apt/sources.list && \
   echo "deb-src http://mirrors.aliyun.com/debian-security stretch/updates main" >>/etc/apt/sources.list && \
   echo "deb http://mirrors.aliyun.com/debian/ stretch-updates main non-free contrib" >>/etc/apt/sources.list && \
   echo "deb-src http://mirrors.aliyun.com/debian/ stretch-updates main non-free contrib" >>/etc/apt/sources.list && \
   echo "deb http://mirrors.aliyun.com/debian/ stretch-backports main non-free contrib" >>/etc/apt/sources.list && \
   echo "deb-src http://mirrors.aliyun.com/debian/ stretch-backports main non-free contrib" >>/etc/apt/sources.list

# Install dependencies
RUN apt-get update && \
    apt-get install -y ca-certificates openssl libssl-dev && \
    rm -rf /var/lib/apt/lists/*

# Download and decompress Nginx
RUN mkdir -p /tmp/build/nginx && \
    mkdir -p /tmp/build/nginx-rtmp-module


COPY ${NGINX_VERSION}.tar.gz /tmp/build/nginx/

COPY nginx-rtmp-module-${NGINX_RTMP_MODULE_VERSION}.tar.gz /tmp/build/nginx-rtmp-module/

RUN cd /tmp/build/nginx && \
    tar -zxf ${NGINX_VERSION}.tar.gz

# Download and decompress RTMP module
RUN cd /tmp/build/nginx-rtmp-module && \
    tar -zxf nginx-rtmp-module-${NGINX_RTMP_MODULE_VERSION}.tar.gz && \
    cd nginx-rtmp-module-${NGINX_RTMP_MODULE_VERSION}

# Build and install Nginx
# The default puts everything under /usr/local/nginx, so it's needed to change
# it explicitly. Not just for order but to have it in the PATH
RUN cd /tmp/build/nginx/${NGINX_VERSION} && \
    ./configure \
        --sbin-path=/usr/local/sbin/nginx \
        --conf-path=/etc/nginx/nginx.conf \
        --error-log-path=/var/log/nginx/error.log \
        --pid-path=/var/run/nginx/nginx.pid \
        --lock-path=/var/lock/nginx/nginx.lock \
        --http-log-path=/var/log/nginx/access.log \
        --http-client-body-temp-path=/tmp/nginx-client-body \
        --with-http_ssl_module \
        --with-threads \
        --with-ipv6 \
        --add-module=/tmp/build/nginx-rtmp-module/nginx-rtmp-module-${NGINX_RTMP_MODULE_VERSION} && \
    make -j $(getconf _NPROCESSORS_ONLN) && \
    make install && \
    mkdir /var/lock/nginx && \
    rm -rf /tmp/build

# Forward logs to Docker
RUN ln -sf /dev/stdout /var/log/nginx/access.log && \
    ln -sf /dev/stderr /var/log/nginx/error.log

# Set up config file
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 1935
CMD ["nginx", "-g", "daemon off;"]