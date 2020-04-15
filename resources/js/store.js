import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router';

import students from './modules/students'

axios.defaults.baseURL = 'http://127.0.0.1:8000';

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    notes: [],
    moduls: [],
    modulSelected: null,
    modelEdit: { id: "", nombre: "", descripcion: "" },
    message: { title: "", text: "", color: "success" },
    dismissSecs: 5,
    dismissCountDown: 0,
    sidebarShow: 'responsive',
    sidebarMinimize: false,
    datasets: []
  },
  mutations: {
    SetDraw(state, modul) {
      state.datasets.push({
        modul: modul.id,
        data: [
          modul.items_complete, modul.total_items - modul.items_complete
        ],
        backgroundColor: ["#185190", "#f36e60"],
        hoverBackgroundColor: ["#d1e3f7", "#fbd2cd"]
      })
    },
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
    ModulsList(state, moduls) {
      state.moduls = moduls
    },
    ModulSelected(state, modul) {
      state.modulSelected = modul
    },
    ModulStore(state, modul) {
      state.moduls.push(modul);
    },
    ModulUpdate(state, modul) {
      const index = state.moduls.findIndex(m => m.id == modul.id);
      state.moduls[index].name = modul.name;
      state.moduls[index].solicitud = modul.solicitud;
      state.moduls[index].memorandum = modul.memorandum;
      state.moduls[index].informe = modul.informe;
      state.moduls[index].items_complete = modul.items_complete;
      state.moduls[index].total_items = modul.total_items;
    },
    GraphicUpdate(state, modul) {
      const index = state.datasets.findIndex(d => d.modul == modul.id);
      state.datasets[index].data = [modul.items_complete, modul.total_items - modul.items_complete]
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
    },

    async getModulsByStudent(context, student) {
      try {
        const res = await axios.get("/students/" + student + "/moduls")
        context.commit('ModulsList', res.data)
      }
      catch (e) {
        console.log(e.response)
      }
    },
    async storeModul(context, params) {
      try {
        const res = await axios.post('/students/' + params.student_id + '/moduls', params.modul)
        console.log(res)
        context.commit('ModulStore', res.data)
      }
      catch (e) {
        console.log(e)
      }
    },
    async updateModul(context, params) {
      try {
        const res = await axios.put('/moduls/' + params.id, params)
        context.commit('ModulUpdate', res.data)
        context.commit('GraphicUpdate', res.data)
      }
      catch (e) {
        console.log(e.response)
      }
    },
  },
  getters: {
    getGraphic: (state) => (id) => {
      return state.datasets.find(todo => todo.modul === id)
    }
  },
  modules: {
    students
  }
})
