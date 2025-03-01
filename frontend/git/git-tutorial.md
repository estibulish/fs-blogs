# 设置用户名和邮箱
```
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"
```

# 查看配置信息
```
git config --list
```

# 初始化新仓库
```
git init
```

# 克隆远程仓库
```
git clone <仓库地址>
```

# 查看文件状态
```
git status
```

# 查看变更内容
```
git diff <文件名>    # 查看指定文件的变更
git diff <commit_id>           # 与指定提交比较
git diff HEAD                  # 与最新提交比较
git diff HEAD^                 # 与上一次提交比较
git diff HEAD~3               # 与三次提交之前比较
```

# 查看暂存区的修改
```
git diff --staged   # 或 git diff --cached
```

# 添加文件到暂存区
```
git add <文件名>    # 添加指定文件
git add .          # 添加所有文件
```

# 提交更改
```
git commit -m "完成新功能开发"
```

# 查看分支
```
git branch                # 查看本地分支
git branch -r            # 查看远程分支
git branch -a            # 查看所有分支
```

# 创建分支
```
git branch <分支名>
```

# 切换分支
```
git checkout <分支名>
# 或使用新命令
git switch <分支名>
```

# 创建并切换分支
```
git checkout -b <分支名>
# 或使用新命令
git switch -c <分支名>
```
# 切换到其他远程分支
```
git checkout -b <分支名> origin/<分支名>
```

# 刷新远程分支
```
git fetch origin
```

# 合并分支
```
git merge <要合并的分支名>
```

# 删除分支
```
git branch -d <分支名>    # 删除本地分支
git push origin --delete <分支名>  # 删除远程分支
```

# 添加远程仓库
```
git remote add origin <仓库地址>
```

# 删除远程仓库
```
git remote remove origin
```

# 推送到远程仓库
```
git push origin <分支名>
```

# 从远程仓库拉取
```
git pull origin <分支名>
```

# git pull 报错 refusing to merge unrelated histories
```
git pull origin <分支名> --allow-unrelated-histories
```

# 查看远程仓库信息
```
git remote -v
```

# 撤销工作区的修改
```
git checkout -- <文件名>
# 或使用新命令
git restore <文件名>
```

# 撤销暂存区的修改
```
git reset HEAD <文件名>
# 或使用新命令
git restore --staged <文件名>
```

# 撤销提交
```
git reset --soft HEAD^    # 撤销上一次提交，保留修改
git reset --hard HEAD^    # 撤销上一次提交，删除修改
```

# 查看变更内容
```
git diff
```

# 比较某个文件的变化
```
git diff <文件路径>
```

# 比较某个文件与指定提交的差异
```
git diff <commit_id> <文件路径>
```

# 比较两个分支的差异
```
git diff <分支1> <分支2>               # 比较两个分支的差异
git diff main feature/new-branch      # 示例：比较main分支和feature分支
```

# 显示变更统计信息
```
git diff --stat
```

# 显示具体的增删行数
```
git diff --numstat
```

# 忽略空白字符的变化
```
git diff -w
```

# 忽略空白数量的变化
```
git diff --ignore-space-change
```

# 显示更多的上下文行数
```
git diff -U<行数>
```

# 显示变更周围5行内容
```
git diff -U5
```

# 按词显示差异
```
git diff --color-words
```

# 以行内方式显示差异
```
git diff --word-diff
```

# 生成补丁文件
```
git diff > changes.patch     # 将差异保存到文件
git diff <commit_id> > changes.patch  # 将与特定提交的差异保存到文件
```

# 比较两个提交之间的差异
```
git diff <commit_id1>..<commit_id2>   # 比较两个提交之间的差异
```

# 查看特定文件在两个提交之间的变化
```
git diff <commit_id1> <commit_id2> -- <文件路径>
```

# 查看提交历史
```
git log
git log --oneline        # 简洁显示
git log --graph          # 图形显示
```

# 查看指定文件的修改历史
```
git blame <文件名>
```

# 创建标签
```
git tag <标签名>
git tag -a <标签名> -m "标签说明"
```

# 查看标签
```
git tag
```

# 推送标签到远程
```
git push origin <标签名>
git push origin --tags   # 推送所有标签
```

# 更新本地仓库
```
git pull origin main
```

# 创建功能分支
```
git checkout -b feature/新功能
```

# 合并分支
```
git checkout main
git merge feature/新功能
```

# 推送本地仓库
```
git push origin main
```

# 解决冲突
```
git merge --abort
# 注意：该命令会放弃合并，并恢复到合并前的状态，请谨慎使用；如果存在未commit的文件，请先commit，再执行该命令

```

# 当发生冲突时，Git会在文件中标记冲突部分：手动修改冲突部分，然后：
```
git add <文件名>
git commit -m "解决冲突"
```

# 找回误删的提交
```
# 查看操作历史
git reflog

# 恢复到指定提交
git reset --hard <提交ID>
```

# 处理紧急 bug 的工作流程

## 1. 保存当前工作进度
```
# 保存当前工作进度
git stash save "当前功能开发进度"

# 查看保存的进度列表
git stash list
```

## 2. 切换到生产分支
```
# 切换到主分支
git checkout main

# 拉取最新代码
git pull origin main
```

## 3. 创建 bug 修复分支
```
# 创建并切换到 bug 修复分支
git checkout -b hotfix/bug-description
```

## 4. 修复 bug
```
# 提交 bug 修复
git add .
git commit -m "fix: 修复了xxx bug"
```

## 5. 合并到主分支
```
# 切换到主分支
git checkout main

# 合并 bug 修复分支
git merge hotfix/bug-description

# 推送到远程
git push origin main
```

## 6. 恢复之前的工作进度
```
# 切换回功能开发分支
git checkout feature/功能分支

# 恢复之前保存的工作进度
git stash pop    # 恢复最近一次的进度
# 或
git stash apply stash@{序号}    # 恢复指定的进度

# 如果出现冲突，解决冲突后：
git add .
git commit -m "merge: 解决与 hotfix 的冲突"
```

## 7. 同步 bug 修复到功能分支
```
# 在功能分支上合并主分支
git merge main

# 如果有冲突，解决后提交
git add .
git commit -m "merge: 合并主分支 bug 修复"
```

## 8. 清理工作
```
# 删除本地 bug 修复分支
git branch -d hotfix/bug-description

# 删除远程 bug 修复分支（如果推送到远程了）
git push origin --delete hotfix/bug-description
```

## 补充说明：stash 相关命令
```
# 保存未提交的修改
git stash

# 保存未提交的修改并添加说明
git stash save "说明信息"

# 查看 stash 列表
git stash list

# 应用最近一次的 stash
git stash apply

# 应用指定的 stash
git stash apply stash@{序号}

# 应用并删除最近一次的 stash
git stash pop

# 删除最近一次的 stash
git stash drop

# 删除所有 stash
git stash clear
```





