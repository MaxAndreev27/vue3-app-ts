import { createStore, createLogger, Commit } from 'vuex';
import authModule from './modules/auth.module';

const plugins = [];

if (process.env.NODE_ENV === 'development') {
    plugins.push(createLogger());
}

interface GlobalState {
    message: string | null;
}

export default createStore({
    plugins,
    state: {
        message: null,
    },
    getters: {},
    mutations: {
        setMessage(state: GlobalState, payload) {
            state.message = payload;
        },
        clearMessage(state: GlobalState) {
            state.message = null;
        },
    },
    actions: {
        setMessage({ commit }: { commit: Commit }, payload) {
            commit('setMessage', payload);
            // setTimeout(() => {
            //     commit('clearMessage');
            // }, 5000);
        },
    },
    modules: {
        auth: authModule,
    },
});
