<template>
  <div class="container">
    <h1 style="text-align: center; font-size: 28px"></h1>
    <ul class="nav nav-tabs justify-content-center" style="margin-bottom: 20px">
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{ active: currentTab === 'all' }"
          @click="currentTab = 'all'"
          style="font-size: 20px"
          >전체</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{ active: currentTab === 'monthly' }"
          @click="currentTab = 'monthly'"
          style="font-size: 20px"
          >월별</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{ active: currentTab === 'category' }"
          @click="currentTab = 'category'"
          style="font-size: 20px"
          >카테고리별</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{ active: currentTab === 'asset' }"
          @click="currentTab = 'asset'"
          style="font-size: 20px"
          >자산별</a
        >
      </li>
    </ul>

    <div class="mt-3" style="text-align: center">
      <div class="alert alert-info">
        <div class="d-flex justify-content-center">
          <div style="margin-right: 140px">
            <h4>
              수입:
              <span style="color: blue">
                {{ formatCurrency(alltotalIncome) }}원
              </span>
            </h4>
          </div>
          <div style="margin-right: 150px">
            <h4>
              지출:
              <span style="color: red">
                {{ formatCurrency(money_list_store.totalExpense) }}원
              </span>
            </h4>
          </div>
          <div>
            <h4>
              합계:
              {{
                formatCurrency(alltotalIncome - money_list_store.totalExpense)
              }}원
            </h4>
          </div>
        </div>
      </div>

      <div v-if="currentTab === 'all'" class="tab-pane fade show active">
        <div>
          <div class="container">
            <div class="row">
              <div class="col-6">
                <br />
                <h3>📃 목록</h3>
              </div>
            </div>
          </div>
        </div>

        <br />
        <ul>
          <li
            v-for="item in allItems"
            :key="item.id"
            style="list-style-type: none"
          >
            <div class="summary-item">
              <span class="date" style="color: gray">{{
                formatDate(item.datetime)
              }}</span>
              <span class="name">{{ item.name }}</span>
              <span
                class="price"
                :style="{ color: getCategoryColor(item.category_id) }"
              >
                {{ formatCurrency(item.price) }}원
              </span>
            </div>
            <hr style="border-color: gray; margin: 10px auto; width: 800px" />
          </li>
        </ul>
      </div>

      <div v-if="currentTab === 'monthly'" class="tab-pane fade show active">
        <div v-for="(items, month) in monthlyItems" :key="month">
          <br />

          <div>
            <div class="container">
              <div class="row">
                <div class="col-5">
                  <h4>{{ month }}월</h4>
                </div>
              </div>
            </div>
          </div>

          <ul>
            <li
              v-for="item in items"
              :key="item.id"
              style="list-style-type: none"
            >
              <div class="summary-item">
                <span class="date" style="color: gray">{{
                  formatDate(item.datetime)
                }}</span>
                <span class="name">{{ item.name }}</span>
                <span
                  class="price"
                  :style="{ color: getCategoryColor(item.category_id) }"
                >
                  {{ formatCurrency(item.price) }}원
                </span>
              </div>
              <hr style="border-color: gray; margin: 10px auto; width: 800px" />
            </li>
          </ul>
        </div>
      </div>

      <div v-if="currentTab === 'category'" class="tab-pane fade show active">
        <h2></h2>
        <div v-for="(items, category) in categoryItems" :key="category">
          <div>
            <div class="container">
              <div class="row">
                <div class="col-5">
                  <br>
                  <h4>{{ categoryTitle(category) }}</h4>
                </div>
              </div>
            </div>
          </div>

          <ul>
            <li
              v-for="item in items"
              :key="item.id"
              style="list-style-type: none"
            >
              <div class="summary-item">
                <span class="date" style="color: gray">{{
                  formatDate(item.datetime)
                }}</span>
                <span class="name">{{ item.name }}</span>
                <span
                  class="price"
                  :style="{ color: getCategoryColor(item.category_id) }"
                >
                  {{ formatCurrency(item.price) }}원
                </span>
              </div>

              <hr style="border-color: gray; margin: 10px auto; width: 800px" />
            </li>
          </ul>
        </div>
      </div>

      <div v-if="currentTab === 'asset'" class="tab-pane fade show active">
        <h2></h2>
        <div>
          <div class="container">
            <div class="row">
              <div class="col-5">
                <h4>💵 현금</h4>
              </div>
            </div>
          </div>
        </div>

        <br />
        <ul>
          <li
            v-for="item in cashItems"
            :key="item.id"
            style="list-style-type: none"
          >
            <div class="summary-item">
              <span class="date" style="color: gray">{{
                formatDate(item.datetime)
              }}</span>
              <span class="name">{{ item.name }}</span>
              <span
                class="price"
                :style="{ color: getCategoryColor(item.category_id) }"
              >
                {{ formatCurrency(item.price) }}원
              </span>
            </div>
            <hr style="border-color: gray; margin: 10px auto; width: 800px" />
          </li>
        </ul>
        <br />

        <div>
          <div class="container">
            <div class="row">
              <div class="col-5">
                <h4>💳 카드</h4>
              </div>
            </div>
          </div>

          <br />
          <ul>
            <li
              v-for="item in cardItems"
              :key="item.id"
              style="list-style-type: none"
            >
              <div class="summary-item">
                <span class="date" style="color: gray">{{
                  formatDate(item.datetime)
                }}</span>
                <span class="name">{{ item.name }}</span>
                <span
                  class="price"
                  :style="{ color: getCategoryColor(item.category_id) }"
                >
                  {{ formatCurrency(item.price) }}원
                </span>
              </div>
              <hr style="border-color: gray; margin: 10px auto; width: 800px" />

            </li>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { use_money_list_store } from "@/stores/ItemList.js";

const currentTab = ref("all");

const money_list_store = use_money_list_store();

// const { fetch_money_list, fetch_categories, totalIncome, totalExpense } = money_list_store;
const { fetch_money_list, fetch_categories } = money_list_store;

const allItems = computed(() => money_list_store.money_list);
// const alltotalIncome = computed(() => totalIncome);
const alltotalIncome = computed(() => money_list_store.totalIncome);
// console.log("그냥 allItems: ", allItems);

const totalIncome = ref(0);
const totalExpense = ref(0);

// test 추가
// const calculateTotals = () => {
//     console.log("allItems calculateTotlals안에서: ", allItems);
//     totalIncome.value = allItems.value.filter((item) => categories.find((cat) => cat.id === item.category_id && cat.type === "income")).reduce((sum, item) => sum + item.price, 0);

//     totalExpense.value = allItems.value
//         .filter((item) => categories.find((cat) => cat.id === item.category_id && cat.type === "outcome"))
//         .reduce((sum, item) => sum + item.price, 0);
// };

// watch(
//     [money_list_store.money_list, money_list_store.categories],
//     () => {
//         calculateTotals();
//     },
//     { immediate: true }
// );
//여기까지 추가

console.log("totalIncome : ", money_list_store.totalIncome);
console.log("totalExpense : ", money_list_store.totalExpense);

// const incomeItems = computed(() =>
//     allItems.value.filter((item) => {
//         const category = money_list_store.categories.find((cat) => cat.id === item.category_id);
//         return category && category.type === "income";
//     })
// );

// const expenseItems = computed(() =>
//     allItems.value.filter((item) => {
//         const category = money_list_store.categories.find((cat) => cat.id === item.category_id);
//         return category && category.type === "outcome";
//     })
// );


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

const cashItems = computed(() =>
  allItems.value.filter((item) => item.asset_type === 'cash')
);

const cardItems = computed(() =>
  allItems.value.filter((item) => item.asset_type === 'card')
);

const categoryTitle = (categoryId) => {

  const category = money_list_store.categories.find(
    (cat) => cat.id === categoryId
  );
  const icon = categoryIcons[categoryId] || '❓'; // 기본 아이콘 설정
  return category ? `${icon} ${category.title}` : 'Unknown';

};

const formatCurrency = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const formatDate = (datetime) => {
    const date = new Date(datetime);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
};


const categoryIcons = {
  1: '💰',
  2: '🎁',
  3: '📦',
  4: '🍴', // 식비 아이콘
  5: '🚇', // 교통 아이콘
  6: '🛍️', // 쇼핑 아이콘
  7: '💊', // 의료 아이콘
  8: '🔧', // 기타 아이콘
};

const categoryColors = {
  1: 'blue',
  2: 'blue',
  3: 'blue',
  4: 'red',
  5: 'red',
  6: 'red',
  7: 'red',
  8: 'red',
};

const getCategoryColor = (categoryId) => {
  return categoryColors[categoryId] || 'black';
};

// 로딩될 때 자동으로 불러올 수 있도록 -> onMounted(fetch_money_list)는 그냥 목록이 바로 불러와지는 것, 그걸 계산하는 코드가 자동으로 진행되어야!
// onMounted(() => {
//     fetch_money_list();
//     fetch_categories();
//     // totalIncome;
//     // totalExpense;
// });

onMounted(async () => {
    await fetch_money_list();
    await fetch_categories();
    // calculateTotals(); // 데이터가 로드된 후 총계를 계산합니다.
});
</script>

<style scoped>
.nav-tabs .nav-link.active {
    background-color: #ffc107;
    color: #fff;
}


.summary-item {
  display: flex;
  justify-content: center; /* 왼쪽 정렬 */
  align-items: center;
}

.summary-item .date {
  width: 250px;
  font-size: 20px; /* 글씨 크기 키움 */
}

.summary-item .name {
  width: 250px;
  font-size: 20px; /* 글씨 크기 키움 */
}

.summary-item .price {
  width: 250px;
  text-align: right;
  font-size: 20px; /* 글씨 크기 키움 */
}
</style>
