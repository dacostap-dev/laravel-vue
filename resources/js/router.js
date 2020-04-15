import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const TheContainer = () => import('./containers/TheContainer')
const Dashboard = () => import('./views/Dashboard')


function configRoutes() {
    return [
        {
            path: '/',
            name: 'Home',
            redirect: '/dashboard',
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: () => import('./views/Dashboard')
        },
        {
            path: '/notas',
            name: 'Notas',
            component: () => import('./components/ModulsListComponent')
        },
        {
            path: '/modulos/:studentId',
            name: 'Modulos',
            component: () => import('./components/ModulsListComponent')
        },
    ]
}

const router = new VueRouter({
    mode: 'hash', // https://router.vuejs.org/api/#mode
    linkActiveClass: 'active',
    scrollBehavior: () => ({ y: 0 }),
    routes: configRoutes()
  })

export default router