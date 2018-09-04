// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import VeeValidate from 'vee-validate'; 
import zhTWValidate from 'vee-validate/dist/locale/zh_TW';
import 'vue-loading-overlay/dist/vue-loading.min.css';
import 'bootstrap';

import App from './App';
import router from './router';
import './bus';
import currencyFilter from './filters/currency';
import dateFilter from './filters/dateFilter';

Vue.use(VueAxios, axios);
Vue.use(VeeValidate);
VeeValidate.Validator.localize('zh_TW', zhTWValidate);

Vue.config.productionTip = false

Vue.component('Loading', Loading);
Vue.filter('currencyFilter', currencyFilter);
Vue.filter('dateFilter', dateFilter);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.APIPATH}/api/user/check`;
    axios.post(api).then((response) => {
      if (response.data.success) {
        next();
      } else {
        next({
          path: '/login'
        });
      }
    })
  } else {
    next();
  }
})
