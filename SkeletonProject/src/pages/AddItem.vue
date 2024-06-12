<template>
  <div>
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
            type="number"
            class="form-control"
            id="price"
            v-model="moneyItem.price"
          />
        </div>

        <div class="form-group">
          <label htmlFor="category">카테고리 :</label>
          <select class="form-control" v-model="moneyItem.category_id">
            <option value="4">식비</option>
            <option value="5">교통</option>
            <option value="6">쇼핑</option>
            <option value="7">의료</option>
            <option value="8">기타</option>
          </select>
        </div>

        <div class="form-group">
          <button
            type="button"
            class="btn btn-primary m-1"
            @click="addMoneyHandler"
          >
            추가
          </button>
          <button
            type="button"
            class="btn btn-primary m-1"
            @click="router.push('/')"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { use_money_list_store } from '@/stores/ItemList.js';

const router = useRouter();
const { add_money, fetch_money_list } = use_money_list_store();
const moneyItem = reactive({ name: '', price: 0, category_id: '' });

const addMoneyHandler = () => {
  if (!moneyItem.name || moneyItem.name.trim() === '') {
    alert('내역을 반드시 입력해야 합니다');
    return;
  }

  const newItem = {
    name: moneyItem.name,
    price: parseFloat(moneyItem.price),
    category_id: moneyItem.category_id,
    datetime: new Date().toISOString(),
    memo: '',
  };

  add_money(newItem, () => {
    fetch_money_list(); // 목록 갱신
    router.push('/');
  });
};
</script>
