import{_ as s,c as a,o as n,aT as p}from"./chunks/framework.qpm8FIA8.js";const b=JSON.parse('{"title":"Git 远程仓库(Github)","description":"","frontmatter":{},"headers":[],"relativePath":"frontend/git/git-remote-repo.md","filePath":"frontend/git/git-remote-repo.md","lastUpdated":1711621612000}'),t={name:"frontend/git/git-remote-repo.md"},i=p(`<h1 id="git-远程仓库-github" tabindex="-1">Git 远程仓库(Github) <a class="header-anchor" href="#git-远程仓库-github" aria-label="Permalink to &quot;Git 远程仓库(Github)&quot;">​</a></h1><p>Git 并不像 SVN 那样有个中心服务器。</p><p>目前我们使用到的 Git 命令都是在本地执行，如果你想通过 Git 分享你的代码或者与其他开发人员合作。 你就需要将数据放到一台其他开发人员能够连接的服务器上。</p><p>本例使用了 Github 作为远程仓库，你可以先阅读我们的 Github 简明教程。</p><p><img src="https://www.runoob.com/wp-content/uploads/2015/03/Git-push-command.jpeg" alt="" loading="lazy"></p><h2 id="添加远程库" tabindex="-1">添加远程库 <a class="header-anchor" href="#添加远程库" aria-label="Permalink to &quot;添加远程库&quot;">​</a></h2><p>要添加一个新的远程仓库，可以指定一个简单的名字，以便将来引用,命令格式如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>git remote add [shortname] [url]</span></span></code></pre></div><p>本例以 Github 为例作为远程仓库，如果你没有 Github 可以在官网 <a href="https://github.com/%E6%B3%A8%E5%86%8C%E3%80%82" target="_blank" rel="noreferrer">https://github.com/注册。</a></p><p>由于你的本地 Git 仓库和 GitHub 仓库之间的传输是通过SSH加密的，所以我们需要配置验证信息：</p><p>使用以下命令生成 SSH Key：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>$ ssh-keygen -t rsa -C &quot;youremail@example.com&quot;</span></span></code></pre></div><p>后面的 your_email@youremail.com 改为你在 Github 上注册的邮箱，之后会要求确认路径和输入密码，我们这使用默认的一路回车就行。</p><p>成功的话会在 ~/ 下生成 .ssh 文件夹，进去，打开 id_rsa.pub，复制里面的 key。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>$ ssh-keygen -t rsa -C &quot;429240967@qq.com&quot;</span></span>
<span class="line"><span>Generating public/private rsa key pair.</span></span>
<span class="line"><span>Enter file in which to save the key (/Users/tianqixin/.ssh/id_rsa): </span></span>
<span class="line"><span>Enter passphrase (empty for no passphrase):    # 直接回车</span></span>
<span class="line"><span>Enter same passphrase again:                   # 直接回车</span></span>
<span class="line"><span>Your identification has been saved in /Users/tianqixin/.ssh/id_rsa.</span></span>
<span class="line"><span>Your public key has been saved in /Users/tianqixin/.ssh/id_rsa.pub.</span></span>
<span class="line"><span>The key fingerprint is:</span></span>
<span class="line"><span>SHA256:MDKVidPTDXIQoJwoqUmI4LBAsg5XByBlrOEzkxrwARI 429240967@qq.com</span></span>
<span class="line"><span>The key&#39;s randomart image is:</span></span>
<span class="line"><span>+---[RSA 3072]----+</span></span>
<span class="line"><span>|E*+.+=**oo       |</span></span>
<span class="line"><span>|%Oo+oo=o. .      |</span></span>
<span class="line"><span>|%**.o.o.         |</span></span>
<span class="line"><span>|OO.  o o         |</span></span>
<span class="line"><span>|+o+     S        |</span></span>
<span class="line"><span>|.                |</span></span>
<span class="line"><span>|                 |</span></span>
<span class="line"><span>|                 |</span></span>
<span class="line"><span>|                 |</span></span>
<span class="line"><span>+----[SHA256]-----+</span></span></code></pre></div><p>回到 github 上，进入 Account =&gt; Settings（账户配置）。</p><p><img src="https://www.runoob.com/wp-content/uploads/2015/03/48840BF0-992F-4CCC-A388-15CB74819D88.jpg" alt="" loading="lazy"></p><p>左边选择 SSH and GPG keys，然后点击 New SSH key 按钮,title 设置标题，可以随便填，粘贴在你电脑上生成的 key。</p><p><img src="https://www.runoob.com/wp-content/uploads/2015/03/B0589847-A498-4415-8700-252BDE1B20C0.jpg" alt="" loading="lazy"></p><p><img src="https://www.runoob.com/wp-content/uploads/2015/03/106AD534-A38A-47F3-88A3-B7BE3F2FEEF1.jpg" alt="" loading="lazy"></p><p>添加成功后界面如下所示</p><p><img src="https://www.runoob.com/wp-content/uploads/2015/03/EC8F8872-091A-4CAB-90F2-616F34F350A9.jpg" alt="" loading="lazy"></p><p>为了验证是否成功，输入以下命令：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>$ ssh -T git@github.com</span></span>
<span class="line"><span>The authenticity of host &#39;github.com (52.74.223.119)&#39; can&#39;t be established.</span></span>
<span class="line"><span>RSA key fingerprint is SHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8.</span></span>
<span class="line"><span>Are you sure you want to continue connecting (yes/no/[fingerprint])? yes                   # 输入 yes</span></span>
<span class="line"><span>Warning: Permanently added &#39;github.com,52.74.223.119&#39; (RSA) to the list of known hosts.</span></span>
<span class="line"><span>Hi tianqixin! You&#39;ve successfully authenticated, but GitHub does not provide shell access. # 成功信息</span></span></code></pre></div><p>以下命令说明我们已成功连上 Github。</p><p>之后登录后点击&quot; New repository &quot; 如下图所示：</p><p><img src="https://www.runoob.com/wp-content/uploads/2015/03/github1.jpg" alt="" loading="lazy"></p><p>之后在在Repository name 填入 runoob-git-test(远程仓库名) ，其他保持默认设置，点击&quot;Create repository&quot;按钮，就成功地创建了一个新的Git仓库：</p><p><img src="https://www.runoob.com/wp-content/uploads/2015/03/299CF000-7B6E-4BEC-B8C2-D9AEB053307B.jpg" alt="" loading="lazy"></p><p>创建成功后，显示如下信息：</p><p><img src="https://www.runoob.com/wp-content/uploads/2015/03/1BCB4379-1A25-4C77-BB82-92B3E7185435.jpg" alt="" loading="lazy"></p><p>以上信息告诉我们可以从这个仓库克隆出新的仓库，也可以把本地仓库的内容推送到GitHub仓库。</p><p>现在，我们根据 GitHub 的提示，在本地的仓库下运行命令：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>$ mkdir runoob-git-test                     # 创建测试目录</span></span>
<span class="line"><span>$ cd runoob-git-test/                       # 进入测试目录</span></span>
<span class="line"><span>$ echo &quot;# 菜鸟教程 Git 测试&quot; &gt;&gt; README.md     # 创建 README.md 文件并写入内容</span></span>
<span class="line"><span>$ ls                                        # 查看目录下的文件</span></span>
<span class="line"><span>README</span></span>
<span class="line"><span>$ git init                                  # 初始化</span></span>
<span class="line"><span>$ git add README.md                         # 添加文件</span></span>
<span class="line"><span>$ git commit -m &quot;添加 README.md 文件&quot;        # 提交并备注信息</span></span>
<span class="line"><span>[master (root-commit) 0205aab] 添加 README.md 文件</span></span>
<span class="line"><span> 1 file changed, 1 insertion(+)</span></span>
<span class="line"><span> create mode 100644 README.md</span></span>
<span class="line"><span></span></span>
<span class="line"><span>提交到 Github</span></span>
<span class="line"><span></span></span>
<span class="line"><span>$ git remote add origin git@github.com:tianqixin/runoob-git-test.git</span></span>
<span class="line"><span>$ git push -u origin master</span></span></code></pre></div><p>以下命令请根据你在Github成功创建新仓库的地方复制，而不是根据我提供的命令，因为我们的Github用户名不一样，仓库名也不一样。</p><p>接下来我们返回 Github 创建的仓库，就可以看到文件已上传到 Github上：</p><p><img src="https://www.runoob.com/wp-content/uploads/2015/03/53CA927D-F36F-4A00-AFB2-5EAED05B535E.jpg" alt="" loading="lazy"></p><h2 id="查看当前的远程库" tabindex="-1">查看当前的远程库 <a class="header-anchor" href="#查看当前的远程库" aria-label="Permalink to &quot;查看当前的远程库&quot;">​</a></h2><p>要查看当前配置有哪些远程仓库，可以用命令：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>git remote</span></span></code></pre></div><p>实例</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>$ git remote</span></span>
<span class="line"><span>origin</span></span>
<span class="line"><span>$ git remote -v</span></span>
<span class="line"><span>origin    git@github.com:tianqixin/runoob-git-test.git (fetch)</span></span>
<span class="line"><span>origin    git@github.com:tianqixin/runoob-git-test.git (push)</span></span></code></pre></div><p>执行时加上 -v 参数，你还可以看到每个别名的实际链接地址。</p><h2 id="提取远程仓库" tabindex="-1">提取远程仓库 <a class="header-anchor" href="#提取远程仓库" aria-label="Permalink to &quot;提取远程仓库&quot;">​</a></h2><p>Git 有两个命令用来提取远程仓库的更新。</p><p>1、从远程仓库下载新分支与数据：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>git fetch</span></span></code></pre></div><p>该命令执行完后需要执行 git merge 远程分支到你所在的分支。</p><p>2、从远端仓库提取数据并尝试合并到当前分支：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>git merge</span></span></code></pre></div><p>该命令就是在执行 <strong>git fetch</strong> 之后紧接着执行 <strong>git merge</strong> 远程分支到你所在的任意分支。</p><p><img src="https://www.runoob.com/wp-content/uploads/2015/03/main-qimg-00a6b5a8ec82400657444504c4d4d1a7.png" alt="" loading="lazy"></p><p>假设你配置好了一个远程仓库，并且你想要提取更新的数据，你可以首先执行 <strong>git fetch [alias]</strong> 告诉 Git 去获取它有你没有的数据，然后你可以执行 <strong>git merge [alias]/[branch]</strong> 以将服务器上的任何更新（假设有人这时候推送到服务器了）合并到你的当前分支。</p><p>接下来我们在 Github 上点击&quot; README.md&quot; 并在线修改它:</p><p><img src="https://www.runoob.com/wp-content/uploads/2015/03/C5A6670F-202D-4F2C-8A63-07CEA37BB67A.jpg" alt="" loading="lazy"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>然后我们在本地更新修改。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>$ git fetch origin</span></span>
<span class="line"><span>remote: Counting objects: 3, done.</span></span>
<span class="line"><span>remote: Compressing objects: 100% (2/2), done.</span></span>
<span class="line"><span>remote: Total 3 (delta 0), reused 0 (delta 0), pack-reused 0</span></span>
<span class="line"><span>Unpacking objects: 100% (3/3), done.</span></span>
<span class="line"><span>From github.com:tianqixin/runoob-git-test</span></span>
<span class="line"><span>   0205aab..febd8ed  master     -&gt; origin/master</span></span></code></pre></div><p>以上信息&quot;0205aab..febd8ed master -&gt; origin/master&quot; 说明 master 分支已被更新，我们可以使用以下命令将更新同步到本地：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>$ git merge origin/master</span></span>
<span class="line"><span>Updating 0205aab..febd8ed</span></span>
<span class="line"><span>Fast-forward</span></span>
<span class="line"><span> README.md | 1 +</span></span>
<span class="line"><span> 1 file changed, 1 insertion(+)</span></span></code></pre></div><p>查看 README.md 文件内容：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>$ cat README.md </span></span>
<span class="line"><span></span></span>
<span class="line"><span>菜鸟教程 Git 测试</span></span>
<span class="line"><span></span></span>
<span class="line"><span>第一次修改内容</span></span></code></pre></div><h2 id="推送到远程仓库" tabindex="-1">推送到远程仓库 <a class="header-anchor" href="#推送到远程仓库" aria-label="Permalink to &quot;推送到远程仓库&quot;">​</a></h2><p>推送你的新分支与数据到某个远端仓库命令:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>git push [alias] [branch]</span></span></code></pre></div><p>以上命令将你的 [branch] 分支推送成为 [alias] 远程仓库上的 [branch] 分支，实例如下。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>$ touch runoob-test.txt      # 添加文件</span></span>
<span class="line"><span>$ git add runoob-test.txt </span></span>
<span class="line"><span>$ git commit -m &quot;添加到远程&quot;</span></span>
<span class="line"><span>master 69e702d] 添加到远程</span></span>
<span class="line"><span> 1 file changed, 0 insertions(+), 0 deletions(-)</span></span>
<span class="line"><span> create mode 100644 runoob-test.txt</span></span>
<span class="line"><span></span></span>
<span class="line"><span>$ git push origin master    # 推送到 Github</span></span></code></pre></div><p>重新回到我们的 Github 仓库，可以看到文件已经提交上来了：</p><p><img src="https://www.runoob.com/wp-content/uploads/2015/03/79A84530-7DC0-4D25-9F83-8776433A4C32.jpg" alt="" loading="lazy"></p><h2 id="删除远程仓库" tabindex="-1">删除远程仓库 <a class="header-anchor" href="#删除远程仓库" aria-label="Permalink to &quot;删除远程仓库&quot;">​</a></h2><p>删除远程仓库你可以使用命令：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>git remote rm [别名]</span></span></code></pre></div><p>实例</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>$ git remote -v</span></span>
<span class="line"><span>origin    git@github.com:tianqixin/runoob-git-test.git (fetch)</span></span>
<span class="line"><span>origin    git@github.com:tianqixin/runoob-git-test.git (push)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>添加仓库 origin2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>$ git remote add origin2 git@github.com:tianqixin/runoob-git-test.git</span></span>
<span class="line"><span></span></span>
<span class="line"><span>$ git remote -v</span></span>
<span class="line"><span>origin    git@github.com:tianqixin/runoob-git-test.git (fetch)</span></span>
<span class="line"><span>origin    git@github.com:tianqixin/runoob-git-test.git (push)</span></span>
<span class="line"><span>origin2    git@github.com:tianqixin/runoob-git-test.git (fetch)</span></span>
<span class="line"><span>origin2    git@github.com:tianqixin/runoob-git-test.git (push)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>删除仓库 origin2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>$ git remote rm origin2</span></span>
<span class="line"><span>$ git remote -v</span></span>
<span class="line"><span>origin    git@github.com:tianqixin/runoob-git-test.git (fetch)</span></span>
<span class="line"><span>origin    git@github.com:tianqixin/runoob-git-test.git (push)</span></span></code></pre></div><h2 id="笔记" tabindex="-1">笔记 <a class="header-anchor" href="#笔记" aria-label="Permalink to &quot;笔记&quot;">​</a></h2><ul><li>执行 <code>git fetch origin master</code> 时，它的意思是从名为 <strong>origin</strong> 的远程上拉取名为 <strong>master</strong> 的分支到本地分支 <strong>origin/master</strong> 中。既然是拉取代码，当然需要同时指定远程名与分支名，所以分开写。</li><li>执行 <code>git merge origin/master</code> 时，它的意思是合并名为 <strong>origin/master</strong> 的分支到当前所在分支。既然是分支的合并，当然就与远程名没有直接的关系，所以没有出现远程名。需要指定的是被合并的分支。</li><li>执行 <code>git push origin master</code> 时，它的意思是推送本地的 <strong>master</strong> 分支到远程 <strong>origin</strong>，涉及到远程以及分支，当然也得分开写了。</li><li>还可以一次性拉取多个分支的代码：<code>git fetch origin master stable oldstable</code>；</li><li>也还可以一次性合并多个分支的代码：<code>git merge origin/master hotfix-2275 hotfix-2276 hotfix-2290</code>；</li></ul><p>ssh 访问 gitHub 出错如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>$ ssh -T git@github.com</span></span>
<span class="line"><span>The authenticity of host &#39;github.com (140.82.118.4)&#39; can&#39;t be established.</span></span>
<span class="line"><span>RSA key fingerprint is SHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8.</span></span>
<span class="line"><span>Are you sure you want to continue connecting (yes/no)? </span></span>
<span class="line"><span>Host key verification failed.</span></span></code></pre></div><p>解决办法：（将GitHub添加到信任主机列表后，可以成功访问）</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>$ ssh-keyscan -t rsa github.com &gt;&gt; ~/.ssh/known_hosts</span></span>
<span class="line"><span># github.com:22 SSH-2.0-babeld-d45c1532</span></span>
<span class="line"><span></span></span>
<span class="line"><span>$ ssh -T git@github.com</span></span>
<span class="line"><span>Warning: Permanently added the RSA host key for IP address &#39;140.82.118.4&#39; to the list of known hosts.</span></span>
<span class="line"><span>Hi earthnorth! You&#39;ve successfully authenticated, but GitHub does not provide shell access.</span></span></code></pre></div>`,78),e=[i];function o(l,c,g,r,h,d){return n(),a("div",null,e)}const m=s(t,[["render",o]]);export{b as __pageData,m as default};
