import { Commit, Dispatch } from 'vuex';
import axios from '../../axios/request';
import { RootGetters } from '@/store';

export enum TaskStatus {
    DONE = 'done',
    CANCELLED = 'cancelled',
    ACTIVE = 'active',
    PENDING = 'pending',
}

export interface IRequest {
    id?: string;
    fio?: string;
    phone?: string;
    amount?: number;
    status?: TaskStatus;
}

interface RequestState {
    requests: Array<IRequest>;
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
        setRequests(state: RequestState, requests: Array<IRequest>) {
            state.requests = requests;
        },
        addRequest(state: RequestState, request: IRequest) {
            state.requests.push(request);
        },
    },
    actions: {
        async create(
            {
                commit,
                dispatch,
                rootGetters,
            }: { dispatch: Dispatch; commit: Commit; rootGetters: RootGetters },
            payload: IRequest,
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
                await dispatch(
                    'setMessage',
                    {
                        value: 'Заявка створена',
                        type: 'primary',
                    },
                    { root: true },
                );
            } catch (e) {
                await dispatch(
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
            rootGetters: RootGetters;
        }) {
            try {
                const token = rootGetters['auth/getToken'];
                const { data } = await axios.get(`/requests.json?auth=${token}`);
                const requests = Object.keys(data).map((id) => ({ ...data[id], id }));
                commit('setRequests', requests);
            } catch (e) {
                await dispatch(
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
            {
                dispatch,
                rootGetters,
            }: { dispatch: Dispatch; commit: Commit; rootGetters: RootGetters },
            id: string,
        ) {
            try {
                const token = rootGetters['auth/getToken'];
                const { data } = await axios.get(`/requests/${id}.json?auth=${token}`);
                return data;
            } catch (e) {
                await dispatch(
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
            {
                dispatch,
                rootGetters,
            }: { dispatch: Dispatch; commit: Commit; rootGetters: RootGetters },
            id: string,
        ) {
            try {
                const token = rootGetters['auth/getToken'];
                await axios.delete(`/requests/${id}.json?auth=${token}`);
                await dispatch(
                    'setMessage',
                    {
                        value: 'Заявка видалена',
                        type: 'primary',
                    },
                    { root: true },
                );
            } catch (e) {
                await dispatch(
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
            {
                dispatch,
                rootGetters,
            }: { dispatch: Dispatch; commit: Commit; rootGetters: RootGetters },
            request: IRequest,
        ) {
            try {
                const token = rootGetters['auth/getToken'];
                await axios.put(`/requests/${request.id}.json?auth=${token}`, request);
                await dispatch(
                    'setMessage',
                    {
                        value: 'Заявка оновлена',
                        type: 'primary',
                    },
                    { root: true },
                );
            } catch (e) {
                await dispatch(
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
