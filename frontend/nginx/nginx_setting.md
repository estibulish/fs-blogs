# nginx

## nginx基本配置

当涉及到配置 Nginx，通常会涉及以下几个重要的方面，我会简要介绍一下每个方面的内容：

1. **基本结构和语法**： Nginx 的配置文件采用简洁的块结构，主要由指令和指令块组成。配置文件通常位于 `/etc/nginx/nginx.conf`，并可以包含其他文件或目录的配置。
2. **基本指令**：
   - `worker_processes`: 指定工作进程的数量，通常设置为系统的 CPU 核心数。
   - `events`: 设置与连接处理相关的参数，如工作进程数和连接的最大数。
   - `http`：包含 HTTP 服务器配置。
   - `server`：定义虚拟主机配置。
   - `location`：定义 URI 处理的规则，可以是正则表达式。
3. **虚拟主机配置**： 在 `http` 块内，通过 `server` 块定义虚拟主机。每个 `server` 块通常包含：
   - `listen`: 监听的端口和 IP 地址。
   - `server_name`: 主机名，即将要处理请求的域名。
   - `root`: 网站文件的根目录。
   - `index`: 默认首页文件。
   - `location` 块：不同 URI 的配置。
4. **HTTPS 配置**： 启用 HTTPS 需要额外的 SSL/TLS 相关配置：
   - `ssl_certificate` 和 `ssl_certificate_key`：指定 SSL 证书和私钥的路径。
   - `ssl_protocols` 和 `ssl_ciphers`：定义 SSL 协议和密码套件。
   - `ssl_session_cache` 和 `ssl_session_timeout`：SSL 会话缓存设置。
5. **反向代理**： 使用 `proxy_pass` 指令实现反向代理配置，将请求转发给其他服务器处理。
6. **负载均衡**： 使用 `upstream` 块定义多个后端服务器，通过 `proxy_pass` 和其他相关指令实现负载均衡。
7. **安全配置**：
   - `allow` 和 `deny`：控制访问的 IP 地址。
   - `access_log` 和 `error_log`：访问日志和错误日志的配置。
8. **缓存配置**： 使用 `proxy_cache` 和相关指令配置反向代理的缓存。
9. **性能调优**：
   - `gzip` 相关指令：开启压缩传输。
   - `tcp_nodelay` 和 `tcp_nopush`：优化 TCP 连接。
   - `keepalive_timeout`：保持连接的超时时间。
10. **特殊模块**： Nginx 提供了丰富的模块支持，如 `ngx_http_rewrite_module`、`ngx_http_geo_module` 等，可以通过这些模块实现更高级的功能和配置。

这些是 Nginx 配置中的一些核心方面，具体配置取决于你的应用需求和架构设计。配置时要确保语法正确并理解每个指令的作用及其影响。

## Nginx 配置示例

```nginx
# nginx.conf

user nginx;  # Nginx worker进程运行的用户
worker_processes auto;  # 自动设置工作进程数量，通常为CPU核心数
error_log /var/log/nginx/error.log warn;  # 错误日志路径和日志级别
pid /var/run/nginx.pid;  # Nginx主进程的PID文件路径

events {
    worker_connections 1024;  # 每个工作进程允许的最大连接数
}

http {
    include       /etc/nginx/mime.types;  # 包含MIME类型配置文件
    default_type  application/octet-stream;  # 默认MIME类型

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';  # 日志格式设置

    access_log  /var/log/nginx/access.log  main;  # 访问日志路径和使用的日志格式

    sendfile        on;  # 启用高效的文件传输模式
    tcp_nopush      on;  # 禁止发送小块数据，保证数据发送效率
    tcp_nodelay     on;  # 禁用Nagle算法，减少延迟
    keepalive_timeout  65;  # 客户端连接保持超时时间
    types_hash_max_size 2048;  # MIME类型哈希表大小设置

    include /etc/nginx/conf.d/*.conf;  # 包含其他配置文件或目录下的配置

    # 第一个虚拟主机配置，监听80端口，处理HTTP请求
    server {
        listen 80;  # 监听端口
        server_name example.com;  # 主机名
        root /var/www/example.com;  # 网站根目录
        index index.html;  # 默认首页文件

        location / {
            try_files $uri $uri/ /index.html;  # 处理静态文件请求
        }

        location /api {
            proxy_pass http://backend_server;  # 反向代理到后端服务器
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }

    # 第二个虚拟主机配置，监听443端口，启用SSL/TLS
    server {
        listen 443 ssl http2;  # 同时启用SSL和HTTP/2
        server_name example.com;  # 主机名
        root /var/www/example.com;  # 网站根目录
        index index.html;  # 默认首页文件

        ssl_certificate /etc/nginx/ssl/example.com.crt;  # SSL证书路径
        ssl_certificate_key /etc/nginx/ssl/example.com.key;  # SSL证书私钥路径

        ssl_protocols TLSv1.2 TLSv1.3;  # 支持的SSL/TLS协议版本
        ssl_prefer_server_ciphers on;  # 使用服务器端加密套件优先
        ssl_ciphers 'EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH';  # SSL加密套件设置

        location / {
            try_files $uri $uri/ /index.html;  # 处理静态文件请求
        }

        location /api {
            proxy_pass http://backend_server;  # 反向代理到后端服务器
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
```

