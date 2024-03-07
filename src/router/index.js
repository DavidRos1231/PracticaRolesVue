import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';


Vue.use(VueRouter)

import Login from '../components/Login.vue';
import Admin from  '../components/Admin.vue';
import Editor from  '../components/Editor.vue';
import Viewer from  '../components/Viewer.vue';
import Unauthorized from  '../components/Unauthorized.vue';
import NotFound from  '../components/NotFound.vue';

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component:Login
    },
    {
      path: '/admin',
      name: 'admin',
      component:Admin,
      meta:{role:"ADMIN"}
    },
    {
      path: '/editor',
      name: 'editor',
      component:Editor,
      meta:{role:"EDITOR"}
    },
    {
      path: '/viewer',
      name: 'viewer',
      component:Viewer,
      meta:{role:"VIEWER"}
    },
    {
      path: '/:catchAll(.*)',
      name:NotFound,
      component:NotFound
    }
  ]
})

export default router

router.beforeEach((to,from,next) => {
  const publicPages = ['/login','/','/unathorized'];
  //Se añaden rutas que consideren publicas
  const authRequired =!publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('token');

  if(authRequired && !loggedIn){
    return next('/login');
  }

  if(loggedIn){
    const decoded = jwtDecode(loggedIn);
    const role = decoded.role;
    if(to.meta.role && to.meta.role !== role){
      return next('/unauthorized')
    }
  }
}
  )
