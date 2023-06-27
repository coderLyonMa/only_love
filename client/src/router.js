import Vue from 'vue';
import Router from 'vue-router';
import ItemsComponent from './components/ItemsPurchased.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/ItemsComponent',
      name: 'ItemsComponent',
      component: ItemsComponent,
    },
  ],
});
