# VUE项目自动化部署

一、安装 scp2，用ssh链接到服务器上

> npm install scp2 --save-dev
>

是否有控制台inquirer.js,没得在装一个

> npm install inquirer
>

二、新建js文件，例如 upload.js ，位置和 package.json平级即可，注意scp2，ora等版本，是否支持requie，import。

```js
'use strict'
// 引入scp2
var client = require('scp2');
// 下面三个插件是部署的时候控制台美化所用 可有可无
const ora = require('ora');
const chalk = require('chalk');
const inquirer = require('inquirer');

//服务器链接信息
const server_list={
  //比如这是测试环境
  dev:{
    host: '', // 服务器的IP地址
    port: '22',            // 服务器端口， 一般为 22
    username: '',       // 用户名
    password: '',     // 密码
    path: '/www/wwwroot/test'            // 项目部署的服务器目标位置
  },
  //这是生产环境
  prod:{
    host: '', // 服务器的IP地址
    port: '22',            // 服务器端口， 一般为 22
    username: '',       // 用户名
    password: '',     // 密码
    path: '/www/wwwroot/test'
    // 项目部署的服务器目标位置
  }
};

inquirer.prompt([{
  name: 'conform',
  message: `是否需要上传文件到服务器？`,
  type: 'list',
  default: 0,
  choices: [{name: '是',value: 1}, {name: '否',value: 0}]
},{
  name: 'choose',
  message: `选择上传的环境`,
  type: 'list',
  default: 0,
  choices: ["测试环境","生产环境"]
}]).then(function (answers) {
  if(answers.choose == 99){
    console.log('取消上传');
  }else{
    //赋值环境信息
    let send_server={};
    let ora_chalk="";
    if(answers.choose == "测试环境"){
      send_server=server_list.dev;
      ora_chalk="测试环境:正在发布到服务器中...";
    }else if(answers.choose == "生产环境"){
      send_server=server_list.prod;
      ora_chalk="生产环境:正在发布到服务器中...";
    }
    //开启loading
    const spinner = ora(chalk.green(ora_chalk));
    spinner.start();
    //链接服务器
    client.scp('./dist/', send_server, err =>{
      spinner.stop();
      if (!err) {
        console.log(chalk.green("项目发布完毕!"))
      } else {
        console.log(chalk.red("上传失败:"),err);
      }
    })
  }
})
```

**三、 package.json中添加 scripts 命令**

```bash
"upload": "node upload.js",
"deploy": "npm run build && npm run upload"
```

**四、执行**
打包并且上传

> npm run deploy

上传已打包好的文件

> npm run upload