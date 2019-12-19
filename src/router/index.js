import Vue from 'vue'
import Router from 'vue-router'
import Header from '@/components/Header'
import Login from '@/page/Login'
import Component1 from '@/components/Header copy'
import Component2 from '@/components/Header copy 2'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/header',
      name: 'Header',
      component: Header
    },
    {
      path: '/component1',
      name: 'component1',
      component: Component1
    },
    {
      path: '/component2',
      name: 'component2',
      component: Component2
    },
  ]
})
