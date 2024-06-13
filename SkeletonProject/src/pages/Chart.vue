<template>
  <div class="chart-container">
    <div class="chart-wrapper">
      <div class="controls">
        <div class="custom-select">
          <button @click="toggleDropdown" class="selected-option">
            {{ selectedMonth }}
          </button>
          <ul class="dropdown" :class="{ show: isDropdownOpen }">
            <li
              v-for="month in availableMonths"
              :key="month"
              @click="selectMonth(month)"
            >
              {{ month }}
            </li>
          </ul>
        </div>
      </div>
      <div class="chart-area">
        <canvas ref="chartCanvas" style="width: 400px; height: 400px"></canvas>
      </div>
    </div>
    <div class="info">
      <div class="total-amount">
        <h3>총 지출액</h3>
        <p>{{ totalAmount.toLocaleString() }}원</p>
      </div>
      <div class="legend">
        <h3>세부 항목</h3>
        <ul>
          <li v-for="(label, index) in chartLabels" :key="index">
            <span
              class="legend-color"
              :style="{ backgroundColor: colors[index % colors.length] }"
            ></span>
            {{ label }}: {{ chartAmounts[index].toLocaleString() }}원
          </li>
        </ul>
      </div>
    </div>
    <div class="total-amount-chart">
      <canvas
        id="totalAmountChart"
        style="width: 600px; height: 400px"
      ></canvas>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import axios from 'axios';
import Chart from 'chart.js/auto';

const chartAmounts = ref([]);
const chartLabels = ref([]);
const colors = ['#FFC94A', '#C08B5C', '#795458', 'rgb(87, 96, 101)', '#81A263'];
const chartCanvas = ref(null);
const selectedMonth = ref('');
const availableMonths = ref([]);
const isDropdownOpen = ref(false);
const totalAmount = ref(0); // 총 지출액을 ref로 선언
let chartInstance = null; // Chart 인스턴스를 저장할 변수
let totalAmountChartInstance = null; // 총 지출액 막대그래프 인스턴스를 저장할 변수
let outcomeCategories = [];
let expenses = {};

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const selectMonth = (month) => {
  selectedMonth.value = month;
  isDropdownOpen.value = false;
};

const fetchData = async () => {
  try {
    const itemsResponse = await axios.get('http://localhost:3000/items');
    const categoriesResponse = await axios.get(
      'http://localhost:3000/category'
    );

    const items = itemsResponse.data;
    const categories = categoriesResponse.data;

    outcomeCategories = categories.filter(
      (category) => category.type === 'outcome'
    );

    const outcomeCategoryMap = outcomeCategories.reduce((acc, category) => {
      acc[category.id] = { title: category.title, total: 0 };
      return acc;
    }, {});

    expenses = {};

    items.forEach((item) => {
      if (outcomeCategoryMap[item.category_id]) {
        const date = new Date(item.datetime);
        const month = `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, '0')}`;

        if (!expenses[month]) {
          expenses[month] = { totalAmount: 0, categoryAmounts: {} };
        }

        if (!expenses[month].categoryAmounts[item.category_id]) {
          expenses[month].categoryAmounts[item.category_id] = 0;
        }

        expenses[month].categoryAmounts[item.category_id] += parseFloat(
          item.price
        );
        expenses[month].totalAmount += parseFloat(item.price);
      }
    });

    availableMonths.value = Object.keys(expenses).sort();
    if (availableMonths.value.length > 0) {
      selectedMonth.value = availableMonths.value[0];
    }

    // Update chartLabels with category titles using category IDs
    chartLabels.value = Object.keys(
      expenses[selectedMonth.value].categoryAmounts
    ).map((id) => {
      const category = outcomeCategories.find((category) => category.id === id);
      return category ? category.title : '기타';
    });

    return { outcomeCategories, expenses };
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const updateChart = () => {
  const monthData = expenses[selectedMonth.value];
  if (!monthData) return;

  totalAmount.value = monthData.totalAmount;
  chartLabels.value = Object.keys(monthData.categoryAmounts).map((id) => {
    const category = outcomeCategories.find((category) => category.id === id);
    return category ? category.title : '기타';
  });
  chartAmounts.value = Object.values(monthData.categoryAmounts);

  const ctx = chartCanvas.value.getContext('2d');

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: chartLabels.value,
      datasets: [
        {
          data: chartAmounts.value,
          backgroundColor: colors,
          borderColor: '#fff',
          borderWidth: 1,
        },
      ],
    },
    options: {
      aspectRatio: 0.8, // 가로 및 세로 비율 조정
      layout: {
        padding: {
          top: 20,
          bottom: 20,
          left: 20,
          right: 20,
        },
      },
      plugins: {
        legend: {
          display: true,
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              let label = context.label || '';
              if (label) {
                label += ': ';
              }
              const value = context.raw || 0;
              label += value.toLocaleString() + '원';
              return label;
            },
          },
        },
        doughnutLabel: {
          labels: [
            {
              render: 'percentage',
              fontColor: '#fff',
              precision: 0,
              fontSize: 14,
            },
          ],
        },
      },
    },
  });

  // 월별 총 지출액 차트 생성
  if (totalAmountChartInstance) {
    totalAmountChartInstance.destroy();
  }

  const totalAmountCtx = document
    .getElementById('totalAmountChart')
    .getContext('2d');
  totalAmountChartInstance = new Chart(totalAmountCtx, {
    type: 'bar',
    data: {
      labels: availableMonths.value,
      datasets: [
        {
          label: '월별 총 지출액',
          data: availableMonths.value.map(
            (month) => expenses[month]?.totalAmount || 0
          ),
          backgroundColor: '#007bff', // 색상은 여기에 맞게 수정하세요.
          borderColor: '#007bff',
          borderWidth: 1,
        },
      ],
    },
    options: {
      indexAxis: 'x', // 가로 막대그래프로 설정
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          // 새로운 title 객체 추가
          display: true,
          text: '월별 총 지출액',
          fontSize: 30, // 월별 총 지출액 제목 글자 크기 조절
        },
      },
      aspectRatio: 1.2,
    },
  });
};

onMounted(async () => {
  await fetchData();
  updateChart();
});

watch(selectedMonth, updateChart);
</script>

<style scoped>
.chart-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.chart-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.chart-area {
  margin-right: 50px; /* 도넛 차트와 정보 사이 간격 조절 */
}

.info {
  display: flex;
  flex-direction: column;
  align-items: flex-end; /* 총 지출액 및 세부 항목 오른쪽 정렬 */
}

.total-amount-chart {
  margin-left: 50px; /* 막대 그래프와 정보 사이 간격 조절 */
}

.total-amount {
  margin-bottom: 20px;
}

.legend {
  flex: 1;
}

.legend h3 {
  margin-bottom: 10px;
}

.legend ul {
  list-style-type: none;
  padding: 0;
}

.legend li {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.legend-color {
  width: 20px;
  height: 20px;
  margin-right: 5px;
  border-radius: 50%;
  display: inline-block;
}

.custom-select {
  position: relative;
  display: inline-block;
}

.selected-option {
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  width: 150px; /* 선택 상자의 너비 조정 */
}

.dropdown {
  position: absolute;
  top: calc(100% + 5px); /* 선택 상자 아래에 나타나도록 위치 조정 */
  left: 0;
  z-index: 10;
  width: 150px; /* 드롭다운 메뉴의 너비 조정 */
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 5px 5px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: max-height 0.3s ease-in-out;
  display: none;
}

.dropdown.show {
  display: block;
}

.dropdown li {
  padding: 10px;
  cursor: pointer;
}

.dropdown li:hover {
  background-color: #f0f0f0;
}
</style>
