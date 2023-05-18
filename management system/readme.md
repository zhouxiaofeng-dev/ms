# 实现过程

```
1. app.js 入口文件，引入路由模块，然后通过指定路径访问路由 
2. 路由模块:使用express的Router函数 将路由封装成post或get方法。expressJoi(...)是对请求数据的规则验证，验证失败会抛出一个全局的Error，给app.js上的错误中间件接收。然后后面是各自的处理函数包装到router_handler中
3.router_handler:逻辑代码的真正存储地方。req.body是请求数据，做出相应的逻辑语句后，返回相应的情况
```

## 引入文件作用

### app.js

```
1.cors:解决跨域问题
2.joi:在这里的作用是对错误进行类型检查。主要作用是对数据进行规范（schema中）
3.config:引入配置文件
4.expressJWT:配置解析JWT的中间件
```

### router

```
1.expressJoi:实现自动对表单数据进行验证的功能

```

### router-handler

```
1.bcryptjs:加密密码
2.jwt:包装token
```

### schema

```
1.joi:规定数据的类型集合
```

