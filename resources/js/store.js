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
        modelEdit: { id: "", nombre: "", descripcion: "" },
    },
    mutations: {
        NotesList(state, notes) {
            state.notes = notes
        }
    },
    actions: {
        async getNotes(context) {
            try {
              const res = await axios.get("/notas")
              context.commit('NotesList', res.data)
              console.log(res.data)
            }
            catch (e) {
              console.log(e.response)
            }
          },
    }
})
