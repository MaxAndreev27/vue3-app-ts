import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import MainLayout from '@/layout/MainLayout.vue';
import AuthLayout from '@/layout/AuthLayout.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        meta: {
            layout: MainLayout,
        },
    },
    {
        path: '/help',
        name: 'help',
        component: () => import('../views/HelpView.vue'),
        meta: {
            layout: MainLayout,
        },
    },
    {
        path: '/auth',
        name: 'auth',
        component: () => import('../views/AuthView.vue'),
        meta: {
            layout: AuthLayout,
        },
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
