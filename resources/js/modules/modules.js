export default {
  namespaced: true,
  state: {
    moduls: [],
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
    ModulsList(state, moduls) {
      state.moduls = moduls
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
    }
  },
  actions: {
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
    }
  },
  getters: {
    getGraphic: (state) => (id) => {
      return state.datasets.find(todo => todo.modul === id)
    }
  }
}