<template>
  <h1>HOME PAGE</h1>
  <swiper
    :slidesPerView="1"
    :spaceBetween="30"
    :loop="true"
    :centeredSlides="true"
    :pagination="{
      clickable: true,
    }"
    :autoplay="{
      delay: 5000,
      disableOnInteraction: false,
    }"
    :navigation="true"
    :modules="modules"
  >
    <swiper-slide
      ><img src="../assets/slide1.png" alt="slide 1"
    /></swiper-slide>
    <swiper-slide
      ><img src="../assets/slide1.png" alt="slide 1"
    /></swiper-slide>
    <swiper-slide><img src="../assets/slide1.png" alt="slide 1" /></swiper-slide
  ></swiper>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);
const modules = ref([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

const route = useRoute();

// SwiperCore.use([Navigation]);

console.log(route.path);
</script>

<style scoped>
img {
  width: 300px;
}
</style>

<style>
.swiper-button-next,
.swiper-button-prev {
  color: lightsalmon;
  height: 0px;
  width: 15px;
}
</style>
