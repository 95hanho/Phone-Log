import Vue from 'vue'
import Vuex from 'vuex'

import { login } from './module/login'

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        login
    },
    plugins: [

    ]
})
