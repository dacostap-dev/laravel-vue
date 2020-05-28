import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router';

import auth from './modules/auth'
import promotions from './modules/promotions'
import students from './modules/students'
import modules from './modules/modules'
import payment from './modules/payment'

axios.defaults.baseURL = 'http://viru.test';
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
    async getPdf(context, params) {
      try {
          const res = await axios.get("/pdf", {
            params,
            responseType: 'blob', // importantx
          }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'file.pdf');
            document.body.appendChild(link);
            link.click();
          });
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
    modules,
    payment
  }
})
