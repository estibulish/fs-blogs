'use strict'
// 引入scp2

var client = require('scp2');
// 下面三个插件是部署的时候控制台美化所用 可有可无
import ora from 'ora';
import chalk from 'chalk';
import inquirer from 'inquirer';

//服务器链接信息
const server_list={
  //比如这是测试环境
  dev:{
    host: '43.139.148.160', // 服务器的IP地址
    port: '22',            // 服务器端口， 一般为 22
    username: 'root',       // 用户名
    password: 'fx${pkZ@XGV~4#K9',     // 密码
    path: '/app/blog'            // 项目部署的服务器目标位置
  },
  //这是生产环境
  prod:{
    host: '43.139.148.160', // 服务器的IP地址
    port: '22',            // 服务器端口， 一般为 22
    username: 'root',       // 用户名
    password: 'fx${pkZ@XGV~4#K9',     // 密码
    path: '/app/blog'
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
    client.scp('./.vitepress/dist/', send_server, err =>{
      spinner.stop();
      if (!err) {
        console.log(chalk.green("项目发布完毕!"))
      } else {
        console.log(chalk.red("上传失败:"),err);
      }
    })
  }
})





