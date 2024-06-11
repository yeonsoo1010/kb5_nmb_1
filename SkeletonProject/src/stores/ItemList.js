// import
import { defineStore } from "pinia";
import { reactive, computed } from "vue";
import axios from "axios";

// export
export const use_money_list_store = defineStore("money_list", () => {
    const BASEURI = "/api/items";
    const states = reactive({ money_list: [] });

    // money_list 목록 조회하기: fetch!!!
    const fetch_money_list = async () => {
        try {
            const response = await axios.get(BASEURI);
            if (response.status === 200) {
                states.money_list = response.data;
            } else {
                alert("데이터 조회 실패");
            }
        } catch (error) {
            alert("에러발생 :" + error);
        }
    };

    // money_list 아이템 추가
    // money_list 아이템 수정(변경)
    // money_list 삭제

    // money_list 반응성 주기
    const money_list = computed(() => states.money_list);

    return {
        money_list,
        fetch_money_list,
    };
});
