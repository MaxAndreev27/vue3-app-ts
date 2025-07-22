import { Commit } from 'vuex';

const TOKEN_KEY = 'jwt-token';

interface AuthState {
    token: boolean | string;
}

interface IPayload {
    email: string;
    password: string;
}

export default {
    namespaced: true,
    state: {
        token: localStorage.getItem(TOKEN_KEY) || null,
    },
    getters: {
        token(state: AuthState) {
            return state.token;
        },
        isAuthenticated(state: AuthState) {
            return !!state.token;
        },
    },
    mutations: {
        setToken(state: AuthState, token: string) {
            state.token = token;
            localStorage.setItem(TOKEN_KEY, token);
        },
        logout(state: AuthState) {
            state.token = false;
            localStorage.removeItem(TOKEN_KEY);
        },
    },
    actions: {
        async login({ commit }: { commit: Commit }, payload: IPayload) {
            commit('setToken', 'TEST_TOKEN');
        },
    },
};
