<template>
  <div class="chart-container">
    <div class="chart">
      <canvas ref="chartCanvas" style="width: 500px; height: 300px"></canvas>
    </div>
    <div class="legend">
      <h3>총 지출액: {{ totalAmount.toLocaleString() }}원</h3>
      <br />
      <h4>세부 항목</h4>
      <ul>
        <li v-for="(label, index) in chartLabels" :key="index">
          <span
            class="legend-color"
            :style="{ backgroundColor: colors[index] }"
          ></span>
          {{ label }}: {{ chartAmounts[index].toLocaleString() }}원
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import Chart from 'chart.js/auto';

const chartAmounts = ref([]);
const chartLabels = ref([]);
const colors = ['#FFC94A', '#C08B5C', '#795458', 'rgb(87, 96, 101)', '#81A263'];

const chartCanvas = ref(null);
let totalAmount = 0; // 총 지출액을 저장할 변수

onMounted(async () => {
  try {
    const itemsResponse = await axios.get('http://localhost:3000/items');
    const categoriesResponse = await axios.get(
      'http://localhost:3000/category'
    );

    const items = itemsResponse.data;
    const categories = categoriesResponse.data;

    const outcomeCategories = categories.filter(
      (category) => category.type === 'outcome'
    );
    const outcomeCategoryMap = outcomeCategories.reduce((acc, category) => {
      acc[category.id] = { title: category.title, total: 0 };
      return acc;
    }, {});

    totalAmount = 0; // 총 지출액 초기화

    items.forEach((item) => {
      if (outcomeCategoryMap[item.category_id]) {
        outcomeCategoryMap[item.category_id].total += parseFloat(item.price);
        totalAmount += parseFloat(item.price); // 총 지출액 누적
      }
    });

    chartLabels.value = outcomeCategories.map((category) => category.title);
    chartAmounts.value = outcomeCategories.map(
      (category) => outcomeCategoryMap[category.id].total
    );

    const ctx = chartCanvas.value.getContext('2d');
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: chartLabels.value,
        datasets: [
          {
            data: chartAmounts.value.map((amount) =>
              ((amount / totalAmount) * 100).toFixed(1)
            ),
            backgroundColor: colors,
            borderColor: '#fff',
            borderWidth: 1,
          },
        ],
      },
      options: {
        aspectRatio: 1.3,
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
            display: false,
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                let label = context.label || '';
                if (label) {
                  label += ': ';
                }
                const value = context.parsed || 0;
                label += value.toFixed(1) + '%';
                return label;
              },
            },
          },
        },
      },
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
</script>

<style scoped>
.chart-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.chart {
  flex: 1;
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
</style>
