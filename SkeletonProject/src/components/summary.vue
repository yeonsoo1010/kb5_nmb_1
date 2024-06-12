<template>
  <div class="container">
    <h1></h1>
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{ active: currentTab === 'all' }"
          @click="currentTab = 'all'"
          >전체</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{ active: currentTab === 'monthly' }"
          @click="currentTab = 'monthly'"
          >월별 내역</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{ active: currentTab === 'category' }"
          @click="currentTab = 'category'"
          >카테고리별 내역</a
        >
      </li>
    </ul>
    <div class="tab-content mt-3">
      <div v-if="currentTab === 'all'" class="tab-pane fade show active">
        <ul>
          <li v-for="item in allItems" :key="item.id">
            {{ item.name }}: {{ item.price }}원
          </li>
        </ul>
      </div>
      <div v-if="currentTab === 'monthly'" class="tab-pane fade show active">
        <div v-for="(items, month) in monthlyItems" :key="month">
          <h3>{{ month }}월</h3>
          <ul>
            <li v-for="item in items" :key="item.id">
              {{ item.name }}: {{ item.price }}원
            </li>
          </ul>
        </div>
      </div>
      <div v-if="currentTab === 'category'" class="tab-pane fade show active">
        <div v-for="(items, category) in categoryItems" :key="category">
          <h3>{{ categoryTitle(category) }}</h3>
          <ul>
            <li v-for="item in items" :key="item.id">
              {{ item.name }}: {{ item.price }}원
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { use_money_list_store } from '@/stores/ItemList.js';

const currentTab = ref('all');

const money_list_store = use_money_list_store();
const { fetch_money_list, fetch_categories } = money_list_store;

const allItems = computed(() => money_list_store.money_list);

const monthlyItems = computed(() => {
  return allItems.value.reduce((acc, item) => {
    const month = new Date(item.datetime).getMonth() + 1;
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(item);
    return acc;
  }, {});
});

const categoryItems = computed(() => {
  return allItems.value.reduce((acc, item) => {
    const category = item.category_id;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});
});

const categoryTitle = (categoryId) => {
  const category = money_list_store.categories.find(
    (cat) => cat.id === categoryId
  );
  return category ? category.title : 'Unknown';
};

onMounted(() => {
  fetch_money_list();
  fetch_categories();
});
</script>

<style scoped>
.nav-tabs .nav-link.active {
  background-color: #ffc107;
  color: #fff;
}
</style>
