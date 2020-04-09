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
        noteSelected: "",
        message: { color: "success", text: "" },
        dismissSecs: 5,
        dismissCountDown: 0,
        editar: false,
        modelEdit: { id: "", nombre: "", descripcion: "" },
        sidebarShow: 'responsive',
        sidebarMinimize: false
    },
    mutations: {
      toggleSidebarDesktop (state) {
        const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
        state.sidebarShow = sidebarOpened ? false : 'responsive'
      },
      toggleSidebarMobile (state) {
        const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
        state.sidebarShow = sidebarClosed ? true : 'responsive'
      },
      set (state, [variable, value]) {
        state[variable] = value
      },
      NotesList(state, notes){
        state.notes = notes
      },
      ModelEdit(state, model){
        state.modelEdit = model
      },
      NoteStore(state, note){
        state.notes.push(note)
      },
      NoteUpdate(state, note){
        const index = state.notes.findIndex(n => n.id == note.id);
        state.notes[index].nombre = note.nombre;
        state.notes[index].descripcion = note.descripcion;
      },
      NoteDelete(state, note){
        const index = state.notes.findIndex(item => item.id === note.id); //obtenemos el index del elemento que coincide con el que eliminamos
        state.notes.splice(index, 1);
      },
      StudentsList(state, students){
        state.students = students
      },
      StudentUpdate(state, student){
        const index = state.students.findIndex(n => n.id == student.id);
        state.students[index].name = student.name;
        state.students[index].email = student.email;
      /*   state.students[index].porcentaje = 80; */
      },
      SetMessage(state, message){
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
      async updateNote(context, params){
        console.log(params)
        try {
          const res = await axios.put('/notas/' + params.id, params)
          context.commit('NoteUpdate', res.data)
        }
        catch (e) {
          console.log(e.response)
        }
      },
      async deleteNotes(context, params){
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
      async updateStudent(context, params){
        console.log(params)
        try {
          const res = await axios.put('/students/' + params.id, params)
          context.commit('StudentUpdate', res.data)
        }
        catch (e) {
          console.log(e.response)
        }
      },
    },
    modules: {
    }
  })
