<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
html, body, #app {
  font-family: "Dongle", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 32px;
}

body, h1, h2, h3, h4, h5, h6, p, div, span, a {
  font-family: "Dongle", sans-serif;
}

/* 입력 요소들에 대한 특별한 규칙 */
button, .btn, input, select, textarea {
  font-family: "Dongle", sans-serif !important;
  font-size: 24px !important; /* 또는 원하는 크기 */
  font-weight: 400 !important;
  font-style: normal !important;
}

/* 옵션 요소에 대한 스타일 */
option {
  font-size: 32px !important; /* 또는 원하는 크기 */
}

</style>