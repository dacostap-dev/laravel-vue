import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
/* 
const TheContainer = () => import('./containers/TheContainer')
const Dashboard = () => import('./views/Dashboard')

const PromotionListComponent = () => import('./components/Promotion/PromotionListComponent')
const StudentListComponent = () => import('./components/StudentListComponent')
const ModulsListComponent = () => import('./components/Modul/ModulsListComponent') */

import TheContainer from './containers/TheContainer';
import Dashboard from './views/Dashboard';
import PromotionListComponent from './components/Promotion/PromotionListComponent';
import StudentListComponent from './components/StudentListComponent';
import ModulsListComponent from './components/Modul/ModulsListComponent';

import PersonalToken from './components/passport/PersonalAccessTokens.vue';
import Login from './components/Auth/Login.vue';
import Logout from './components/Auth/Logout.vue';
import Register from './components/Auth/Register.vue';

function configRoutes() {
    return [
        {
            path: '/',
            name: 'Home',
            component: TheContainer,
            meta: { requiresAuth: true },
            redirect:  to => {
                if(window.location.href.indexOf("apiview") > -1){ //Para que no haga conficto con la web
                    return  '/login';
                }  
            },
            children: [
                {
                  path: 'dashboard',
                  name: 'Dashboard',
                  component: Dashboard,
                  meta: { requiresAuth: true },
                },
                {
                    path: '/promociones',
                    name: 'Promociones',
                    component: PromotionListComponent,
                    meta: { requiresAuth: true }
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
                    path: '/logout',
                    name: 'logout',
                    component: Logout,
                },        
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            props: true,
            meta: { requiresVisitor: true }
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
        },

        { path: '*', redirect: '/' }
 
     
   
/*         {
            path: '/modulos',
            name: 'Modulos',
            component: StudentListComponent,
        }, */
  
     
  
    ]
}

const router = new VueRouter({
    mode: 'hash', // https://router.vuejs.org/api/#mode
    linkActiveClass: 'active',
    scrollBehavior: () => ({ y: 0 }),
    routes: configRoutes()
  })

export default router