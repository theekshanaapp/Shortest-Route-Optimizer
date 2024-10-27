<template>
    <button
      :class="buttonClass"
      :disabled="disabled || loading"
      @click="handleClick"
      :type="type"
    >
      <span v-if="hasIcon" class="mr-2">
        <img :src="icon" alt="Icon" />
      </span>
      <slot />
    </button>
</template>
  
<script lang="ts" setup>
import { computed } from 'vue';
  
const props = defineProps<{
    appearance?: 'solid' | 'outline';
    disabled?: boolean;
    loading?: boolean;
    onClick?: () => void;
    className?: string;
    hasIcon?: boolean;
    type?: 'button' | 'submit' | 'reset';
    icon?: string;
}>();
  
const buttonClass = computed(() => {
    return [
      'flex items-center justify-center rounded-[8px] border border-color-secondary px-4 py-3 tex-md',
      {
        'text-white bg-color-secondary hover:bg-color-secondary':
          props.appearance === 'solid' && !props.disabled,
        'text-color-secondary bg-white border-color-secondary border-1  border-solid hover:bg-indigo-50':
          props.appearance === 'outline' && !props.disabled,
        'text-white bg-color-secondary cursor-not-allowed opacity-80':
          (props.appearance === 'solid' && props.disabled) || props.loading,
        'text-color-secondary cursor-not-allowed opacity-80':
          (props.appearance === 'outline' && props.disabled) || props.loading,
      },
      props.className,
    ];
});
  
const handleClick = () => {
    if (!props.disabled && !props.loading && props.onClick) {
      props.onClick();
    }
};
</script>
  
<style scoped>
</style>  