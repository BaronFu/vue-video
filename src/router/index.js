import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/Home'
import Category from '@/pages/Category'
import Dynamic from '@/pages/Dynamic'
import User from '@/pages/User'
import Login from '@/pages/Login'
import Register from '@/pages/register'
import Artwork from '@/pages/artwork'
import Introduction from '@/pages/introduction'
import Ratings from '@/pages/ratings'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/category',
      name: 'category',
      component: Category
    },
    {
      path: '/dynamic',
      name: 'dynamic',
      component: Dynamic
    },
    {
      path: '/user',
      name: 'user',
      component: User
    },
    {
      path: '/user/login',
      name: 'login',
      component: Login
    },
    {
      path: '/user/register',
      component: Register
    },
    {
      path: '/artwork/:id',
      name: 'artwork',
      component: Artwork,
      children: [
        {
          path: '',
          component: Introduction
        },
        {
          path: 'introduction',
          name: 'introduction',
          component: Introduction
        },
        {
          path: 'ratings',
          name: 'ratings',
          component: Ratings
        }
      ]
    }
  ],
  linkActiveClass: 'active'
})
