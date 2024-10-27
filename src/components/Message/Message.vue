<template>
    <div
        class="error-message mt-5 p-4 rounded-md shadow-md"
        :class="{
            'bg-red-50 border-red-200 text-red-800': status === 'error',
            'bg-green-50 border-green-200 text-green-800': status === 'success'
        }"
    >
        <p class="text-sm text-center font-medium">
            {{ label }}
        </p>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    label: string;
    status?: 'error' | 'success';
}>();
</script>

<style scoped>
</style>
