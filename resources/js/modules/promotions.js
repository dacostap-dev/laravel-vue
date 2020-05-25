export default {
    namespaced: true,
    state: {
        promotions: [],
        search: '',
        currentPage: 1,
        perPage: 10,
        totalItems: 0
    },
    mutations: {
        PromotionsList(state, promotions){
            state.promotions = promotions
        },
        PromotionStore(state, promotion) {
            state.promotions.push(promotion);
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
        SetSearch(state, search) {
            state.search = search
        },
    },
    actions: {
        async getPromotions(context) {
            try {
                const res = await axios.get("/promotions?name=" +context.state.search+ "&page="+ context.state.currentPage+ "&per_page="+context.state.perPage)
                context.commit('PromotionsList', res.data.data)
                context.commit('SetTotalItems', res.data.total)
            }
            catch (e) {
                console.log(e.response)
            }
        },
        async storePromotion(context, params) {
            try {
                const res = await axios.post('/promotions', params)
                context.commit('PromotionStore', res.data)
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