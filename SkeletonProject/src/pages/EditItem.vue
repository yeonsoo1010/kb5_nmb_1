<template>
  <div class="row">
    <div class="col p-3">
      <h2>내역 수정</h2>
    </div>
  </div>

  <div class="row">
    <div class="col">
      <div class="form-group">
        <label htmlFor="name">내역:</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="moneyItem.name"
        />
      </div>

      <div class="form-group">
        <label htmlFor="price">가격:</label>
        <input
          class="form-control"
          rows="3"
          id="price"
          v-model="moneyItem.price"
        ></input>
      </div>

      <div class="form-group">
        <button
          type="button"
          class="btn btn-primary m-1"
          @click="updateMoneyHandler"
        >
          수정
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
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { use_money_list_store } from '@/stores/ItemList.js';

const router = useRouter();
const currentRoute = useRoute();

const { money_list, update_money } = use_money_list_store();
const matchedMoneyItem = money_list.find((moneyItem)=>moneyItem.id === currentRoute.params.id)
if (!matchedMoneyItem) {
    router.push('/')
}

const moneyItem = reactive({...matchedMoneyItem})

const updateMoneyHandler = () => {
  let { name } = moneyItem;
  if (!name || name.trim() === '') {
    alert('내역을 반드시 입력해야 합니다');
    return;
  }
  update_money({ ...moneyItem }, () => {
    router.push('/');
  });
};

</script>
