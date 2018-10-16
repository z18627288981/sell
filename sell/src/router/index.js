import Vue from 'vue'
import Router from 'vue-router'
import Goods from '@/pages/goods/Goods'
import Ratings from '@/pages/ratings/Ratings'
import Sells from '@/pages/sells/Sells'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/goods',
    name: 'Goods',
    component: Goods
  }, {
    path: '/sells',
    name: 'Sells',
    component: Sells
  }, {
    path: '/ratings',
    name: 'Ratings',
    component: Ratings
  }]
})
