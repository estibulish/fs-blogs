import{_ as s,c as a,o as n,aT as p}from"./chunks/framework.qpm8FIA8.js";const u=JSON.parse('{"title":"Git 查看提交历史","description":"","frontmatter":{},"headers":[],"relativePath":"frontend/git/git-commit-history.md","filePath":"frontend/git/git-commit-history.md","lastUpdated":1711621612000}'),e={name:"frontend/git/git-commit-history.md"},t=p(`<h1 id="git-查看提交历史" tabindex="-1">Git 查看提交历史 <a class="header-anchor" href="#git-查看提交历史" aria-label="Permalink to &quot;Git 查看提交历史&quot;">​</a></h1><p>Git 提交历史一般常用两个命令：</p><ul><li><p>git log - 查看历史提交记录。</p></li><li><p>git blame file - 以列表形式查看指定文件的历史修改记录。</p></li></ul><p><strong>git log</strong> 在使用 Git 提交了若干更新之后，又或者克隆了某个项目，想回顾下提交历史，我们可以使用 <code>git log</code> 命令查看。</p><p><strong>git log</strong> 命令用于查看 Git 仓库中提交历史记录。</p><p><strong>git log</strong> 显示了从最新提交到最早提交的所有提交信息，包括提交的哈希值、作者、提交日期和提交消息等。</p><p><strong>git log</strong> 命令的基本语法：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>git log [选项] [分支名/提交哈希]</span></span></code></pre></div><p>常用的选项包括：</p><p>-p：显示提交的补丁（具体更改内容）。 --oneline：以简洁的一行格式显示提交信息。 --graph：以图形化方式显示分支和合并历史。 --decorate：显示分支和标签指向的提交。 --author=&lt;作者&gt;：只显示特定作者的提交。 --since=&lt;时间&gt;：只显示指定时间之后的提交。 --until=&lt;时间&gt;：只显示指定时间之前的提交。 --grep=&lt;模式&gt;：只显示包含指定模式的提交消息。 --no-merges：不显示合并提交。 --stat：显示简略统计信息，包括修改的文件和行数。 --abbrev-commit：使用短提交哈希值。 --pretty=&lt;格式&gt;：使用自定义的提交信息显示格式。 针对我们前一章节的操作，使用 <code>git log</code> 命令列出历史提交记录如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>$ git log</span></span>
<span class="line"><span>commit d5e9fc2c811e0ca2b2d28506ef7dc14171a207d9 (HEAD -&gt; master)</span></span>
<span class="line"><span>Merge: c68142b 7774248</span></span>
<span class="line"><span>Author: runoob &lt;test@runoob.com&gt;</span></span>
<span class="line"><span>Date:   Fri May 3 15:55:58 2019 +0800</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Merge branch &#39;change_site&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>commit c68142b562c260c3071754623b08e2657b4c6d5b</span></span>
<span class="line"><span>Author: runoob &lt;test@runoob.com&gt;</span></span>
<span class="line"><span>Date:   Fri May 3 15:52:12 2019 +0800</span></span>
<span class="line"><span></span></span>
<span class="line"><span>修改代码</span></span>
<span class="line"><span></span></span>
<span class="line"><span>commit 777424832e714cf65d3be79b50a4717aea51ab69 (change_site)</span></span>
<span class="line"><span>Author: runoob &lt;test@runoob.com&gt;</span></span>
<span class="line"><span>Date:   Fri May 3 15:49:26 2019 +0800</span></span>
<span class="line"><span></span></span>
<span class="line"><span>changed the runoob.php</span></span>
<span class="line"><span></span></span>
<span class="line"><span>commit c1501a244676ff55e7cccac1ecac0e18cbf6cb00</span></span>
<span class="line"><span>Author: runoob &lt;test@runoob.com&gt;</span></span>
<span class="line"><span>Date:   Fri May 3 15:35:32 2019 +0800</span></span></code></pre></div><p>我们可以用 --oneline 选项来查看历史记录的简洁的版本。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>$ git log --oneline</span></span>
<span class="line"><span>$ git log --oneline</span></span>
<span class="line"><span>d5e9fc2 (HEAD -&gt; master) Merge branch &#39;change_site&#39;</span></span>
<span class="line"><span>c68142b 修改代码</span></span>
<span class="line"><span>7774248 (change_site) changed the runoob.php</span></span>
<span class="line"><span>c1501a2 removed test.txt、add runoob.php</span></span>
<span class="line"><span>3e92c19 add test.txt</span></span>
<span class="line"><span>3b58100 第一次版本提交</span></span></code></pre></div><p>这告诉我们的是，此项目的开发历史。</p><p>我们还可以用 --graph 选项，查看历史中什么时候出现了分支、合并。以下为相同的命令，开启了拓扑图选项：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>*d5e9fc2 (HEAD -&gt; master) Merge branch &#39;change_site&#39;</span></span>
<span class="line"><span>|\\  </span></span>
<span class="line"><span>| * 7774248 (change_site) changed the runoob.php</span></span>
<span class="line"><span>* | c68142b 修改代码</span></span>
<span class="line"><span>|/  </span></span>
<span class="line"><span>*c1501a2 removed test.txt、add runoob.php</span></span>
<span class="line"><span>*3e92c19 add test.txt</span></span>
<span class="line"><span>*3b58100 第一次版本提交</span></span></code></pre></div><p>现在我们可以更清楚明了地看到何时工作分叉、又何时归并。</p><p>你也可以用 <strong>--reverse</strong> 参数来逆向显示所有日志。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>$ git log --reverse --oneline</span></span>
<span class="line"><span>3b58100 第一次版本提交</span></span>
<span class="line"><span>3e92c19 add test.txt</span></span>
<span class="line"><span>c1501a2 removed test.txt、add runoob.php</span></span>
<span class="line"><span>7774248 (change_site) changed the runoob.php</span></span>
<span class="line"><span>c68142b 修改代码</span></span>
<span class="line"><span>d5e9fc2 (HEAD -&gt; master) Merge branch &#39;change_site&#39;</span></span></code></pre></div><p>如果只想查找指定用户的提交日志可以使用命令：git log --author , 例如，比方说我们要找 Git 源码中 Linus 提交的部分：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>$ git log --author=Linus --oneline -5</span></span>
<span class="line"><span>81b50f3 Move &#39;builtin-*&#39; into a &#39;builtin/&#39; subdirectory</span></span>
<span class="line"><span>3bb7256 make &quot;index-pack&quot; a built-in</span></span>
<span class="line"><span>377d027 make &quot;git pack-redundant&quot; a built-in</span></span>
<span class="line"><span>b532581 make &quot;git unpack-file&quot; a built-in</span></span>
<span class="line"><span>112dd51 make &quot;mktag&quot; a built-in</span></span></code></pre></div><p>如果你要指定日期，可以执行几个选项：--since 和 --before，但是你也可以用 --until 和 --after。</p><p>例如，如果我要看 Git 项目中三周前且在四月十八日之后的所有提交，我可以执行这个（我还用了 --no-merges 选项以隐藏合并提交）：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>$ git log --oneline --before={3.weeks.ago} --after={2010-04-18} --no-merges</span></span>
<span class="line"><span>5469e2d Git 1.7.1-rc2</span></span>
<span class="line"><span>d43427d Documentation/remote-helpers: Fix typos and improve language</span></span>
<span class="line"><span>272a36b Fixup: Second argument may be any arbitrary string</span></span>
<span class="line"><span>b6c8d2d Documentation/remote-helpers: Add invocation section</span></span>
<span class="line"><span>5ce4f4e Documentation/urls: Rewrite to accomodate transport::address</span></span>
<span class="line"><span>00b84e9 Documentation/remote-helpers: Rewrite description</span></span>
<span class="line"><span>03aa87e Documentation: Describe other situations where -z affects git diff</span></span>
<span class="line"><span>77bc694 rebase-interactive: silence warning when no commits rewritten</span></span>
<span class="line"><span>636db2c t3301: add tests to use --format=&quot;%N&quot;</span></span></code></pre></div><p>更多 <strong>git log</strong> 命令可查看 <a href="http://git-scm.com/docs/git-log" target="_blank" rel="noreferrer">http://git-scm.com/docs/git-log</a> 或使用 <code>git log --help</code> 命令查看帮助信息。</p><h2 id="git-blame" tabindex="-1"><strong>git blame</strong> <a class="header-anchor" href="#git-blame" aria-label="Permalink to &quot;**git blame**&quot;">​</a></h2><p><strong>git blame</strong> 命令用于逐行显示指定文件的每一行代码是由谁在什么时候引入或修改的。</p><p>strong&gt;git blame 可以追踪文件中每一行的变更历史，包括作者、提交哈希、提交日期和提交消息等信息。</p><p>如果要查看指定文件的修改记录可以使用 git blame 命令，格式如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>git blame [选项] &lt;文件路径&gt;</span></span></code></pre></div><p>常用的选项包括：</p><ul><li>-L &lt;起始行号&gt;,&lt;结束行号&gt;：只显示指定行号范围内的代码注释。</li><li>-C：对于重命名或拷贝的代码行，也进行代码行溯源。</li><li>-M：对于移动的代码行，也进行代码行溯源。</li><li>-C -C 或 -M -M：对于较多改动的代码行，进行更进一步的溯源。</li><li>--show-stats：显示包含每个作者的行数统计信息。</li></ul><p>显示文件每一行的代码注释和相关信息：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>git blame &lt;文件路径&gt;</span></span></code></pre></div><p>只显示指定行号范围内的代码注释：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>git blame -L &lt;起始行号&gt;,&lt;结束行号&gt; &lt;文件路径&gt;</span></span></code></pre></div><p>对于重命名或拷贝的代码行进行溯源：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>git blame -C &lt;文件路径&gt;</span></span></code></pre></div><p>对于移动的代码行进行溯源：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>git blame -M &lt;文件路径&gt;</span></span></code></pre></div><p>显示行数统计信息：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>git blame --show-stats &lt;文件路径&gt;</span></span></code></pre></div><p>git blame 命令是以列表形式显示修改记录，如下实例：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>$ git blame README </span></span>
<span class="line"><span>^d2097aa (tianqixin 2020-08-25 14:59:25 +0800 1) # Runoob Git 测试</span></span>
<span class="line"><span>db9315b0 (runoob    2020-08-25 16:00:23 +0800 2) # 菜鸟教程</span></span></code></pre></div><p>更多内容可以使用 <code>git blame --help</code> 查看完整的帮助文档，了解更多选项和使用方式。</p>`,45),i=[t];function l(o,c,g,d,r,h){return n(),a("div",null,i)}const m=s(e,[["render",l]]);export{u as __pageData,m as default};
