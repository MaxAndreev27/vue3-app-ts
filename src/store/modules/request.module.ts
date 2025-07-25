import { Commit, Dispatch } from 'vuex';
import axios from '../../axios/request';
import store from '@/store';

interface RequestState {
    requests: Array<any>;
}

export enum TaskStatus {
    DONE = 'done',
    CANCELLED = 'cancelled',
    ACTIVE = 'active',
    PENDING = 'pending',
}

interface IPayload {
    fio: string;
    phone: string;
    amount: number;
    status: TaskStatus;
}

export default {
    namespaced: true,
    state: {
        requests: [],
    },
    getters: {
        requests(state: RequestState) {
            return state.requests;
        },
    },
    mutations: {
        setRequests(state: RequestState, requests: Array<any>) {
            state.requests = requests;
        },
        addRequest(state: RequestState, request: Array<any>) {
            state.requests.push(request);
        },
    },
    actions: {
        async create(
            { commit, dispatch }: { commit: Commit; dispatch: Dispatch },
            payload: IPayload,
        ) {
            try {
                // console.log(payload);
                // const token = store.getters['auth/token'];
                const token = localStorage.getItem('jwt-token') || null;
                // console.log('token', token);
                const { data } = await axios.post(`/requests.json?auth=${token}`, {
                    fio: payload.fio,
                    phone: payload.phone,
                    amount: payload.amount,
                    status: payload.status,
                });
                console.log(data);
                commit('addRequest', { ...payload, id: data.name });
                dispatch(
                    'setMessage',
                    {
                        value: 'Заявка створена',
                        type: 'primary',
                    },
                    { root: true },
                );
            } catch (e) {
                dispatch(
                    'setMessage',
                    {
                        value: 'Заявка не створена',
                        type: 'danger',
                    },
                    { root: true },
                );
            }
        },
    },
};
