<template>
    <ul class="item-container">
        <li class="list-group-item">
            <span class="text-line" id="moneyName"></span><br />

            <div class="item-content">
                <span class="text-line right-aligned" id="moneyPrice">{{ moneyItem.name }} {{ moneyItem.price }}원</span>
            </div>
        </li>
    </ul>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
    moneyItem: {
        type: Object,
        required: true,
    },
});
</script>

<style scoped>
.item-container li {
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 3px 4px rgba(0.2, 0.2, 0.2, 0.4);
    max-width: 600px; /* 최대 너비 지정 */
    width: 100%; /* 요소를 꽉 차게 설정 */
    box-sizing: border-box; /* 패딩과 테두리를 포함한 전체 너비로 설정 */
}

#moneyName {
}

#moneyPrice {
}

.item-content {
    text-align: right;
}
</style>
