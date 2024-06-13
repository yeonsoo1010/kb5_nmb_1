<template>
    <div>
        <div class="row align-items-center justify-content-between">
            <div class="col-auto p-3">
                <button class="btn btn-primary" @click="fetch_money_list">목록 보기</button>
            </div>
            <div class="col-auto p-3">
                <button class="btn btn-outline-secondary">
                    <i class="fa-regular fa-trash-can"></i>
                </button>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-7">
                <div class="list-container">
                    <ul class="list-group">
                        <HomeItem v-for="moneyItem in sortedMoneyList" :key="moneyItem.id" :moneyItem="moneyItem" />
                    </ul>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col p-3">
                <Footer></Footer>
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed } from "vue";
import { use_money_list_store } from "@/stores/ItemList.js";
import Footer from "@/components/Footer.vue";
import HomeItem from "@/pages/HomeItem.vue";
const money_list_store = use_money_list_store();
const { fetch_money_list } = money_list_store;
const money_list = computed(() => money_list_store.money_list);
const sortedMoneyList = computed(() => {
    return money_list.value.slice().sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
    });
});
</script>
<style scoped>
.list-container {
    max-height: 550px;
    overflow-y: auto;
}
</style>
