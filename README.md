## 使用

在 pages 文件夹下加页面文件夹
会根据页面目录路径生成路由地址

约定需要有`index.jsx`、`me.json`与`reducer.js`，会根据这些文件动态注入，路由注入标志为`__ROUTE__`，redux 注入标志为`// __REDUCER__`

组件导出`import { connect } from "zStore/configureStore";`，使用`connect`包囊就行

使用方式和 dva 类似

## 自动加载路由

## 自动加载 redux

https://blog.csdn.net/yehuozhili/article/details/103997930

https://segmentfault.com/a/1190000017270785#%E7%AC%AC2%E7%A7%8D%E4%BD%BF%E7%94%A8%E6%96%B9%E5%BC%8F

https://dvajs.com/guide/
