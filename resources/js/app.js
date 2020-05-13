/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import store from './store'
import router from './router'

import axios from 'axios'

import BootstrapVue from 'bootstrap-vue' //Importing

import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from '../icons/icons.js'
import { IconsPlugin } from 'bootstrap-vue'
import VeeValidate, { Validator } from 'vee-validate';
import es from 'vee-validate/dist/locale/es'

import "chart.js";
import "hchs-vue-charts";


Vue.use(VeeValidate, {
  // This is the default
  inject: true,
  // Important to name this something other than 'fields'
  fieldsBagName: 'veeFields',
  // This is not required but avoids possible naming conflicts
  errorBagName: 'veeErrors'
})

Validator.localize("es", es); //En español, va despues de usar VeeValidate

Vue.use(IconsPlugin)
Vue.use(CoreuiVue) // Telling Vue to use this in whole application
Vue.use(BootstrapVue)
Vue.use(VeeValidate);
Vue.use(window.VueCharts);

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('MessageComponent', require('./components/MessageComponent.vue').default);
Vue.component('PaginateComponent', require('./components/PaginateComponent.vue').default);
Vue.component('SearchComponent', require('./components/SearchComponent.vue').default);


Vue.component(
  'passport-clients',
  require('./components/passport/Clients.vue').default
);

Vue.component(
  'passport-authorized-clients',
  require('./components/passport/AuthorizedClients.vue').default
);

Vue.component(
  'passport-personal-access-tokens',
  require('./components/passport/PersonalAccessTokens.vue').default
);

Vue.component(
  'payment-processor',
  require('./components/PaymentProcessor/PaymentProcessor.vue').default
);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('container', require('./containers/TheContainer.vue').default);

const app = new Vue({
    el: '#app',
    store,
    router,
    icons,
});


router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      if(window.location.href.indexOf("apiview") > -1){ //Para que no haga conficto con la web
        if (!store.getters['auth/IsLoggedIn']) { //verifica si no está logeado
          next({
            name: 'login',
          })
        } else {
          next()
        }
    }  
   
    } else if (to.matched.some(record => record.meta.requiresVisitor)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (store.getters['auth/IsLoggedIn']) { //verifica si está logeado
          next({
            name: 'Promociones',
          })
        } else {
          next()
        }
    }
     else {
      next() // make sure to always call next()!
    }
  })
