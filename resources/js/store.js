import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    notes: [],
    noteSelected: "",
    message: { color: "success", text: "" },
    dismissSecs: 5,
    dismissCountDown: 0,
    editar: false,
    modelEdit: {id: "", nombre: "", descripcion: ""},
  },