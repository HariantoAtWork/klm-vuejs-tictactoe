import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Initial state
const state = {
	activePage: 'home',
    r1c1: '',
    r1c2: '',
    r1c3: '',

    r2c1: '',
    r2c2: '',
    r2c3: '',

    r3c1: '',
    r3c2: '',
    r3c3: ''
}

// Actions
const actions = {
    SET_ACTIVEPAGE: ({ commit }, text) => {
        commit('SET_ACTIVEPAGE', text)
    },

// row 1 col 1
    SET_R1C1: ({ commit }, value) => {
        commit('SET_R1C1', value)
    },
    SET_R1C2: ({ commit }, value) => {
        commit('SET_R1C2', value)
    },
    SET_R1C3: ({ commit }, value) => {
        commit('SET_R1C3', value)
    },

// row 2 col 1

    SET_R2C1: ({ commit }, value) => {
        commit('SET_R2C1', value)
    },
    SET_R2C2: ({ commit }, value) => {
        commit('SET_R2C2', value)
    },
    SET_R2C3: ({ commit }, value) => {
        commit('SET_R2C3', value)
    },

// row 3 col 1

    SET_R3C1: ({ commit }, value) => {
        commit('SET_R3C1', value)
    },
    SET_R3C2: ({ commit }, value) => {
        commit('SET_R3C2', value)
    },
    SET_R3C3: ({ commit }, value) => {
        commit('SET_R3C3', value)
    },

}

// Mutations
const mutations = {
    SET_ACTIVEPAGE: (state, text) => {
        state.activePage = text
    },

    // row 1
    SET_R1C1: (state, value) => {
        state.r1c1 = value
    },
    SET_R1C2: (state, value) => {
        state.r1c2 = value
    },
    SET_R1C3: (state, value) => {
        state.r1c3 = value
    },
    // row 2
    SET_R2C1: (state, value) => {
        state.r2c1 = value
    },
    SET_R2C2: (state, value) => {
        state.r2c2 = value
    },
    SET_R2C3: (state, value) => {
        state.r2c3 = value
    },
    // row 3
    SET_R3C1: (state, value) => {
        state.r3c1 = value
    },
    SET_R3C2: (state, value) => {
        state.r3c2 = value
    },
    SET_R3C3: (state, value) => {
        state.r3c3 = value
    },
    // SET_OVERLAY: (state, bool) => {
    //     state.showOverlay = bool
    // },
}

const store = new Vuex.Store({
    state,
    mutations,
    actions
})

export default store