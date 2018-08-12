import Vue from 'vue';
import Router from 'vue-router'

import Signup from '@/views/Signup.vue'

Vue.use(Router)

var routes = [{
    path: '*', 
    redirect: '/'
},  {
    path: '/',
    redirect: '/retailer-hehua/signup',
},  {
    path: '/retailer-hehua/signup',
    component: Signup,
    name: 'Signup'
}]

const scrollBehavior = (to, from, savedPosition) => {
    if (savedPosition) {
        return savedPosition
    } else {
        return { x: 0, y: 0 }
    }
}

const router = new Router({
    mode: 'history',
    routes,
    scrollBehavior
})

export default router