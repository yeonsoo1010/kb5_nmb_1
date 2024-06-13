import { createRouter, createWebHistory } from "vue-router";

import Home from "@/pages/Home.vue";

import AddItem from "@/pages/AddItem.vue";
import EditItem from "@/pages/EditItem.vue";
import Profile from "@/pages/Profile.vue";
import Chart from "@/pages/Chart.vue";
import Trashcan from "@/pages/Trashcan.vue";
import Summary from "@/components/summary.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: Home },
        { path: "/home/add", component: AddItem },
        { path: "/home/edit/:id", component: EditItem },
        { path: "/profile", component: Profile },
        { path: "/Chart", component: Chart },
        { path: "/home/edit/editlist", component: Trashcan },
        { path: "/summary", component: Summary },
    ],
});

export default router;
