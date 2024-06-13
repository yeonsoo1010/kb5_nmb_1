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
          >월별</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{ active: currentTab === 'category' }"
          @click="currentTab = 'category'"
          >카테고리별</a
        >
      </li>
    </ul>
    <div class="mt-3">
      <div class="alert alert-info">
        <div class="d-flex justify-content-between">
          <div>
            <h4 class="text-blue">수입: {{ formatCurrency(totalIncome) }}원</h4>
          </div>
          <div>
            <h4 class="text-red">지출: {{ formatCurrency(totalExpense) }}원</h4>
          </div>
          <div>
            <h4>합계: {{ formatCurrency(totalIncome - totalExpense) }}원</h4>
          </div>
        </div>
      </div>
      <div v-if="currentTab === 'all'" class="tab-pane fade show active">
        <h2></h2>
        <ul>
          <li v-for="item in allItems" :key="item.id">
            <span class="text-gray">{{ formatDate(item.datetime) }}</span
            >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ item.name }}:
            <span
              :class="{
                'text-blue': isIncome(item),
                'text-red': isExpense(item),
              }"
            >
              {{ formatCurrency(item.price) }}원
            </span>
          </li>
        </ul>
      </div>
      <div v-if="currentTab === 'monthly'" class="tab-pane fade show active">
        <h2></h2>
        <div v-for="(items, month) in monthlyItems" :key="month">
          <h3>{{ month }}월</h3>
          <ul>
            <li v-for="item in items" :key="item.id">
              <span class="text-gray">{{ formatDate(item.datetime) }}</span
              >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ item.name }}:
              <span
                :class="{
                  'text-blue': isIncome(item),
                  'text-red': isExpense(item),
                }"
              >
                {{ formatCurrency(item.price) }}원
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div v-if="currentTab === 'category'" class="tab-pane fade show active">
        <h2></h2>
        <div v-for="(items, category) in categoryItems" :key="category">
          <h3>{{ categoryTitle(category) }}</h3>
          <ul>
            <li v-for="item in items" :key="item.id">
              <span class="text-gray">{{ formatDate(item.datetime) }}</span
              >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ item.name }}:
              <span
                :class="{
                  'text-blue': isIncome(item),
                  'text-red': isExpense(item),
                }"
              >
                {{ formatCurrency(item.price) }}원
              </span>
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
const { fetch_money_list, fetch_categories, totalIncome, totalExpense } =
  money_list_store;

const allItems = computed(() => money_list_store.money_list);

const incomeItems = computed(() =>
  allItems.value.filter((item) => {
    const category = money_list_store.categories.find(
      (cat) => cat.id === item.category_id
    );
    return category && category.type === 'income';
  })
);

const expenseItems = computed(() =>
  allItems.value.filter((item) => {
    const category = money_list_store.categories.find(
      (cat) => cat.id === item.category_id
    );
    return category && category.type === 'outcome';
  })
);

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

const formatCurrency = (value) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const formatDate = (datetime) => {
  const date = new Date(datetime);
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
};

const isIncome = (item) => {
  const category = money_list_store.categories.find(
    (cat) => cat.id === item.category_id
  );
  return category && category.type === 'income';
};

const isExpense = (item) => {
  const category = money_list_store.categories.find(
    (cat) => cat.id === item.category_id
  );
  return category && category.type === 'outcome';
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

.text-blue {
  color: blue;
}

.text-red {
  color: red;
}

.text-gray {
  color: gray;
}
</style>
