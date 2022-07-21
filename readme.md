# 前端路由

## 本质
对 url 进行改变和监听，来让某个 dom 节点显示对应的视图。

## 如何实现？
浏览器端的路由分为两种
1. hash `baidu.com/#foo` 
2. history `baidu.com/foo` 


### 如何监听

hash 通过 `window.addEventListener('hashchange')` 这个事件，就可以监听到 `hash` 值的变化。

history 通过 `history.pushState` 让 url 改变，但是不重新加载页面，完全由用户决定如何处理这次 `url` 改变。

### 如何改变
- Router

Router 的核心原理就是通过 Provider 把 location 和 history 等路由关键信息传递给子组件，并且在路由发生变化的时候要让子组件可以感知到

- Route

Route 组件接受 path 和 children 两个 prop，本质上就决定了在某个路径下需要渲染什么组件，我们又可以通过 Router 的 Provider 传递下来的 location 信息拿到当前路径，所以这个组件需要做的就是判断当前的路径是否匹配，渲染对应组件。

- extractUrlPath

准确匹配去处理动态路由。
```js
const extractUrlPath = url => /https?:\/\/[^/]+([^?#]*)/.exec(url)[1];
const extractHashPath = url => (/#(.*)$/g.exec(url) || ["", ""])[1];
```