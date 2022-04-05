## 使用

在 pages 文件夹下加页面文件夹
会根据页面目录路径生成路由地址

约定需要有`index.jsx`、`me.json`与`reducer.js`，会根据这些文件动态注入，路由注入标志为`__ROUTE__`，redux 注入标志为`// __REDUCER__`

组件导出`import { connect } from "zStore/configureStore";`，使用`connect`包囊就行

使用方式和 dva 类似

## 自动加载路由

`router-loader`匹配到对应的注入标志编辑目录生成路由拼接进去

使用`this.addContextDependency`监听目录变化，触发 loader 更新

## 自动加载 redux

redux 也是类似的方式注入到标志位，但 action、type、saga 合并为 reducer，是运行时操作的，代码查看`zStore`目录

https://blog.csdn.net/yehuozhili/article/details/103997930

https://segmentfault.com/a/1190000017270785#%E7%AC%AC2%E7%A7%8D%E4%BD%BF%E7%94%A8%E6%96%B9%E5%BC%8F

https://dvajs.com/guide/
