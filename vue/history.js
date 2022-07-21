const RouterView = Vue.component('router-view', {
  template: '<component :is="routeView" />',
  data() {
    return {
      routeView: null
    }
  },
  created() {
    this.boundPopState = this.onPopState.bind(this)
  },
  beforeMount() {
    this.$root.$on('popstate', this.boundPopState)
  },
  beforeDestroy() {
    this.$root.$off('popstate', this.boundPopState)
  },
  methods: {
    onPopState(e) {
      const path = extractUrlPath(window.location.href)
      this.routeView = this.$root.$routes[path] || null
      console.log('[Vue] popstate:', path)
    }
  }
})

const RouterLink = Vue.component('router-link', {
  template: '<a @click.prevent="onClick" href=""><slot></slot></a>',
  props: {
    to: String
  },
  methods: {
    onClick() {
      history.pushState(null, '', this.to)
      this.$root.$emit('popstate')
    }
  }
})

const HistoryRoutes = {
  '/home': {
    template: '<h2>Home</h2>'
  },
  '/about': {
    template: '<h2>About</h2>'
  }
}

const HistoryApp = new Vue({
  el: '.vue.history',
  components: {
    'router-view': RouterView,
    'router-link': RouterLink
  },
  created() {
    this.$routes = HistoryRoutes
    this.boundPopState = this.onPopState.bind(this)
  },
  beforeMount() {
    window.addEventListener('popstate', this.boundPopState)
  },
  beforeDestroy() {
    window.removeEventListener('popstate', this.boundPopState)
  },
  methods: {
    onPopState(...args) {
      this.$emit('popstate', ...args)
    }
  }
})