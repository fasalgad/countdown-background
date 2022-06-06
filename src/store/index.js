import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        timer: 0,
        refTimer: null,
    },
    mutations: {
        start_timer(state) {
            state.refTimer = setInterval(() => {
                state.timer = state.timer - 1
            }, 1000)
        },
        clear_timer(state) {
            clearInterval(state.refTimer)
        },
        set_timer(state, timer) {
            state.timer = timer
        }
    },
    actions: {
        initiate_timer({
            commit
        }) {
            commit('start_timer')
        },

        clear_timer({
            commit
        }) {
            commit('clear_timer')
        },
    },
    modules: {}
})