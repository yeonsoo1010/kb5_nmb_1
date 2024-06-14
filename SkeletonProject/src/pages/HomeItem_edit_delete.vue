<template>
  <div>
    <br />

    <div class="div_inout" id="income">
      <ul class="item-container">
        <li>
          <span class="text-line">{{ moneyItem.name }}</span>
          <br />
          <div class="item-content">
            <span class="text-line right-aligned">{{ moneyItem.price }}원</span>
            <span
              class="float-end badge bg-secondary pointer m-1"
              @click="router.push(`/home/edit/${moneyItem.id}`)"
            >
              편집</span
            >
            <span
              class="float-end badge bg-secondary pointer m-1"
              @click="deleteMoneyItem(moneyItem.id)"
            >
              삭제</span
            >
          </div>
        </li>
      </ul>
    </div>
  </div>
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

<style>
ul {
  list-style-type: none;
}

.item-container li {
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.2);
  max-width: 600px;
  width: 100%;
  box-sizing: border-box;
}
</style>
