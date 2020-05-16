export default{
    namespaced: true,
    state: {
        currencies: [],
        platforms: [],
        stripe_token: null
    },
    mutations: {
        SET_CURRENCIES(state, currencies){
            state.currencies = currencies
        },
        SET_PLATFORMS(state, platforms){
            state.platforms = platforms
        },
        STRIPE_TOKEN(state, stripe_token){
            state.stripe_token = stripe_token
        }
    },
    actions: {
        async getPlatforms(context) {
            try {
                const res = await axios.get("/payment-platforms/")
                context.commit('SET_PLATFORMS', res.data)
                console.log(res)
            }
            catch (e) {
                throw e;
            }
        },
        async getCurrencies(context) {
            try {
                const res = await axios.get("/currencies/")
                context.commit('SET_CURRENCIES', res.data)
                console.log(res)
            }
            catch (e) {
                throw e;
            }
        },
        async pay(context, params) {
            try {
                const res = await axios.post("/payments/pay", params)
                window.location = res.data
            }
            catch (e) {
                throw e;
            }
        },
    }
}