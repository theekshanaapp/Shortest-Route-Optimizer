<template>
    <div>
        <label :for="id" class="block text-color-body text-sm mb-2">
            {{ label }}
        </label>
        <v-select 
            :id="id"
            :options="options" 
            v-model="selectedOption" 
            :placeholder="placeholder" 
            :disabled="disabled"
            @input="handleChange" 
            class="rounded-lg text-sm custom-v-select" 
            :indicator-separator="false"
            :clearable="false" 
        />
    </div>
</template>

<script lang="ts" setup>
import { ref, watch, toRefs } from 'vue';
import VSelect from 'vue3-select';
import 'vue3-select/dist/vue3-select.css';

export type OptionType = {
    value: string;
    label: string;
};

const props = defineProps<{
    options: OptionType[];
    value?: OptionType | null;
    placeholder?: string;
    label?: string;
    disabled?: boolean;
    id?: string;
    onChange: (selectedOption: OptionType | null) => void;
}>();

const { value, options, onChange } = toRefs(props);

const selectedOption = ref<OptionType | null>(value.value || null);

watch(value, (newVal) => {
    selectedOption.value = newVal ?? null;
});

watch(selectedOption, (newVal) => {
    onChange.value(newVal);
});

const handleChange = (option: OptionType | null) => {
    selectedOption.value = option;
};
</script>

<style scoped>
.custom-v-select :deep(.vs__dropdown-toggle) {
  height: 42px !important;
  color: hsl(0, 0%, 50%) !important;
  border-radius: 8px;
}

.custom-v-select :deep(.vs__dropdown-menu) {
  max-height: 200px !important;
}

.custom-v-select :deep(.vs__placeholder) {
  color: hsl(0, 0%, 50%) !important;
  opacity: 1 !important;
}

.custom-v-select :deep(.vs__search) {
    font-size: 14px;
    margin-left: 4px;
}
</style>
