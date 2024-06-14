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
                    <input type="text" class="form-control" id="money" v-model="moneyItem.name" />
                </div>
                <br />
                <div class="form-group">
                    <label htmlFor="price">가격 :</label>
                    <input type="number" class="form-control" id="price" v-model="moneyItem.price" />
                </div>
                <br />
                <div class="form-group">
                    <label htmlFor="category">카테고리 :</label>
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
                <br />
                <div class="form-group">
                    <label htmlFor="date">날짜 :</label>
                    <input type="date" class="form-control" id="datetime" v-model="moneyItem.datetime" />
                </div>
                <!-- <div class="form-group">
                    <label for="price">날짜 :</label>
                    <input type="text" class="form-control" ref="datepicker" v-model="moneyItem.datetime" />
                    <p>선택한 날짜: {{ moneyItem.datetime }}</p>
                </div> -->
                <br />
                <div class="form-group">
                    <label htmlFor="price">메모 :</label>
                    <input type="text" class="form-control" id="memo" maxlength="50" v-model="moneyItem.memo" />
                </div>
                <br />

                <div class="form-group mb-3">
                    <label for="asset">자산</label>
                    <div>
                        <input type="radio" id="cash" value="cash" v-model="moneyItem.asset_type" />
                        <label for="cash">&nbsp;현금 &nbsp;&nbsp;&nbsp;</label>
                        <input type="radio" id="card" value="card" v-model="moneyItem.asset_type" />
                        <label for="card">&nbsp;카드</label>
                    </div>
                </div>
                <br />
                <div class="form-group">
                    <button type="button" class="btn btn-secondary m-1" @click="updateMoneyHandler">수 정</button> &nbsp;
                    <button type="button" class="btn btn-secondary m-1" @click="router.push('/')">취 소</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { use_money_list_store } from "@/stores/ItemList.js";

// 라우터, 스토어
const router = useRouter();
const currentRoute = useRoute();

const { money_list, update_money } = use_money_list_store();

// 편집하려는 matchedMoneyItem을 찾아서 updateMoneyHandler 이벤트핸들러
const matchedMoneyItem = money_list.find((item) => item.id === currentRoute.params.id);
if (!matchedMoneyItem) {
    router.push("/");
}
// moneyItem 객체의 구조를 콘솔에 출력하여 확인합니다
console.log(JSON.stringify(matchedMoneyItem, null, 2));
const moneyItem = reactive({ ...matchedMoneyItem });

const updateMoneyHandler = () => {
    // let { money } = moneyItem;
    if (!moneyItem || String(moneyItem.price).trim() === "") {
        alert("반드시 입력해야 합니다");
        console.log(moneyItem);
        return;
    }
    update_money({ ...moneyItem }, () => {
        router.push("/");
    });
};

// //pickaday 날짜 선택기
// onMounted(() => {
//     new Pikaday({
//         field: datepicker.value,
//         format: "YYYY-MM-DD",
//         onSelect: function (date) {
//             moneyItem.value.datetime = moment(date).format("YYYY-MM-DD");
//         },
//     });
// });
</script>
