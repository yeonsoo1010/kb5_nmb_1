<template>
  <div>
    <div class="row">
      <div class="col p-3">
        <h2>지출</h2>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <div class="form-group mb-3"> 
          <label for="name">내역</label>
          <input
            type="text"
            class="form-control"
            id="moneyItem"
            v-model="moneyItem.name"
          />
        </div>

        <div class="form-group mb-3">
          <label for="price">가격</label>
          <input
            type="number"
            class="form-control"
            id="price"
            v-model="moneyItem.price"
          />
        </div>

        <div class="form-group mb-3">
          <label for="category">카테고리</label>
          <select class="form-control" v-model="moneyItem.category_id">
            <option value="4">식비</option>
            <option value="5">교통</option>
            <option value="6">쇼핑</option>
            <option value="7">의료</option>
            <option value="8">기타</option>
          </select>
        </div>

        <div class="form-group mb-3">
          <label for="memo">메모</label>
          <textarea
            class="form-control"
            id="memo"
            v-model="moneyItem.memo"
          ></textarea>
        </div>

        <div class="form-group mb-3">
          <label for="asset">자산</label>
          <div>
            <input
              type="radio"
              id="cash"
              value="cash"
              v-model="moneyItem.asset_type"
            />
            <label for="cash">현금</label>
            <input
              type="radio"
              id="card"
              value="card"
              v-model="moneyItem.asset_type"
            />
            <label for="card">카드</label>
          </div>
        </div>

        <div class="form-group mb-3">
          <label for="date">날짜</label>
          <input
            type="date"
            class="form-control"
            id="date"
            v-model="moneyItem.date"
          />
        </div>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col text-center">
        <button
          type="button"
          class="btn btn-primary m-1"
          @click="addMoneyHandler"
        >
          추가
        </button>
        <button
          type="button"
          class="btn btn-secondary m-1"
          @click="router.push('/')"
        >
          취소
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { use_money_list_store } from '@/stores/ItemList.js';
import axios from 'axios';

const router = useRouter();
const { fetch_money_list } = use_money_list_store();

const moneyItem = reactive({
  name: '',
  price: 0,
  category_id: '',
  asset_type: 'cash', // 기본값을 현금으로 설정
  memo: '',
  date: '',
});

const addMoneyHandler = async () => {
  if (!moneyItem.name || moneyItem.name.trim() === '') {
    alert('내역을 반드시 입력해야 합니다');
    return;
  }

  const newItem = {
    name: moneyItem.name,
    price: parseFloat(moneyItem.price),
    category_id: moneyItem.category_id,
    asset_type: moneyItem.asset_type,
    datetime: moneyItem.date
      ? new Date(moneyItem.date).toISOString()
      : new Date().toISOString(),
    memo: moneyItem.memo,
  };

  try {
    await axios.post('/api/items', newItem);
    fetch_money_list(); // 목록 갱신
    router.push('/');
  } catch (error) {
    alert('에러 발생: ' + error);
  }
};
</script>

<style scoped>
/* 스타일 설정 */
</style>
