<template>
  <div class="flex items-center justify-between">
    <label class="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        class="sr-only peer"
        :checked="checked"
        @change="handleChange"
      />
      <div class="relative w-11 h-6 bg-gray-300 rounded-full peer peer-focus:ring-4 peer-focus:ring-color-secondary peer-checked:bg-color-secondary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
      <span class="text-sm font-medium ml-3 text-color-body">{{ label }}</span>
    </label>
    <button
      v-if="modelValue"
      class="flex random-node ml-2 cursor-pointer" 
      @click="emitRefreshClick" 
      aria-label="Refresh Selection" 
    >
      <img src="../../assets/refresh.svg" alt="Refresh" class="h-5 w-5" />
    </button>
  </div>
</template>
  
<script lang="ts" setup>
const props = defineProps<{
  label?: string;
  checked?: boolean;
  modelValue?:boolean;
  hasRefreshIcon?: boolean;
}>();
  
const emit = defineEmits<{
  (e: 'update:checked', value: boolean): void;
  (e: 'refreshClick'): void;
}>();
  
const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:checked', target.checked);
}

const emitRefreshClick = () => {
  emit('refreshClick');
}
</script>
  
<style scoped>
.random-node {
  background: none;
  border: none;
  padding: 0;
}
.random-node img {
  transition: transform 0.3s;
}
.random-node:hover img {
  transform: scale(1.1);
}
</style>
