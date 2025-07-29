import { Commit, Dispatch } from 'vuex';
import axios from '../../axios/request';

interface RequestState {
    requests: Array<any>;
}

export enum TaskStatus {
    DONE = 'done',
    CANCELLED = 'cancelled',
    ACTIVE = 'active',
    PENDING = 'pending',
}

export interface IPayload {
    id?: string;
    fio?: string;
    phone?: string;
    amount?: number;
    status?: TaskStatus;
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
        setRequests(state: RequestState, requests: Array<IPayload>) {
            state.requests = requests;
        },
        addRequest(state: RequestState, request: Array<IPayload>) {
            state.requests.push(request);
        },
    },
    actions: {
        async create(
            {
                commit,
                dispatch,
                rootGetters,
            }: { dispatch: Dispatch; commit: Commit; rootGetters: any },
            payload: IPayload,
        ) {
            try {
                const token = rootGetters['auth/getToken'];
                const { data } = await axios.post(`/requests.json?auth=${token}`, {
                    fio: payload.fio,
                    phone: payload.phone,
                    amount: payload.amount,
                    status: payload.status,
                });
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
        async load({
            commit,
            dispatch,
            rootGetters,
        }: {
            dispatch: Dispatch;
            commit: Commit;
            rootGetters: any;
        }) {
            try {
                const token = rootGetters['auth/getToken'];
                const { data } = await axios.get(`/requests.json?auth=${token}`);
                const requests = Object.keys(data).map((id) => ({ ...data[id], id }));
                commit('setRequests', requests);
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
        async loadOne(
            { dispatch, rootGetters }: { dispatch: Dispatch; commit: Commit; rootGetters: any },
            id: string,
        ) {
            try {
                const token = rootGetters['auth/getToken'];
                const { data } = await axios.get(`/requests/${id}.json?auth=${token}`);
                return data;
            } catch (e) {
                dispatch(
                    'setMessage',
                    {
                        value: e,
                        type: 'danger',
                    },
                    { root: true },
                );
            }
        },
        async remove(
            { dispatch, rootGetters }: { dispatch: Dispatch; commit: Commit; rootGetters: any },
            id: string,
        ) {
            try {
                const token = rootGetters['auth/getToken'];
                await axios.delete(`/requests/${id}.json?auth=${token}`);
                dispatch(
                    'setMessage',
                    {
                        value: 'Заявка видалена',
                        type: 'primary',
                    },
                    { root: true },
                );
            } catch (e) {
                dispatch(
                    'setMessage',
                    {
                        value: e,
                        type: 'danger',
                    },
                    { root: true },
                );
            }
        },
        async update(
            { dispatch, rootGetters }: { dispatch: Dispatch; commit: Commit; rootGetters: any },
            request: IPayload,
        ) {
            try {
                const token = rootGetters['auth/getToken'];
                await axios.put(`/requests/${request.id}.json?auth=${token}`, request);
                dispatch(
                    'setMessage',
                    {
                        value: 'Заявка оновлена',
                        type: 'primary',
                    },
                    { root: true },
                );
            } catch (e) {
                dispatch(
                    'setMessage',
                    {
                        value: e,
                        type: 'danger',
                    },
                    { root: true },
                );
            }
        },
    },
};
