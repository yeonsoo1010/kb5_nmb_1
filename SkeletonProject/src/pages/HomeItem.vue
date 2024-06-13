<template>
    <div class="container">
        <h3>목록</h3>
        <br />
        <ul class="item-container">
            <li v-for="item in uniqueItems" :key="item.id" :class="getItemClass(item.category_id)">
                <span class="text-line">{{ item.name }}</span>
                <br />
                <div class="item-content">
                    <span class="text-line right-aligned">{{ item.price }}원</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, computed, onBeforeMount } from "vue";
import dbData from "../../db.json";

const items = ref([]);

// 데이터 로드를 한 번만 실행하는 방법
onBeforeMount(() => {
    if (items.value.length === 0) {
        items.value = dbData.items;
    }
});

const getItemClass = (categoryId) => {
    const category = dbData.category.find((cat) => cat.id === categoryId);
    if (category) {
        return category.type === "income" ? "list-group-item-success" : "list-group-item-danger";
    }
    return "";
};

// 중복된 항목 제거 및 필터링
const uniqueItems = computed(() => {
    const itemIds = new Set();
    return items.value.filter((item) => {
        if (itemIds.has(item.id)) {
            return false;
        } else {
            itemIds.add(item.id);
            return true;
        }
    });
});
</script>

<style scoped>
.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.item-container {
    list-style-type: none;
    padding: 0;
}

.item-container li {
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 3px 4px rgba(0, 0, 0, 0.2);
    max-width: 600px;
    width: 100%;
    box-sizing: border-box;
}

.list-group-item-success {
    background-color: rgba(0, 255, 0, 0.1); /* 초록색 배경 */
}

.list-group-item-danger {
    background-color: rgba(255, 0, 0, 0.1); /* 빨간색 배경 */
}

.item-content {
    text-align: right;
}
</style>
