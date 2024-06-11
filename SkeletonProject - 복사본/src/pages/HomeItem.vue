<template>
    <div></div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useTodoListStore } from "@/stores/index.js";

defineProps({
    todoItem: { Type: Object, required: true },
});

const router = useRouter();
const money_list_store = use_money_list_store();
const { deleteTodo, toggleDone } = todoListStore;
</script>
