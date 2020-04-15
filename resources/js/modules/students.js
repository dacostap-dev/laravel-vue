export default {
    namespaced: true,
    state: {
        students: [],
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
    },
    actions: {
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