<template>
  <li class="list-group-item">
    {{ moneyItem.name }} - {{ moneyItem.price }}원
  </li>
</template>

<script setup>
defineProps({
  moneyItem: {
    type: Object,
    required: true,
  },
});
</script>
