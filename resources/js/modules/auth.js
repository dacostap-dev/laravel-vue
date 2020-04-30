export default {
    namespaced: true,
    state: {
        token: localStorage.getItem('access_token') || null,
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token;
        },
        DESTROY_TOKEN(state) {
            state.token = null;
        }
    },
    actions: {
        async register(context, params) {
            try {
                const res = await axios.post("/api/register", params)
            }
            catch (e) {
                throw e.response; //dispará exepcion para el catch del metodo
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