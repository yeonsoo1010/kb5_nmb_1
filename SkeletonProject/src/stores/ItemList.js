// import
import { defineStore } from 'pinia';
import { reactive, computed } from 'vue';
import axios from 'axios';

// export
export const use_money_list_store = defineStore('money_list', () => {
  const BASEURI = '/api/items';
  const state = reactive({ money_list: [] });

  // money_list 목록 조회하기: fetch!!!
  const fetch_money_list = async () => {
    try {
      const response = await axios.get(BASEURI);
      if (response.status === 200) {
        state.money_list = response.data;
      } else {
        alert('데이터 조회 실패');
      }
    } catch (error) {
      alert('에러발생 :' + error);
    }
  };

  // 새로운 money_list 아이템 추가합니다. -- +, - 버튼
  const add_money = async (moneyItem, successCallback) => {
    try {
      // 카테고리 ID가 있는지 확인
      if (!moneyItem.category_id) {
        alert('카테고리를 선택하세요.');
        return;
      }

      const response = await axios.post(BASEURI, moneyItem);
      if (response.status === 201) {
        state.money_list.push({ ...response.data });
        successCallback();
      } else {
        alert('Todo 추가 실패');
      }
    } catch (error) {
      alert('에러발생 :' + error);
    }
  };
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
        alert('기록 변경 실패');
      }
    } catch (error) {
      alert('에러발생 :' + error);
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
        alert('기록 삭제 실패');
      }
    } catch (error) {
      alert('에러발생 :' + error);
    }
  };

  // money_list 반응성 주기
  const money_list = computed(() => state.money_list);

  return {
    money_list,

    add_money,
    update_money,
    delete_money,
    fetch_money_list,
  };
});
