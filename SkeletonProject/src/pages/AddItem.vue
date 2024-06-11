<template>
  <div class="row">
    <div class="col p-3">
      <h2>내역 추가</h2>
    </div>
  </div>

  <div class="row">
    <div class="col">
      <div class="form-group">
        <label htmlFor="name">내역 :</label>
        <input
          type="text"
          class="form-control"
          id="moneyItem"
          v-model="moneyItem.name"
        />
      </div>

      <div class="form-group">
        <label htmlFor="price">가격 :</label>
        <input
          class="form-control"
          rows="3"
          id="price"
          v-model="moneyItem.price"
        ></input>
      </div>

      <div class="form-group">
        <button type="button" class="btn btn-primary m-1" @click="addMoneyHandler">
          추 가
        </button>
        <button
          type="button"
          class="btn btn-primary m-1"
          @click="router.push('/')"
        >
          취 소
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { use_money_list_store } from '@/stores/ItemList.js';

const router = useRouter();
const { add_money,fetch_money_list, money_list } = use_money_list_store();
const moneyItem = reactive({ name: '', price: 0 });

const addMoneyHandler = () => {
    if (!moneyItem.name || moneyItem.name.trim() === '') {
    alert('내역을 반드시 입력해야 합니다');
    return;
  }
  add_money({ ...moneyItem }, () => {
    fetch_money_list(); // 목록 갱신
    router.push('/');
  });
};
</script>
