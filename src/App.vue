<template>
  <div class="w-full h-screen">
    <!-- Header Section -->
    <div class="bg-color-primary w-full flex h-[377px] pt-[80px] justify-start flex-col items-center md:h-[340px] md:pt-[40px]">
      <h1 class="text-heading1 mt-0 mb-4 text-white text-center md:text-[28px] md:mb-1">
        Dijkstra’s Algorithm Calculator
      </h1>
      <p class="text-base text-white text-center mb-6 md:text-sm md:max-w-[300px]">
        Discovering Optimal Routes Through Nodes Using Dijkstra's Method
      </p>
    </div>

    <!-- Body Section -->
    <div class="h-[calc(100%-377px)] bg-[#E7F3FF] flex items-start justify-center md:w-full md:h-[calc(100%-30px)]">
      <ShortestPathOptimizer />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ShortestPathOptimizer from "./components/ShortestPathOptimizer.vue";
export default defineComponent({
  name: "App",
  components: {
    ShortestPathOptimizer
  },
});
</script>

<style scoped>
</style>
