import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/pages/Home.vue';
import Graph from '@/pages/Graph.vue';
import AddItem from '@/pages/AddItem.vue';
import EditItem from '@/pages/EditItem.vue';
import Profile from '@/pages/Profile.vue';
// import NotFound from "@/pages/NotFound.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/graph', component: Graph },
    { path: '/home/add', component: AddItem },
    { path: '/home/edit/:id', component: EditItem },
    { path: '/profile', component: Profile },
    // { path: "/:paths(.*)*", component: NotFound },
  ],
});

export default router;
