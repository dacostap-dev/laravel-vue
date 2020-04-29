import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router';

import auth from './modules/auth'
import promotions from './modules/promotions'
import students from './modules/students'
import modules from './modules/modules'

axios.defaults.baseURL = 'http://appviru.herokuapp.com';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');

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
  },
  actions: {
    async logout(context) {
      try {
        const res = await axios.post("/logout")
        router.go('login')
        console.log(res.data)
      }
      catch (e) {
        console.log(e.response)
      }
    }
  },
  getters: {

  },
  modules: {
    auth,
    promotions,
    students,
    modules
  }
})
