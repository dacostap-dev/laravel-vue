export default {
    namespaced: true,
    state: {
        students: [],
        currentPage: 1,
        perPage: 10,
        totalItems: 0
    },
    mutations: {
        StudentsList(state, students) {
            state.students = students
        },
        StudentUpdate(state, student) {
            const index = state.students.findIndex(n => n.id == student.id);
            state.students[index].name = student.name;
            state.students[index].email = student.email;
            /*   state.students[index].porcentaje = 80; */
        },
        StudentDelete(state, student) {
            const index = state.students.findIndex(item => item.id === student.id); //obtenemos el index del elemento que coincide con el que eliminamos
            state.students.splice(index, 1);
        },
        SetCurrentPage(state, currentPage) {
            state.currentPage = currentPage
        },
        SetPerPage(state, perPage) {
            state.perPage = perPage
        },
        SetTotalItems(state, totalItems) {
            state.totalItems = totalItems
        },
    },
    actions: {
        async getStudents(context) {
            try {
                const res = await axios.get("/students?page="+ context.state.currentPage+ "&per_page="+context.state.perPage)
                context.commit('StudentsList', res.data.data)
                context.commit('SetTotalItems', res.data.total)
            }
            catch (e) {
                console.log(e.response)
            }
        },
        async getStudentsByPromotion(context, promotion) {
            try {
              const res = await axios.get("/promotions/" + promotion + "/students?page="+ context.state.currentPage+ "&per_page="+context.state.perPage)
              context.commit('StudentsList', res.data.data)
              context.commit('SetTotalItems', res.data.total)
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
        async deleteStudent(context, params) {
            try {
                const res = await axios
                    .delete("/students/" + params.id)
                context.commit('StudentDelete', res.data)
            }
            catch (e) {
                console.log(e.response)
            }
        },
    },
    getters: {

    }
}