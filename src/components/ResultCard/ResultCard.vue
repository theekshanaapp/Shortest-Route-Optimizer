<template>
    <div class="bg-color-gray-light p-8 h-full min-h-472 rounded-tr-lg rounded-br-lg">
      <p class="text-md text-color-primary mb-4 font-semibold">Result</p>
      <div class="bg-white p-6 min-h-364">
        <p class="mb-6 text-sm text-color-text-muted">
          From Node Name = “{{ fromNode }}”, To Node Name = ”{{ toNode }}”: {{ nodeNames.join(', ') }}
        </p>
        <p class="text-sm text-color-text-muted">
          Total Distance: <strong>{{ distance }}</strong>
        </p>
      </div>
    </div>
</template>
  
<script lang="ts" setup>
const props = defineProps<{
    fromNode?: string;
    toNode?: string;
    nodeNames: string[];
    distance: number | undefined;
  }>();
</script>
  
<style scoped>
</style>
  