<template>
  <div class="container">
    <Header> </Header>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import Header from '@/components/Header.vue';
import { use_money_list_store } from '@/stores/ItemList.js';

const money_list_store = use_money_list_store();
const fetch_money_list = money_list_store.fetch_money_list;

fetch_money_list();
</script>
