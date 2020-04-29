export default {
    namespaced: true,
    state: {
        token: localStorage.getItem('access_token') || null,
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token;
        }
    },
    actions: {
        async login(context, params) {
            try {
                const res = await axios.post("/oauth/token", params)
                localStorage.setItem('access_token', res.data.access_token)
                context.commit('SET_TOKEN', res.data.access_token)
                console.log(res);
            }
            catch (e) {
                console.log(e.response)
            }
        },
    },
    getters:{
        IsLoggedIn(){
            return state.token != null
        }
    }
}