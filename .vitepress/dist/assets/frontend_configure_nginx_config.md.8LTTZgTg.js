import{_ as s,c as i,o as a,aT as n,aU as l,aV as p}from"./chunks/framework.qpm8FIA8.js";const A=JSON.parse('{"title":"配置Nginx","description":"","frontmatter":{},"headers":[],"relativePath":"frontend/configure/nginx_config.md","filePath":"frontend/configure/nginx_config.md","lastUpdated":1711621612000}'),h={name:"frontend/configure/nginx_config.md"},k=n('<h1 id="配置nginx" tabindex="-1">配置Nginx <a class="header-anchor" href="#配置nginx" aria-label="Permalink to &quot;配置Nginx&quot;">​</a></h1><p><img src="'+l+'" alt="/63f8ca6f4ce94423a82521fbpf.webp" loading="lazy"></p><h2 id="什么是nginx" tabindex="-1">什么是Nginx <a class="header-anchor" href="#什么是nginx" aria-label="Permalink to &quot;什么是Nginx&quot;">​</a></h2><p>Nginx是一个开源的高性能HTTP和反向代理服务器。它可以用于处理静态资源、负载均衡、反向代理和缓存等任务。Nginx被广泛用于构建高可用性、高性能的Web应用程序和网站。它具有低内存消耗、高并发能力和良好的稳定性，因此在互联网领域非常受欢迎。</p><h2 id="为什么使用nginx" tabindex="-1">为什么使用Nginx <a class="header-anchor" href="#为什么使用nginx" aria-label="Permalink to &quot;为什么使用Nginx&quot;">​</a></h2><ol><li>高性能：Nginx采用事件驱动的异步架构，能够处理大量并发连接而不会消耗过多的系统资源。它的处理能力比传统的Web服务器更高，在高并发负载下表现出色。</li><li>高可靠性：Nginx具有强大的容错能力和稳定性，能够在面对高流量和DDoS攻击等异常情况下保持可靠运行。它能通过健康检查和自动故障转移来保证服务的可用性。</li><li>负载均衡：Nginx可以作为反向代理服务器，实现负载均衡，将请求均匀分发给多个后端服务器。这样可以提高系统的整体性能和可用性。</li><li>静态文件服务：Nginx对静态资源（如HTML、CSS、JavaScript、图片等）的处理非常高效。它可以直接缓存静态文件，减轻后端服务器的负载。</li><li>扩展性：Nginx支持丰富的模块化扩展，可以通过添加第三方模块来提供额外的功能，如gzip压缩、SSL/TLS加密、缓存控制等。</li></ol><h2 id="如何处理请求" tabindex="-1">如何处理请求 <a class="header-anchor" href="#如何处理请求" aria-label="Permalink to &quot;如何处理请求&quot;">​</a></h2><p>Nginx处理请求的基本流程如下：</p><p>接收请求：Nginx作为服务器软件监听指定的端口，接收客户端发来的请求。</p><p>解析请求：Nginx解析请求的内容，包括请求方法（GET、POST等）、URL、头部信息等。</p><p>配置匹配：Nginx根据配置文件中的规则和匹配条件，决定如何处理该请求。配置文件定义了虚拟主机、反向代理、负载均衡、缓存等特定的处理方式。</p><p>处理请求：Nginx根据配置的处理方式，可能会进行以下操作：</p><ul><li><p>静态文件服务：如果请求的是静态资源文件，如HTML、CSS、JavaScript、图片等，Nginx可以直接返回文件内容，不必经过后端应用程序。</p></li><li><p>反向代理：如果配置了反向代理，Nginx将请求转发给后端的应用服务器，然后将其响应返回给客户端。这样可以提供负载均衡、高可用性和缓存等功能。</p></li><li><p>缓存：如果启用了缓存，Nginx可以缓存一些静态或动态内容的响应，在后续相同的请求中直接返回缓存的响应，减少后端负载并提高响应速度。</p></li><li><p>URL重写：Nginx可以根据配置的规则对URL进行重写，将请求从一个URL重定向到另一个URL或进行转换。</p></li><li><p>SSL/TLS加密：如果启用了SSL/TLS，Nginx可以负责加密和解密HTTPS请求和响应。</p></li><li><p>访问控制：Nginx可以根据配置的规则对请求进行访问控制，例如限制IP访问、进行身份认证等。</p></li><li><p>响应结果：Nginx根据处理结果生成响应报文，包括状态码、头部信息和响应内容。然后将响应发送给客户端。</p></li></ul><h2 id="什么是正向代理和反向代理" tabindex="-1">什么是正向代理和反向代理 <a class="header-anchor" href="#什么是正向代理和反向代理" aria-label="Permalink to &quot;什么是正向代理和反向代理&quot;">​</a></h2><p><img src="'+p+`" alt="/13b3ec2e06d84f97b4536c5e6f1980.webp" loading="lazy"></p><h3 id="正向代理" tabindex="-1">正向代理 <a class="header-anchor" href="#正向代理" aria-label="Permalink to &quot;正向代理&quot;">​</a></h3><p>是指客户端通过代理服务器发送请求到目标服务器。客户端向代理服务器发送请求，代理服务器再将请求转发给目标服务器，并将服务器的响应返回给客户端。正向代理可以隐藏客户端的真实IP地址，提供匿名访问和访问控制等功能。它常用于跨越防火墙访问互联网、访问被封禁的网站等情况。</p><h3 id="反向代理" tabindex="-1">反向代理 <a class="header-anchor" href="#反向代理" aria-label="Permalink to &quot;反向代理&quot;">​</a></h3><p>是指客户端发送请求到代理服务器，代理服务器再将请求转发给后端的多个服务器中的一个或多个，并将后端服务器的响应返回给客户端。客户端并不直接访问后端服务器，而是通过反向代理服务器来获取服务。反向代理可以实现负载均衡、高可用性和安全性等功能。它常用于网站的高并发访问、保护后端服务器、提供缓存和SSL终止等功能。</p><h2 id="nginx-启动和关闭" tabindex="-1">nginx 启动和关闭 <a class="header-anchor" href="#nginx-启动和关闭" aria-label="Permalink to &quot;nginx 启动和关闭&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>进入目录：/usr/local/nginx/sbin</span></span>
<span class="line"><span></span></span>
<span class="line"><span>启动命令：./nginx</span></span>
<span class="line"><span></span></span>
<span class="line"><span>重启命令：nginx -s reload</span></span>
<span class="line"><span></span></span>
<span class="line"><span>快速关闭命令：./nginx -s stop</span></span>
<span class="line"><span></span></span>
<span class="line"><span>有序地停止，需要进程完成当前工作后再停止：./nginx -s quit</span></span>
<span class="line"><span></span></span>
<span class="line"><span>直接杀死nginx进程：killall nginx</span></span></code></pre></div><h2 id="配置文件nginx-conf" tabindex="-1">配置文件nginx.conf <a class="header-anchor" href="#配置文件nginx-conf" aria-label="Permalink to &quot;配置文件nginx.conf&quot;">​</a></h2><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 启动进程,通常设置成和cpu的数量相等</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">worker_processes </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 全局错误日志定义类型，[debug | info | notice | warn | error | crit]</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">error_log </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> logs/error.log;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">error_log </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> logs/error.log  </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">notice</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">error_log </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> logs/error.log  info;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 进程pid文件</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">pid </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">       /var/run/nginx.pid;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 工作模式及连接数上限</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">events</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 仅用于linux2.6以上内核,可以大大提高nginx的性能</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    use </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  epoll</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 单个后台worker process进程的最大并发链接数</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    worker_connections </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1024</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 客户端请求头部的缓冲区大小</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    client_header_buffer_size </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">4k</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # keepalive 超时时间</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    keepalive_timeout </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">60</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 告诉nginx收到一个新连接通知后接受尽可能多的连接</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # multi_accept on;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 设定http服务器，利用它的反向代理功能提供负载均衡支持</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">http</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 文件扩展名与文件类型映射表义</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    include </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      /etc/nginx/mime.types;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # nginx配置多个conf文件</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # include /confs/*.conf; </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 默认文件类型</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    default_type </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> application/octet-stream;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 默认编码</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    charset </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">utf-8;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 服务器名字的hash表大小</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    server_names_hash_bucket_size </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">128</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 客户端请求头部的缓冲区大小</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    client_header_buffer_size </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">32k</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 客户请求头缓冲大小</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    large_client_header_buffers </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">4 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">64k</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 设定通过nginx上传文件的大小</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    client_max_body_size </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">8m</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 开启目录列表访问，合适下载服务器，默认关闭。</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    autoindex </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">on</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # sendfile 指令指定 nginx 是否调用 sendfile 函数（zero copy 方式）来输出文件，对于普通应用，</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 必须设为 on,如果用来进行下载等应用磁盘IO重负载应用，可设置为 off，以平衡磁盘与网络I/O处理速度</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    sendfile </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">       on</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 此选项允许或禁止使用socke的TCP_CORK的选项，此选项仅在使用sendfile的时候使用</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    #tcp_nopush     on;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 连接超时时间（单秒为秒）</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    keepalive_timeout </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 65</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # gzip模块设置</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    gzip </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">on</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;               </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#开启gzip压缩输出</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    gzip_min_length </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1k</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;    </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#最小压缩文件大小</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    gzip_buffers </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">4 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">16k</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;    </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#压缩缓冲区</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    gzip_http_version </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1.0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#压缩版本（默认1.1，前端如果是squid2.5请使用1.0）</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    gzip_comp_level </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;     </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#压缩等级</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    gzip_types </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">text/plain application/x-javascript text/css application/xml;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    gzip_vary </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">on</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 开启限制IP连接数的时候需要使用</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    #limit_zone crawler $binary_remote_addr 10m;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 指定虚拟主机的配置文件，方便管理</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    include </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">/etc/nginx/conf.d/*.conf;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 负载均衡配置</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    upstream</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> aaa {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # 请见上文中的五种配置</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">   # 虚拟主机的配置</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    server</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # 监听端口</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        listen </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">80</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # 域名可以有多个，用空格隔开</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        server_name </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">www.aaa.com aaa.com;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # 默认入口文件名称</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        index </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">index.html index.htm index.php;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        root </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">/data/www/sk;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # 图片缓存时间设置</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        location</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ~</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> .*.(gif|jpg|jpeg|png|bmp|swf)\${</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            expires </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10d</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        #JS和CSS缓存时间设置</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        location</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ~</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> .*.(js|css)?\${</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            expires </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1h</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # 日志格式设定</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        #$remote_addr与 $http_x_forwarded_for用以记录客户端的ip地址；</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        #$remote_user：用来记录客户端用户名称；</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        #$time_local：用来记录访问时间与时区；</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        #$request：用来记录请求的url与http协议；</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        #$status：用来记录请求状态；成功是200，</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        #$body_bytes_sent ：记录发送给客户端文件主体内容大小；</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        #$http_referer：用来记录从那个页面链接访问过来的；</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        log_format </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">access </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;$</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">remote_addr</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> - $</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">remote_user</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> [$</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">time_local</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">] &quot;$</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">request</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot; &#39;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &#39;$</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">status</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> $</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">body_bytes_sent</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;$</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">http_referer</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot; &#39;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &#39;&quot;$</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">http_user_agent</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot; $</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">http_x_forwarded_for</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # 定义本虚拟主机的访问日志</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        access_log </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> /usr/local/nginx/logs/host.access.log  </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">main</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        access_log </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> /usr/local/nginx/logs/host.access.404.log  log404;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # 对具体路由进行反向代理</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        location</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> /connect-controller {</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            proxy_pass </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">http://127.0.0.1:88;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            proxy_redirect </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">off</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            proxy_set_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">X-Real-IP $remote_addr;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">            # 后端的Web服务器可以通过X-Forwarded-For获取用户真实IP</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            proxy_set_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            proxy_set_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Host $host;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">            # 允许客户端请求的最大单文件字节数</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            client_max_body_size </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10m</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">            # 缓冲区代理缓冲用户端请求的最大字节数，</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            client_body_buffer_size </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">128k</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">            # 表示使nginx阻止HTTP应答代码为400或者更高的应答。</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            proxy_intercept_errors </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">on</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">            # nginx跟后端服务器连接超时时间(代理连接超时)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            proxy_connect_timeout </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">90</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">            # 后端服务器数据回传时间_就是在规定时间之内后端服务器必须传完所有的数据</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            proxy_send_timeout </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">90</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">            # 连接成功后，后端服务器响应的超时时间</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            proxy_read_timeout </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">90</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">            # 设置代理服务器（nginx）保存用户头信息的缓冲区大小</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            proxy_buffer_size </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">4k</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">            # 设置用于读取应答的缓冲区数目和大小，默认情况也为分页大小，根据操作系统的不同可能是4k或者8k</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            proxy_buffers </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">4 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">32k</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">            # 高负荷下缓冲大小（proxy_buffers*2）</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            proxy_busy_buffers_size </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">64k</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">            # 设置在写入proxy_temp_path时数据的大小，预防一个工作进程在传递文件时阻塞太长</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">            # 设定缓存文件夹大小，大于这个值，将从upstream服务器传</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            proxy_temp_file_write_size </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">64k</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # 动静分离反向代理配置（多路由指向不同的服务端或界面）</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        location</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ~</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> .(jsp|jspx|do)?$ {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            proxy_set_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Host $host;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            proxy_set_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            proxy_set_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            proxy_pass </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">http://127.0.0.1:8080;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h2 id="location" tabindex="-1">location <a class="header-anchor" href="#location" aria-label="Permalink to &quot;location&quot;">​</a></h2><p>location指令的作用就是根据用户请求的URI来执行不同的应用</p><h3 id="语法" tabindex="-1">语法 <a class="header-anchor" href="#语法" aria-label="Permalink to &quot;语法&quot;">​</a></h3><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">location [ </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> |</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ~ | ~* | ^~ ] uri {...}</span></span></code></pre></div><ul><li><code>[ = | ~ | ~* | ^~ ]</code>：匹配的标识 <ul><li><code>~</code>与<code>~*</code>的区别是：<code>~</code>区分大小写，<code>~*</code>不区分大小写</li><li><code>^~</code>：进行常规字符串匹配后，不做正则表达式的检查</li></ul></li><li><code>uri</code>：匹配的网站地址</li><li><code>{...}</code>：匹配uri后要执行的配置段</li></ul><h3 id="举例" tabindex="-1">举例 <a class="header-anchor" href="#举例" aria-label="Permalink to &quot;举例&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">location</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#DBEDFF;"> / </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    [ </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">configuration</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> A ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">location</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> / </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    [ </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">configuration</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> B ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">location</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> /sk/ </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    [ </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">configuration</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> C ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">location</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ^~</span><span style="--shiki-light:#032F62;--shiki-dark:#DBEDFF;"> /img/ </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    [ </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">configuration</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> D ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">location</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ~*</span><span style="--shiki-light:#032F62;--shiki-dark:#DBEDFF;"> .(gif|jpg|jpeg)$ </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    [ </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">configuration</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> E ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><ul><li><code>= /</code> 请求 <code>/</code> 精准匹配A，不再往下查找</li><li><code>/</code> 请求<code>/index.html</code>匹配B。首先查找匹配的前缀字符，找到最长匹配是配置B，接着又按照顺序查找匹配的正则。结果没有找到，因此使用先前标记的最长匹配，即配置B。</li><li><code>/sk/</code> 请求<code>/sk/abc</code> 匹配C。首先找到最长匹配C，由于后面没有匹配的正则，所以使用最长匹配C。</li><li><code>~* .(gif|jpg|jpeg)$</code> 请求<code>/sk/logo.gif</code> 匹配E。首先进行前缀字符的查找，找到最长匹配项C，继续进行正则查找，找到匹配项E。因此使用E。</li><li><code>^~</code> 请求<code>/img/logo.gif</code>匹配D。首先进行前缀字符查找，找到最长匹配D。但是它使用了<code>^~</code>修饰符，不再进行下面的正则的匹配查找，因此使用D。</li></ul><h2 id="单页面应用刷新404问题" tabindex="-1">单页面应用刷新404问题 <a class="header-anchor" href="#单页面应用刷新404问题" aria-label="Permalink to &quot;单页面应用刷新404问题&quot;">​</a></h2><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> location</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> / </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        try_files </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$uri $uri/ /index.html;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span></code></pre></div><h2 id="配置跨域请求" tabindex="-1">配置跨域请求 <a class="header-anchor" href="#配置跨域请求" aria-label="Permalink to &quot;配置跨域请求&quot;">​</a></h2><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">server</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    listen   </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">80</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    location</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> / {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # 服务器默认是不被允许跨域的。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # 配置\`*\`后，表示服务器可以接受所有的请求源（Origin）,即接受所有跨域的请求</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        add_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Access-Control-Allow-Origin *;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        add_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Access-Control-Allow-Methods </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;GET, POST, OPTIONS&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        add_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Access-Control-Allow-Headers </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # 发送&quot;预检请求&quot;时，需要用到方法 OPTIONS ,所以服务器需要允许该方法</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # 给OPTIONS 添加 204的返回，是为了处理在发送POST请求时Nginx依然拒绝访问的错误</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ($request_method = </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;OPTIONS&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            return</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 204</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h2 id="开启gzip压缩" tabindex="-1">开启gzip压缩 <a class="header-anchor" href="#开启gzip压缩" aria-label="Permalink to &quot;开启gzip压缩&quot;">​</a></h2><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # gzip模块设置</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    gzip </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">on</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;               </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#开启gzip压缩输出</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    gzip_min_length </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1k</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;    </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#最小压缩文件大小</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    gzip_buffers </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">4 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">16k</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;    </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#压缩缓冲区</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    gzip_http_version </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1.0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#压缩版本（默认1.1，前端如果是squid2.5请使用1.0）</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    gzip_comp_level </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;     </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#压缩等级</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 设置什么类型的文件需要压缩</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    gzip_types </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">text/plain application/x-javascript text/css application/xml;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 用于设置使用Gzip进行压缩发送是否携带“Vary:Accept-Encoding”头域的响应头部</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 主要是告诉接收方，所发送的数据经过了Gzip压缩处理</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    gzip_vary </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">on</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre></div><p>总体而言，Nginx是一款轻量级、高性能、可靠性强且扩展性好的服务器软件，适用于搭建高可用性、高性能的Web应用程序和网站。</p>`,38),e=[k];function t(r,d,E,g,c,y){return a(),i("div",null,e)}const D=s(h,[["render",t]]);export{A as __pageData,D as default};
