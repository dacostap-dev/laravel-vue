export default {
    namespaced: true,
    state: {
        promotions: [],
        currentPage: 1,
        perPage: 10,
        totalItems: 0
    },
    mutations: {
        PromotionsList(state, promotions){
            state.promotions = promotions
        },
        PromotionUpdate(state, promotion) {
            const index = state.promotions.findIndex(n => n.id == promotion.id);
            state.promotions[index].name = promotion.name;
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
        async getPromotions(context) {
            try {
                const res = await axios.get("/promotions?page="+ context.state.currentPage+ "&per_page="+context.state.perPage)
                context.commit('PromotionsList', res.data.data)
                context.commit('SetTotalItems', res.data.total)
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