<template>
    <div>
        <div class="row">
            <div class="col p-3">
<<<<<<< HEAD
                <h2>내역 추가</h2>
=======
                <h2>지출</h2>
>>>>>>> c77220d13e32d6cc7168772df95ff873be61d18e
            </div>
        </div>

        <div class="row">
            <div class="col">
<<<<<<< HEAD
                <div class="form-group">
                    <label htmlFor="name">내역 :</label>
                    <input type="text" class="form-control" id="moneyItem" v-model="moneyItem.name" />
                </div>

                <div class="form-group">
                    <label htmlFor="price">가격 :</label>
                    <input type="number" class="form-control" id="price" v-model="moneyItem.price" />
                </div>

                <div class="form-group">
                    <label htmlFor="category">카테고리 :</label>
=======
                <div class="form-group mb-3">
                    <label for="name">내역</label>
                    <input type="text" class="form-control" id="moneyItem" v-model="moneyItem.name" />
                </div>

                <div class="form-group mb-3">
                    <label for="price">가격</label>
                    <input type="number" class="form-control" id="price" v-model="moneyItem.price" />
                </div>

                <div class="form-group mb-3">
                    <label for="category">카테고리</label>
>>>>>>> c77220d13e32d6cc7168772df95ff873be61d18e
                    <select class="form-control" v-model="moneyItem.category_id">
                        <option value="4">식비</option>
                        <option value="5">교통</option>
                        <option value="6">쇼핑</option>
                        <option value="7">의료</option>
                        <option value="8">기타</option>
                    </select>
                </div>

<<<<<<< HEAD
                <div class="form-group">
                    <button type="button" class="btn btn-primary m-1" @click="addMoneyHandler">추가</button>
                    <button type="button" class="btn btn-primary m-1" @click="router.push('/')">취소</button>
                </div>
            </div>
        </div>
=======
                <div class="form-group mb-3">
                    <label for="memo">메모</label>
                    <textarea class="form-control" id="memo" v-model="moneyItem.memo"></textarea>
                </div>

                <div class="form-group mb-3">
                    <label for="date">날짜</label>
                    <input type="date" class="form-control" id="date" v-model="moneyItem.date" />
                </div>
            </div>
        </div>

        <div class="row mt-4">
            <div class="col text-center">
                <button type="button" class="btn btn-primary m-1" @click="addMoneyHandler">추가</button>
                <button type="button" class="btn btn-secondary m-1" @click="router.push('/')">취소</button>
            </div>
        </div>
>>>>>>> c77220d13e32d6cc7168772df95ff873be61d18e
    </div>
</template>

<script setup>
<<<<<<< HEAD
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { use_money_list_store } from "@/stores/ItemList.js";

const router = useRouter();
const { add_money, fetch_money_list } = use_money_list_store();
const moneyItem = reactive({ name: "", price: 0, category_id: "" });
=======

import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { use_money_list_store } from '@/stores/ItemList.js';


const router = useRouter();
const { add_money, fetch_money_list } = use_money_list_store();
const moneyItem = reactive({
    name: "",
    price: 0,
    category_id: "",
    memo: "",
    date: "",
});
>>>>>>> c77220d13e32d6cc7168772df95ff873be61d18e

const addMoneyHandler = () => {
    if (!moneyItem.name || moneyItem.name.trim() === "") {
        alert("내역을 반드시 입력해야 합니다");
        return;
    }

    const newItem = {
        name: moneyItem.name,
        price: parseFloat(moneyItem.price),
        category_id: moneyItem.category_id,
<<<<<<< HEAD
        datetime: new Date().toISOString(),
        memo: "",
=======
        datetime: moneyItem.date ? new Date(moneyItem.date).toISOString() : new Date().toISOString(),
        memo: moneyItem.memo,
>>>>>>> c77220d13e32d6cc7168772df95ff873be61d18e
    };

    add_money(newItem, () => {
        fetch_money_list(); // 목록 갱신
        router.push("/");
    });
};
</script>
