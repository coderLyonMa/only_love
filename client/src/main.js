import 'bootstrap/dist/css/bootstrap.css';
import BootstrapVue from 'bootstrap-vue';
import Vue from 'vue';
import App from './App.vue';
import router from './router';

Vue.use(BootstrapVue);

Vue.config.productionTip = false;
Vue.component('ItemsComponent', require('./components/ItemsPurchased.vue').default);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
