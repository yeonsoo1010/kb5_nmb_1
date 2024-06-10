<template>
  <div class="container">
    <Header />
    <router-view />
  </div>
</template>

<script setup>
// import { computed } from "vue";
import Header from "@/components/Header.vue";
// import { useTodoListStore } from "@/stores/ItemList.js";

// const todoListStore = useTodoListStore();

// const fetchTodoList = todoListStore.fetchTodoList;
// fetchTodoList();
</script>
