<template>
  <div>
    <button
      id="question"
      class="btn btn-warning rounded-circle custom-button"
      @click="toggleMemo"
    >
      <i class="fa-solid fa-question"></i>
    </button>
    <div v-if="showMemo" class="memo-container">
      <div class="triangle"></div>
      <div class="memo-content">
        💛 가계부 입력 방법 💛 <br />
        <br />
        1. '수입'과 '지출' 버튼 중 원하는 버튼을 누른다 ! <br />
        <br />
        2. 내역, 가격, 카테고리를 입력한 후 추가 버튼을 누른다 ! <br />
        <br />
        3. home 화면으로 돌아오면 끝 !
      </div>
    </div>
    <div></div>
    <router-link
      id="plus"
      class="btn"
      to="/home/plus"
      style="text-align: center"
    >
      <i class="fa-solid fa-plus"></i> 수입
    </router-link>
    <div></div>
    <router-link
      id="minus"
      class="btn"
      to="/home/add"
      style="text-align: center"
    >
      <i class="fa-solid fa-minus"></i> 지출
    </router-link>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
const router = useRouter();
const goToAddItemPage = () => {
  router.push("/additem");
};

const showMemo = ref(false);
const toggleMemo = () => {
  showMemo.value = !showMemo.value;
};
</script>
<style>
#question {
  position: fixed;
  bottom: 55px;
  right: 50px;
  width: 50px;
  height: 50px;

  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  color: #333;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.3s ease;
}
.custom-button:hover {
  box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.5);
}
.memo-container {
  position: absolute;
  bottom: 120px;
  right: 50px;
  width: 230px;
  height: 220px;
  background-color: #f0f0f0;
  border-radius: 5px;
  padding: 10px;
  z-index: 999;
}
.memo-content {
  font-size: 14px;
  color: #333;
}
.triangle {
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 15px solid transparent;
  border-top: 15px solid #f0f0f0;
  position: absolute;
  bottom: -10px;
  right: 10px;
}
#minus {
  position: fixed;
  bottom: 50px;
  left: calc(50% + 10px);
  width: 200px;
  height: 100px;
  color: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  background-color: #ff9aa2;
  font-size: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
#plus {
  position: fixed;
  bottom: 50px;
  left: calc(50% - 240px);
  width: 200px;
  height: 100px;
  color: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  background-color: #55d8a8;
  font-size: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
#plus:hover,
#minus:hover {
  filter: brightness(1.3);
}
#question:hover {
  filter: brightness(1.3);
}
</style>
