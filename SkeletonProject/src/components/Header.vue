<template>
    <nav class="navbar navbar-expand-sm bg-warning navbar-dark sticky-top rounded-top">
        <div class="container justify-content-between">
            <router-link to="/" class="navbar-brand" @click="fetch_money_list"><i class="fa-solid fa-comment-dollar"></i> 가계부</router-link>
            <div class="collapse navbar-collapse" id="mynavbar1">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item"></li>
                    <li class="nav-item">
                        <router-link to="/Chart" class="nav-link">통계</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/summary" class="nav-link">요약보기</router-link>
                    </li>
                </ul>
            </div>
            <div class="d-flex justify-content-end">
                <div class="collapse navbar-collapse d-none d-sm-block" id="mynavbar">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <router-link to="/profile" class="nav-link"><i class="fa-solid fa-user-large"></i> 프로필 </router-link>
                        </li>
                    </ul>
                </div>
            </div>


        </div>
    </nav>
</template>

<script setup>
import { computed } from 'vue';
import { use_money_list_store } from '@/stores/ItemList.js';

const money_list_store = use_money_list_store();
const { fetch_money_list } = money_list_store;
const money_list = computed(() => money_list_store.money_list);
</script>

<style scoped>
.navbar.rounded-top {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}
</style>
