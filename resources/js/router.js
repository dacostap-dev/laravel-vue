import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
/* 
const TheContainer = () => import('./containers/TheContainer')
const Dashboard = () => import('./views/Dashboard')

const PromotionListComponent = () => import('./components/Promotion/PromotionListComponent')
const StudentListComponent = () => import('./components/StudentListComponent')
const ModulsListComponent = () => import('./components/Modul/ModulsListComponent') */

import Dashboard from './views/Dashboard';
import PromotionListComponent from './components/Promotion/PromotionListComponent';
import StudentListComponent from './components/StudentListComponent';
import ModulsListComponent from './components/Modul/ModulsListComponent';


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
            component: Dashboard,
        },
        {
            path: '/promotions',
            name: 'Promociones',
            component: PromotionListComponent,
        },
        {
            path: '/students',
            name: 'Alumnos',
            component: StudentListComponent,
            children: [{
                path: ':promotionId',
                component: PromotionListComponent,
              }],
        },
/*         {
            path: '/modulos',
            name: 'Modulos',
            component: StudentListComponent,
        }, */
        {
            path: '/modulos/:studentId',
            name: 'Modulos',
            component: ModulsListComponent,
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