<template>
    <div class="chart-container">
        <div class="chart-wrapper">
            <div class="controls">
                <br />

                <div class="custom-select">
                    <button @click="toggleDropdown" class="selected-option">
                        {{ selectedMonth }}
                    </button>

                    <ul class="dropdown" :class="{ show: isDropdownOpen }">
                        <li v-for="month in availableMonths" :key="month" @click="selectMonth(month)">
                            {{ month }}
                        </li>
                    </ul>
                </div>
                <br />
                <br />
            </div>
            <div class="chart-area">
                <canvas ref="chartCanvas" class="responsive-chart"></canvas>
            </div>
        </div>
        <div class="info">
            <div class="total-amount">
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <h4>총 지출액</h4>
                <p>{{ totalAmount.toLocaleString() }}원</p>
            </div>
            <div class="legend">
                <h4>세부 항목</h4>
                <ul>
                    <li v-for="(label, index) in chartLabels" :key="index">
                        <span class="legend-color" :style="{ backgroundColor: colors[index % colors.length] }"></span>
                        {{ label }}: {{ chartAmounts[index].toLocaleString() }}원
                    </li>
                </ul>
            </div>
        </div>
        <div class="total-amount-chart">
            <canvas id="totalAmountChart" class="responsive-chart"></canvas>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref, watch } from "vue";
import axios from "axios";
import Chart from "chart.js/auto";
const chartAmounts = ref([]);
const chartLabels = ref([]);
const colors = ["#FFC94A", "#C08B5C", "#795458", "rgb(87, 96, 101)", "#81A263"];
const chartCanvas = ref(null);
const selectedMonth = ref("");
const availableMonths = ref([]);
const isDropdownOpen = ref(false);
const totalAmount = ref(0);
let chartInstance = null;
let totalAmountChartInstance = null;
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
        const itemsResponse = await axios.get("http://localhost:3000/items");
        const categoriesResponse = await axios.get("http://localhost:3000/category");
        const items = itemsResponse.data;
        const categories = categoriesResponse.data;
        outcomeCategories = categories.filter((category) => category.type === "outcome");
        const outcomeCategoryMap = outcomeCategories.reduce((acc, category) => {
            acc[category.id] = { title: category.title, total: 0 };
            return acc;
        }, {});
        expenses = {};
        items.forEach((item) => {
            if (outcomeCategoryMap[item.category_id]) {
                const date = new Date(item.datetime);
                const month = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`;
                if (!expenses[month]) {
                    expenses[month] = { totalAmount: 0, categoryAmounts: {} };
                }
                if (!expenses[month].categoryAmounts[item.category_id]) {
                    expenses[month].categoryAmounts[item.category_id] = 0;
                }
                expenses[month].categoryAmounts[item.category_id] += parseFloat(item.price);
                expenses[month].totalAmount += parseFloat(item.price);
            }
        });
        availableMonths.value = Object.keys(expenses).sort();
        if (availableMonths.value.length > 0) {
            selectedMonth.value = availableMonths.value[0];
        }
        chartLabels.value = Object.keys(expenses[selectedMonth.value].categoryAmounts).map((id) => {
            const category = outcomeCategories.find((category) => category.id === id);
            return category ? category.title : "기타";
        });
        return { outcomeCategories, expenses };
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};
const updateChart = () => {
    const monthData = expenses[selectedMonth.value];
    if (!monthData) return;
    totalAmount.value = monthData.totalAmount;
    chartLabels.value = Object.keys(monthData.categoryAmounts).map((id) => {
        const category = outcomeCategories.find((category) => category.id === id);
        return category ? category.title : "기타";
    });
    chartAmounts.value = Object.values(monthData.categoryAmounts);
    const ctx = chartCanvas.value.getContext("2d");
    if (chartInstance) {
        chartInstance.destroy();
    }
    chartInstance = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: chartLabels.value,
            datasets: [
                {
                    data: chartAmounts.value,
                    backgroundColor: colors,
                    borderColor: "#fff",
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                },
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            let label = context.label || "";
                            if (label) {
                                label += ": ";
                            }
                            const value = context.raw || 0;
                            label += value.toLocaleString() + "원";
                            return label;
                        },
                    },
                },
                doughnutLabel: {
                    labels: [
                        {
                            render: "percentage",
                            fontColor: "#fff",
                            precision: 0,
                            fontSize: 14,
                        },
                    ],
                },
            },
        },
    });
    if (totalAmountChartInstance) {
        totalAmountChartInstance.destroy();
    }
    const totalAmountCtx = document.getElementById("totalAmountChart").getContext("2d");
    totalAmountChartInstance = new Chart(totalAmountCtx, {
        type: "bar",
        data: {
            labels: availableMonths.value,
            datasets: [
                {
                    label: "월별 총 지출액",
                    data: availableMonths.value.map((month) => expenses[month]?.totalAmount || 0),
                    backgroundColor: "#C7C8CC",
                    borderColor: "#C7C8CC",
                    borderWidth: 1,
                    hoverBackgroundColor: "#413F42",
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                },
                title: {
                    display: true,
                    text: "월별 총 지출액",
                    fontSize: 16,
                },
            },
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
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
}
.chart-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;
}
.chart-area {
    width: 100%;
    max-width: 400px;
    margin-bottom: 20px;
}
.info {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;
}
.total-amount-chart {
    width: 100%;
    max-width: 700px;
    height: 450px;
    margin-top: 20px;
}
.total-amount {
    margin-bottom: 20px;
    text-align: center;
}
.legend {
    text-align: center;
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
    align-items: left;
    justify-content: flex-start;
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
    width: 150px;
}
.dropdown {
    position: absolute;
    top: calc(100% + 5px);
    left: 0;
    z-index: 10;
    width: 150px;
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
.responsive-chart {
    width: 100%;
    height: auto;
}
</style>
