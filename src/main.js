import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import '@babel/polyfill'

import { loadCldr} from '@syncfusion/ej2-base';

loadCldr(
    require('cldr-data/supplemental/numberingSystems.json'),
    require('cldr-data/main/es-CL/ca-gregorian.json'),
    require('cldr-data/main/es-CL/numbers.json'));
    require('cldr-data/main/es-CL/timeZoneNames.json');

/*import Highcharts from "highcharts";
import Gantt from "highcharts/modules/gantt";
import HighchartsVue from "highcharts-vue";

Gantt(Highcharts);
Vue.use(HighchartsVue);*/
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
