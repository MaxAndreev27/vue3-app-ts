import { Commit, Dispatch } from 'vuex';
import axios from 'axios';
import { ERROR_CODES } from '@/utils/error';

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
        async login(
            { commit, dispatch }: { commit: Commit; dispatch: Dispatch },
            payload: IPayload,
        ) {
            const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FIREBASE_API_KEY}`;
            try {
                const { data } = await axios.post(url, {
                    email: payload.email,
                    password: payload.password,
                    returnSecureToken: true,
                });
                commit('setToken', data.idToken);
                commit('clearMessage', null, { root: true });
            } catch (e) {
                dispatch(
                    'setMessage',
                    {
                        value: ERROR_CODES.INVALID_LOGIN_CREDENTIALS,
                        type: 'danger',
                    },
                    { root: true },
                );
                throw new Error();
            }
        },
    },
};
