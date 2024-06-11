<template>
    <li :class="money.done ? 'list-group-item list-group-item-success' : 'list-group-item'">
        <span class="float-end badge bg-secondary pointer m-1" @click="router.push(`/edititem/${money.id}`)"> 편집</span>
        <span class="float-end badge bg-secondary pointer m-1" @click="delete_money(money.id)"> 삭제</span>
    </li>
</template>

<script setup>
import { useRouter } from "vue-router";
import { use_money_list_store } from "@/stores/ItemList.js";

defineProps({
    money: { Type: Object, required: true },
});

const router = useRouter();
const money_list_store = use_money_list_store();
const { delete_money } = money_list_store;
</script>
