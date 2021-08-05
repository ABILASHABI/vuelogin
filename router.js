import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store/store';
import i18n from '@/config/i18n.config';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/components/login/Login.vue'),
  },
 {
   path:'/',
   name:'form',
   component:() => import('@/components/login/form.vue'),
 },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/components/login/Register.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/components/login/Login.vue'),
  },
];

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (!to.query.hasOwnProperty('lang')) {
    i18n.initialized.then(() => {
      to.query.lang = i18n.i18next.language;
      next(to);
    });
  } else {
    next();
  }
});

export default router;
