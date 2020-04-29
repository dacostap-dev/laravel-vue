/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import store from './store'
import router from './router'

import BootstrapVue from 'bootstrap-vue' //Importing

import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from '../icons/icons.js'
import { IconsPlugin } from 'bootstrap-vue'

import "chart.js";
import "hchs-vue-charts";

Vue.use(IconsPlugin)
Vue.use(CoreuiVue) // Telling Vue to use this in whole application
Vue.use(BootstrapVue)
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
    'passport-personal-access-tokens',
    require('./components/passport/PersonalAccessTokens.vue').default
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
