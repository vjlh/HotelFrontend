import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import '@babel/polyfill';
import {SchedulePlugin} from '@syncfusion/ej2-vue-schedule';

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
export default new Vuetify()

//import SchedulePlugin from '@syncfusion/ej2-vue-schedule';

/*loadCldr(
    require('cldr-data/supplemental/numberingSystems.json'),
    require('cldr-data/main/es-CL/ca-gregorian.json'),
    require('cldr-data/main/es-CL/numbers.json'));
    require('cldr-data/main/es-CL/timeZoneNames.json');
*/


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {

    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.loggedIn) {
      next({
        name: 'login',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.loggedIn) {
      next({
        name: 'home',
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

Vue.config.productionTip = false
Vue.use(SchedulePlugin, {
    'ejs-schedule': SchedulePlugin
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')