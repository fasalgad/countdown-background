import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/vuekonva',
        name: 'vuekonva',
        component: () =>
            import ('../views/vuekonva.vue')
    },
    {
        path: '/drag',
        name: 'drag',
        component: () =>
            import ('../views/draganddrop.vue')
    },
    {
        path: '/drag2',
        name: 'drag2',
        component: () =>
            import ('../views/drag2.vue')
    },
    {
        path: '/drag3',
        name: 'drag3',
        component: () =>
            import ('../views/drag3.vue')
    },
    {
        path: '/',
        name: 'drag3',
        component: () =>
            import ('../views/drag3.vue')
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router