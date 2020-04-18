export default {
    namespaced: true,
    state: {
        promotions: []
    },
    mutations: {
        PromotionsList(state, promotions){
            state.promotions = promotions
        },
        PromotionUpdate(state, promotion) {
            const index = state.promotions.findIndex(n => n.id == promotion.id);
            state.promotions[index].name = promotion.name;
        },
    },
    actions: {
        async getPromotions(context) {
            try {
                const res = await axios.get("/promotions")
                context.commit('PromotionsList', res.data)
                console.log(res.data)
            }
            catch (e) {
                console.log(e.response)
            }
        },
        async updatePromotion(context, params) {
            console.log(params)
            try {
                const res = await axios.put('/promotions/' + params.id, params)
                context.commit('PromotionUpdate', res.data)
            }
            catch (e) {
                console.log(e.response)
            }
        },
    }
}