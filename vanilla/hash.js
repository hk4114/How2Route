// 路由视图
let vanillaHashRouterView = null

function onLoad() {
  vanillaHashRouterView = document.querySelector('.vanilla.hash .container')
  onHashChange()
}

// 路由变化时，根据路由渲染对应 UI
function onHashChange() {
  if (location.hash === '#/home') {
    vanillaHashRouterView.innerHTML = '<h2>Hash Router(Vanilla) Home</h2>'
  } else if (location.hash === '#/about') {
    vanillaHashRouterView.innerHTML = '<h2>Hash Router(Vanilla) About</h2>'
  }
}

// 页面加载完不会触发 hashchange，这里主动触发一次 hashchange 事件
window.addEventListener('DOMContentLoaded', onLoad)

// 监听路由变化
window.addEventListener('hashchange', onHashChange)