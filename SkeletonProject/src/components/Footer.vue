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
import { useRouter } from 'vue-router';
import { ref } from 'vue';
const router = useRouter();
const goToAddItemPage = () => {
  router.push('/additem');
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
  /* color: white; */
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0; /* 밝은 회색 배경색 */
  color: #333; /* 텍스트 색상 */
  border: none; /* 테두리 제거 */
  padding: 10px 20px; /* 내부 여백 */
  border-radius: 5px; /* 둥근 테두리 */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3); /* 3D 효과를 주는 그림자 */
  transition: box-shadow 0.3s ease; /* 부드러운 애니메이션 효과 */
}
.custom-button:hover {
  box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.5); /* 호버시 그림자 증가 */
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
  z-index: 999; /* 메모 창이 다른 요소 위에 나타나도록 설정 */
}
.memo-content {
  font-size: 14px; /* 글꼴 크기 설정 */
  color: #333; /* 글꼴 색상 설정 */
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
  filter: brightness(1.3); /* 밝기를 증가시켜 더 진한 색상으로 표시 */
}
#question:hover {
  filter: brightness(1.3);
}
</style>
