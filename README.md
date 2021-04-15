# vue_shop_demo

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## 关于后端接口

vue_api_server 文件夹充当我们的后端，vue_api_server/db/mydb.sql 里面是写好的 sql 脚本，在自己的数据库里运行一下，就建好了表，导入了数据

然后运行 node app.js 启动服务 中间可能会遇到的错误：

- Error: Cannot find module 'mount-routes'
  
  这个可以通过 npm install -g mount-routes 全局安装解决
  
- Error: ER_ACCESS_DENIED_ERROR: Access denied for user 'root'@'localhost' (using password: YES)

  这个是因为密码不正确，在 vue_api_server/config/default.js 修改成自己数据库的密码就好了
  
PS：在 node app.js 之前 要 npm install 安装所有的依赖包    
