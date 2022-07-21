// 路由视图
let vanillaHisoryRouterView = null

function onLoad () {
  vanillaHisoryRouterView = document.querySelector('.vanilla.history .container')
  onPopState()

  // 拦截 <a> 标签点击事件默认行为， 点击时使用 pushState 修改 URL并更新手动 UI，从而实现点击链接更新 URL 和 UI 的效果。
  var linkList = document.querySelectorAll('.vanilla.history a[href]')
  linkList.forEach(el => el.addEventListener('click', function (e) {
    e.preventDefault()
    history.pushState(null, '', el.getAttribute('href'))
    onPopState()
  }))
}

// 路由变化时，根据路由渲染对应 UI
function onPopState () {
  switch (location.pathname) {
    case '/home':
      vanillaHisoryRouterView.innerHTML = '<h2>History Router(Vanilla) Home</h2>'
      return
    case '/about':
      vanillaHisoryRouterView.innerHTML = '<h2>History Router(Vanilla) About</h2>'
      return
    default:
      return
  }
}

window.addEventListener('DOMContentLoaded', onLoad)
// 监听路由变化
window.addEventListener('popstate', onPopState)