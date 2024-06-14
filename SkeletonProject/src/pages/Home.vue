<template>
  <div>
    <div class="row align-items-center justify-content-between">
      <div class="col-auto p-3">
        <router-link to="/home/edit/editlist">
          <button class="btn btn-outline-secondary">
            <i class="fa-regular fa-pen-to-square"></i> 편집 / 삭제
          </button>
        </router-link>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-7">
        <div class="list-container">
          <ul class="list-group">
            <HomeItem />
            <!-- v-for="moneyItem in sortedMoneyList"
              :key="moneyItem.id"
              :moneyItem="moneyItem" -->
            <Footer></Footer>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted } from "vue";
import { use_money_list_store } from "@/stores/ItemList.js";
import Footer from "@/components/Footer.vue";
import HomeItem from "@/pages/HomeItem.vue";

const money_list_store = use_money_list_store();
const { fetch_money_list } = money_list_store;
const money_list = computed(() => money_list_store.money_list);

onMounted(fetch_money_list);

const sortedMoneyList = computed(() => {
  return money_list.value.slice().sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });
});
</script>

<style scoped>
.list-container {
  max-height: 550px;
  overflow-y: auto; /* 세로 스크롤 활성화 */
}

/* 전체 스크롤바 */
.list-container::-webkit-scrollbar {
  width: 12px; /* 스크롤바 너비 */
}

/* 스크롤바 트랙 */
.list-container::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* 스크롤바 핸들 */
.list-container::-webkit-scrollbar-thumb {
  background: #888;
}
</style>
