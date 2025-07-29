import { createStore, createLogger, Commit } from 'vuex';
import authModule from './modules/auth.module';
import requestModule from './modules/request.module';

const plugins = [];

if (process.env.NODE_ENV === 'development') {
    plugins.push(createLogger());
}

interface GlobalState {
    message: string | null;
    sidebar: boolean;
}

export default createStore({
    plugins,
    modules: {
        auth: authModule,
        request: requestModule,
    },
    state: {
        message: null,
        sidebar: false,
    },
    getters: {},
    mutations: {
        setMessage(state: GlobalState, payload) {
            state.message = payload;
        },
        clearMessage(state: GlobalState) {
            state.message = null;
        },
        openSidebar(state) {
            state.sidebar = true;
        },
        closeSidebar(state) {
            state.sidebar = false;
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
});
