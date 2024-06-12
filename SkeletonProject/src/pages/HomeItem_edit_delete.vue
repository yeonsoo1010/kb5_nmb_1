<template>
    <li class="list-group-item">
        {{ moneyItem.name }} - {{ moneyItem.price }}원
        <span class="float-end badge bg-secondary pointer m-1" @click="router.push(`/home/edit/${moneyItem.id}`)"> 편집</span>
        <span class="float-end badge bg-secondary pointer m-1" @click="deleteMoneyItem(moneyItem.id)"> 삭제</span>
    </li>
</template>

<script setup>
import { useRouter } from "vue-router";
import { use_money_list_store } from "@/stores/ItemList.js";

defineProps({
    moneyItem: { type: Object, required: true },
});

const router = useRouter();
const money_list_store = use_money_list_store();

const { delete_money } = money_list_store;

const deleteMoneyItem = (id) => {
    delete_money(id);
};
</script>
