import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router';

axios.defaults.baseURL = 'http://127.0.0.1:8000';

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    notes: [],
    students: [],
    moduls: [],
    modulSelected: null,
    noteSelected: "",
    message: { color: "success", text: "" },
    dismissSecs: 5,
    dismissCountDown: 0,
    editar: false,
    modelEdit: { id: "", nombre: "", descripcion: "" },
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
    NotesList(state, notes) {
      state.notes = notes
    },
    ModelEdit(state, model) {
      state.modelEdit = model
    },
    NoteStore(state, note) {
      state.notes.push(note)
    },
    NoteUpdate(state, note) {
      const index = state.notes.findIndex(n => n.id == note.id);
      state.notes[index].nombre = note.nombre;
      state.notes[index].descripcion = note.descripcion;
    },
    NoteDelete(state, note) {
      const index = state.notes.findIndex(item => item.id === note.id); //obtenemos el index del elemento que coincide con el que eliminamos
      state.notes.splice(index, 1);
    },
    StudentsList(state, students) {
      state.students = students
    },
    StudentUpdate(state, student) {
      const index = state.students.findIndex(n => n.id == student.id);
      state.students[index].name = student.name;
      state.students[index].email = student.email;
      /*   state.students[index].porcentaje = 80; */
    },
    ModulsList(state, moduls) {
      state.moduls = moduls
    },
    ModulSelected(state, modul) {
      state.modulSelected = modul
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
      state.message.text = message.texto
      state.message.color = message.color
      state.dismissCountDown = state.dismissSecs
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
    async postNotes(context, params) {
      try {
        const res = await axios.post("/notas", params)
        context.commit('NoteStore', res.data)
      }
      catch (e) {
        console.log(e.response)
      }
    },
    async updateNote(context, params) {
      console.log(params)
      try {
        const res = await axios.put('/notas/' + params.id, params)
        context.commit('NoteUpdate', res.data)
      }
      catch (e) {
        console.log(e.response)
      }
    },
    async deleteNotes(context, params) {
      try {
        const res = await axios
          .delete("/notas/" + params.id)
        context.commit('NoteDelete', res.data)
      }
      catch (e) {
        console.log(e.response)
      }
    },
    async getStudents(context) {
      try {
        const res = await axios.get("/students")
        context.commit('StudentsList', res.data)
        console.log(res.data)
      }
      catch (e) {
        console.log(e.response)
      }
    },
    async updateStudent(context, params) {
      console.log(params)
      try {
        const res = await axios.put('/students/' + params.id, params)
        context.commit('StudentUpdate', res.data)
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
  }
})
