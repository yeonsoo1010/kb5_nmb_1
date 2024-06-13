import { createRouter, createWebHistory } from "vue-router";

import Home from "@/pages/Home.vue";

import AddItem from "@/pages/AddItem.vue";
import PlusItem from "@/pages/PlusItem.vue";
import EditItem from "@/pages/EditItem.vue";
import Profile from "@/pages/Profile.vue";
import Chart from "@/pages/Chart.vue";
import Trashcan from "@/pages/Trashcan.vue";
import Summary from "@/components/summary.vue";
import HomeItem from "@/pages/HomeItem.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/home/add", component: AddItem },
    { path: "/home/plus", component: PlusItem },
    { path: "/home/edit/:id", component: EditItem },
    { path: "/profile", component: Profile },
    { path: "/Chart", component: Chart },
    { path: "/home/edit/editlist", component: Trashcan },
    { path: "/summary", component: Summary },
    { path: "/HomeItem", component: HomeItem },
  ],
});

export default router;
