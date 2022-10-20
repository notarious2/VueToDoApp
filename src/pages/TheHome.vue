<template>
  <h1>HOME PAGE</h1>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();

console.log(route.path);
</script>
