<template>
    <div class="loader flex justify-center items-center h-full">
      <div class="loader-circle animate-spin rounded-full border-t-4 border-b-4 border-blue-600 h-10 w-10"></div>
    </div>
</template>
  
<style scoped>
.loader-circle {
    border-radius: 50%;
    border: 4px solid transparent;
    border-top-color: var(--sky-blue, #3b82f6);;
    border-bottom-color: var(--sky-blue, #3b82f6);;
    animation: spin 1s linear infinite;
}
  
@keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
}
</style>
