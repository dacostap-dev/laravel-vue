import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router';

import auth from './modules/auth'
import promotions from './modules/promotions'
import students from './modules/students'
import modules from './modules/modules'
import payment from './modules/payment'

axios.defaults.baseURL = 'http://206.189.182.80';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token'); //aqui y en auth/login porque sino no da :/
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    modulSelected: null,
    modelEdit: { id: "", nombre: "", descripcion: "" },
    message: { title: "", text: "", color: "success" },
    sidebarShow: 'responsive',
    sidebarMinimize: false,
  },
  mutations: {
    //Para el nav
    toggleSidebarDesktop(state) {
      const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
      state.sidebarShow = sidebarOpened ? false : 'responsive'
    },
    toggleSidebarMobile(state) {
      const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
      state.sidebarShow = sidebarClosed ? true : 'responsive'
    },
    set(state, [variable, value]) {
      state[variable] = value
    },
    ModelEdit(state, model) {
      state.modelEdit = model
    },
    ModulSelected(state, modul) {
      state.modulSelected = modul
    },
    SetMessage(state, message) {
      state.message.title = message.title
      state.message.text = message.text
      state.message.color = message.color
    },
    CLEAR_DATA(state){
      console.log('limpiandooo')
      state.promotions.promotions = [];
      state.students.students = [];
    }
  },
  actions: {

  },
  getters: {

  },
  modules: {
    auth,
    promotions,
    students,
    modules,
    payment
  }
})
