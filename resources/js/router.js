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

import PersonalToken from './components/passport/PersonalAccessTokens.vue';
import Login from './components/Auth/Login.vue';


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
            path: '/promociones',
            name: 'Promociones',
            component: PromotionListComponent,
        },
        {
            path: '/promociones/:promotionId',
            name: 'promotion',
            component: StudentListComponent,
        },
        {
            path: '/alumnos',
            name: 'Alumnos',
            component: StudentListComponent,
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
        {
            path: '/personaltoken',
            name: 'Personal',
            component: PersonalToken,
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
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