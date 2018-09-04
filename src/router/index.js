import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Dashboard from '@/components/admin/dashboard'
import Login from '@/components/admin/pages/login'
import Products from '@/components/admin/pages/products'
import Coupons from '@/components/admin/pages/coupons'
import Orders from '@/components/admin/pages/orders'
import CustomOrder from '@/components/admin/pages/customOrder'
import PayCheckout from '@/components/admin/pages/payCheckout'
import Home from '@/components/client/home'
import ShopPage from '@/components/client/pages/shop_page'
import ProductPage from '@/components/client/pages/product_page'
import CheckOutPage from '@/components/client/pages/checkout'
import Pay from '@/components/client/pages/pay'
import Game from '@/components/client/pages/game'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/admin',
      name: 'admin',
      component: Dashboard,
      children: [
        {
          path: 'products',
          name: 'products',
          component: Products,
          meta: {requiresAuth: true}
        },
        {
          path: 'coupons',
          name: 'coupons',
          component: Coupons,
          meta: {requiresAuth: true}
        },
        {
          path: 'orders',
          name: 'orders',
          component: Orders,
          meta: {requiresAuth: true}
        },
        {
          path: 'custom_order',
          name: 'CustomOrder',
          component: CustomOrder,
        },
        {
          path: 'pay_checkout/:order_id',
          name: 'PayCheckout',
          component: PayCheckout,
        }
      ]
    },
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          name: 'ShopPage',
          component: ShopPage,
          props: true
        },
        {
          path: 'product/:id',
          name: 'ProductPage',
          component: ProductPage,
        },
      ]
    },
    {
      path: '/checkout',
      name: 'CheckOutPage',
      component: CheckOutPage,
    },
    {
      path: '/pay/:order_id',
      name: 'Pay',
      component: Pay,
    },
    {
      path: '/coupon_game',
      name: Game,
      component: Game
    },
    {
      path: '*',
      redirect: '/login'
    },
  ]
})
