import { Commit } from 'vuex';
import axios from 'axios';

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
            const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FIREBASE_API_KEY}`;
            try {
                const data = await axios.post(url, {
                    email: payload.email,
                    password: payload.password,
                });
                // commit('setToken', 'TEST_TOKEN');
                console.log(data);
            } catch (e) {
                console.log('Error:' + e);
            }
        },
    },
};
