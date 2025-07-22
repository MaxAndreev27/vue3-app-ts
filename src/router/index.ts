import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import MainLayout from '@/layout/MainLayout.vue';
import AuthLayout from '@/layout/AuthLayout.vue';
import store from '@/store';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        meta: {
            layout: MainLayout,
            auth: true,
        },
    },
    {
        path: '/help',
        name: 'help',
        component: () => import('../views/HelpView.vue'),
        meta: {
            layout: MainLayout,
            auth: true,
        },
    },
    {
        path: '/auth',
        name: 'auth',
        component: () => import('../views/AuthView.vue'),
        meta: {
            layout: AuthLayout,
            auth: false,
        },
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.meta.auth;
    if (requiresAuth && store.getters['auth/isAuthenticated']) {
        next();
    } else if (requiresAuth && !store.getters['auth/isAuthenticated']) {
        next('/auth?message=auth');
    } else {
        next();
    }
});

export default router;
