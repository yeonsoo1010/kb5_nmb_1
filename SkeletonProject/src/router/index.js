import { createRouter, createWebHistory } from "vue-router";

import Home from "@/pages/Home.vue";
import Graph from "@/pages/Graph.vue";
import Percent from "@/pages/Percent.vue";
import AddItem from "@/pages/AddItem.vue";
import EditItem from "@/pages/EditItem.vue";
// import NotFound from "@/pages/NotFound.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/graph", component: Graph },
    { path: "/percent", component: Percent },
    { path: "/additem", component: AddItem },
    { path: "/edititem/:id", component: EditItem },
    // { path: "/:paths(.*)*", component: NotFound },
  ],
});

export default router;
