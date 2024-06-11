<template>
  <li
    :class="
      moneyItem.done
        ? 'list-group-item list-group-item-success'
        : 'list-group-item'
    "
  >
    <span
      class="float-end badge bg-secondary pointer m-1"
      @click="router.push(`/items/edit/:id/${moneyItem.id}`)"
    >
      편집</span
    >
    <span
      class="float-end badge bg-secondary pointer m-1"
      @click="deleteMoneyItem(moneyItem.id)"
    >
      삭제</span
    >
  </li>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { use_money_list_store } from '@/stores/ItemList.js';

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
