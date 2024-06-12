<template>
  <div>
    <div class="row">
      <div class="col p-3">
        <h2>내역 수정</h2>
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
          <button
            type="button"
            class="btn btn-primary m-1"
            @click="updateMoneyHandler"
          >
            수 정
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
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { use_money_list_store } from '@/stores/ItemList.js';

const router = useRouter();
const route = useRoute();
const { update_money, fetch_money_list, get_money_item } =
  use_money_list_store();
const moneyItem = reactive({ name: '', price: 0 });

onMounted(() => {
  const id = route.params.id;
  const item = get_money_item(id);
  if (item) {
    moneyItem.name = item.name;
    moneyItem.price = item.price;
  }
});

const updateMoneyHandler = () => {
  if (!moneyItem.name || moneyItem.name.trim() === '') {
    alert('내역을 반드시 입력해야 합니다');
    return;
  }

  update_money(route.params.id, { ...moneyItem }, () => {
    fetch_money_list(); // 목록 갱신
    router.push('/');
  });
};
</script>
