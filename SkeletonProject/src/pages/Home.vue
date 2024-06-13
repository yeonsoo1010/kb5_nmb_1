<template>
    <div>
        <div class="row align-items-center justify-content-between">
            <!-- 가계부를 클릭하면 fetch -->
            <!-- <div class="col-auto p-3">
                <button class="btn btn-primary" @click="fetch_money_list">목록 보기</button>
            </div> -->
            <div class="col-auto p-3">
                <button class="btn btn-outline-secondary">
                    <router-link to="/home/edit/editlist">
                        <i class="fa-regular fa-trash-can"> </i>
                    </router-link>
                </button>
            </div>
        </div>

        <div class="row justify-content-center">
            <div class="col-7">
                <ul class="list-group">
                    <HomeItem_edit_delete v-for="moneyItem in money_list" :key="moneyItem.id" :moneyItem="moneyItem" />
                </ul>
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
import { computed, onMounted } from "vue";
import { use_money_list_store } from "@/stores/ItemList.js";
import HomeItem_edit_delete from "@/pages/HomeItem_edit_delete.vue";
import Footer from "@/components/Footer.vue";

const money_list_store = use_money_list_store();
const { fetch_money_list } = money_list_store;
const money_list = computed(() => money_list_store.money_list);

onMounted(fetch_money_list);
</script>
