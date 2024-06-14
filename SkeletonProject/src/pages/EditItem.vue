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
          <label htmlFor="name">내역 </label>
          <input
            type="text"
            class="form-control"
            id="money"
            v-model="moneyItem.name"
          />
        </div>

        <div class="form-group">
          <label htmlFor="price">가격 </label>
          <input
            type="number"
            class="form-control"
            id="price"
            v-model="moneyItem.price"
          />
        </div>

        <div class="form-group">
          <label htmlFor="category">카테고리 </label>
          <select class="form-control" v-model="moneyItem.category_id">
            <optgroup label="수입">
              <option value="1">월급</option>
              <option value="2">용돈</option>
              <option value="3">기타</option>
            </optgroup>
            <optgroup label="지출">
              <option value="4">식비</option>
              <option value="5">교통</option>
              <option value="6">쇼핑</option>
              <option value="7">의료</option>
              <option value="8">기타</option>
            </optgroup>
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
            <label for="cash">&nbsp;현금&nbsp;</label>
            <input
              type="radio"
              id="card"
              value="card"
              v-model="moneyItem.asset_type"
            />
            <label for="card">&nbsp;카드</label>
          </div>
        </div>

        <div class="form-group">
          <label htmlFor="price">날짜 </label>
          <input
            type="date"
            class="form-control"
            id="datetime"
            v-model="moneyItem.datetime"
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
import { reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { use_money_list_store } from "@/stores/ItemList.js";
import axios from "axios"; // axios import 추가

const router = useRouter();
const currentRoute = useRoute();
const { money_list, update_money } = use_money_list_store();

// 편집하려는 matchedMoneyItem을 찾아서 updateMoneyHandler 이벤트핸들러
const matchedMoneyItem = money_list.find(
  (item) => item.id === currentRoute.params.id
);

if (!matchedMoneyItem) {
  router.push("/");
}

const moneyItem = reactive({ ...matchedMoneyItem });

const updateMoneyHandler = async () => {
  if (!moneyItem.name || moneyItem.name.trim() === "") {
    alert("내역을 반드시 입력해야 합니다");
    return;
  }

  const updatedItem = {
    name: moneyItem.name,
    price: parseFloat(moneyItem.price),
    category_id: moneyItem.category_id,
    asset_type: moneyItem.asset_type,
    datetime: moneyItem.datetime,
    memo: moneyItem.memo,
  };

  try {
    await axios.put(`/api/items/${moneyItem.id}`, updatedItem); // 수정된 항목을 서버에 업데이트
    router.push("/"); // 루트 페이지로 이동
  } catch (error) {
    alert("에러 발생: " + error);
  }
};
</script>
