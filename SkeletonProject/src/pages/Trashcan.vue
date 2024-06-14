<template>
  <div class="row justify-content-center">
    <div class="col-7 list-container">
      <ul class="list-group">
        <HomeItem_edit_delete
          v-for="moneyItem in money_list"
          :key="moneyItem.id"
          :moneyItem="moneyItem"
        />
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { use_money_list_store } from "@/stores/ItemList.js";
import HomeItem_edit_delete from "@/pages/HomeItem_edit_delete.vue";

const money_list_store = use_money_list_store();
const { fetch_money_list } = money_list_store;
const money_list = computed(() => money_list_store.money_list);

onMounted(fetch_money_list);
</script>

<style scoped>
.list-container {
  max-height: 750px;
  overflow-y: auto;
}

.list-group {
  margin-right: -12px;
}

.list-container::-webkit-scrollbar {
  width: 12px;
}

.list-container::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.list-container::-webkit-scrollbar-thumb {
  background: #888;
}

.list-container::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
