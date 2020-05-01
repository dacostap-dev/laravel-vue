export default {
    namespaced: true,
    state: {
        token: localStorage.getItem('access_token') || null,
        error: '',
        server_errors: []
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token;
        },
        DESTROY_TOKEN(state) {
            state.token = null;
        },
        SET_ERROR(state, error) {
            state.error = error;
        },
        SET_SERVER_ERRORS(state, server_errors) {
            state.server_errors = server_errors;
        }
    },
    actions: {
        async register(context, params) {
            try {
                const res = await axios.post("/api/register", params)
            }
            catch (e) {
                context.commit('SET_SERVER_ERRORS', Object.values(e.response.data.errors))
                throw e.response.data.errors; //dispará exepcion para el catch del metodo
            }
        },
        async login(context, params) {
            try {
                const res = await axios.post("/api/login", params)
                localStorage.setItem('access_token', res.data.access_token)
                context.commit('SET_TOKEN', res.data.access_token)
                console.log(res);
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token;
            }
            catch (e) {
                context.commit('SET_ERROR', e.response.data.data)
                throw e.response; //dispará exepcion para el catch del metodo
            }
        },
        async logout(context, params) {
            try {
                const res = await axios.post("/api/logout")
                localStorage.removeItem('access_token')
                context.commit('DESTROY_TOKEN')
                console.log(res);
            }
            catch (e) {
                localStorage.removeItem('access_token')
                context.commit('DESTROY_TOKEN')
                throw e.response; //dispará exepcion para el catch del metodo
            }
        },
    },
    getters:{
        IsLoggedIn(state){
            return state.token != null
        }
    }
}