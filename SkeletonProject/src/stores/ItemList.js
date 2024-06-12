// import
import { defineStore } from "pinia";
import { reactive, computed } from "vue";
import axios from "axios";

// export

export const use_money_list_store = defineStore('money_list', () => {
  const BASEURI = '/api/items';
  const CATEGORYURI = '/api/category';
  const state = reactive({ money_list: [], categories: [] });


  // money_list 목록 조회하기: fetch!!!
  const fetch_money_list = async () => {
    try {
      const response = await axios.get(BASEURI);
      if (response.status === 200) {
        state.money_list = response.data;
      } else {
        alert("데이터 조회 실패");
      }
    } catch (error) {
      alert("에러발생 :" + error);
    }
  };

  // category 목록 조회하기: fetch!!!
  const fetch_categories = async () => {
    try {

      const response = await axios.get(CATEGORYURI);
      if (response.status === 200) {
        state.categories = response.data;
      } else {
        alert('카테고리 조회 실패');

      }
    } catch (error) {
      alert('에러발생 :' + error);
    }
  };

  // 새로운 money_list 아이템 추가합니다. -- +, - 버튼
  const add_money = async ({ name, price, category_id }, successCallback) => {
    try {
      const payload = { name, price, category_id };
      const response = await axios.post(BASEURI, payload);
      if (response.status === 201) {
        state.money_list.push({ ...response.data });
        successCallback();
      } else {
        alert("Todo 추가 실패");
      }
    } catch (error) {
      alert("에러발생 :" + error);
    }
  };


  // 기존 money_list 아이템 변경합니다.

  const update_money = async (
    { id, name, category_id, price, date, memo },
    successCallback
  ) => {
    try {
      const payload = { id, name, category_id, price, date, memo };
      const response = await axios.put(BASEURI + `/${id}`, payload);
      if (response.status === 200) {
        let index = state.money_list.findIndex(
          (moneyItem) => moneyItem.id === id
        );
        state.money_list[index] = payload;
        successCallback();
      } else {
        alert("기록 변경 실패");
      }
    } catch (error) {
      alert("에러발생 :" + error);
    }
  };

  //기존  money_list 아이템 삭제합니다.
  const delete_money = async (id) => {
    try {
      const response = await axios.delete(BASEURI + `/${id}`);
      if (response.status === 200) {
        let index = state.money_list.findIndex(
          (moneyItem) => moneyItem.id === id
        );
        state.money_list.splice(index, 1);
      } else {
        alert("기록 삭제 실패");
      }
    } catch (error) {
      alert("에러발생 :" + error);
    }
  };

  // money_list 반응성 주기
  const money_list = computed(() => state.money_list);

  // categories 반응성 주기
  const categories = computed(() => state.categories);

  // 전체 수입 지출 합계 계산
  const totalIncome = computed(() => {
    return state.money_list
      .filter(
        (item) =>
          state.categories.find((cat) => cat.id === item.category_id)?.type ===
          'income'
      )
      .reduce((sum, item) => sum + item.price, 0);
  });

  const totalExpense = computed(() => {
    return state.money_list
      .filter(
        (item) =>
          state.categories.find((cat) => cat.id === item.category_id)?.type ===
          'outcome'
      )
      .reduce((sum, item) => sum + item.price, 0);
  });

  return {
    money_list,
    categories,
    totalIncome,
    totalExpense,

    add_money,
    update_money,
    delete_money,
    fetch_money_list,
    fetch_categories,
  };
});
