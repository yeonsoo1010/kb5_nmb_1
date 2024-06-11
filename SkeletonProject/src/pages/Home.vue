<template>
  <div class="row">
    <div class="col p-3">
      <router-link class="btn btn-primary" to="/home/add">
        내역 추가
      </router-link>
      <button class="btn btn-primary ms-1" @click="fetch_money_list">
        목록 보기
      </button>
    </div>
  </div>

  <div class="row">
    <div class="col">
      <ul class="list-group">
        <moneyItem
          v-for="moneyItem in money_list"
          :key="moneyItem.id"
          :moneyItem="moneyItem"
        />
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { use_money_list_store } from '@/stores/ItemList.js';
import money from '@/pages/HomeItem.vue';

const money_list_store = use_money_list_store();
const { fetch_money_list } = money_list_store;
const money_list = computed(() => money_list_store.money_list);
</script>
