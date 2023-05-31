import { createRouter, createWebHistory } from "vue-router";
import AppHome from './pages/AppHome.vue';
import AppContact from './pages/AppContact.vue';
import PostList from './pages/PostList.vue';
import SinglePost from './pages/SinglePost.vue';


const router = createRouter(
    {
        history: createWebHistory(),
        routes: [
            {
                path: '/',
                name: 'home',
                component: AppHome
            },

            {
                path: '/contact-us',
                name: 'contact',
                component: AppContact
            },

            {
                path: '/project',
                name: 'projects',
                component: PostList
            },
            {
                path: '/project:slug',
                name: 'single-project',
                component: SinglePost
            },
        ]
    }
);

export { router };