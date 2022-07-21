const HashRouterView = Vue.component('router-view', {
  template: '<component :is="routeView" />',
  data() {
    return {
      routeView: null
    }
  },
  created() {
    this.boundHashChange = this.onHashChange.bind(this)
  },
  beforeMount() {
    window.addEventListener('hashchange', this.boundHashChange)
  },
  mounted() {
    this.onHashChange()
  },
  beforeDestroy() {
    window.removeEventListener('hashchange', this.boundHashChange)
  },
  methods: {
    onHashChange() {
      const path = extractHashPath(window.location.href)
      this.routeView = this.$root.$routes[path] || null
      console.log('vue:hashchange:', path)
    }
  }
})

const HashRouterLink = Vue.component('', {
  template: '<a @click.prevent="onClick" href=""><slot></slot></a>',
  props: {
    to: String
  },
  methods: {
    onClick() {
      window.location.hash = '#' + this.to
    }
  }
})


const HashRoutes = {
  '/home': {
    template: '<h2>Home</h2>'
  },
  '/about': {
    template: '<h2>About</h2>'
  }
}

const HashApp = new Vue({
  el: '.vue.hash',
  components: {
    'router-view': HashRouterView,
    'router-link': HashRouterLink
  },
  beforeCreate() {
    this.$routes = HashRoutes
  }
})

