import { mount } from '@vue/test-utils';
import Select from './Select.vue';
import { expect, vi } from 'vitest';
import VSelect from 'vue3-select';

vi.mock('vue3-select', () => ({
  default: {
    name: 'VSelect',
    props: ['id', 'options', 'modelValue', 'placeholder', 'disabled'],
    template: '<div :id="id" :disabled="disabled"><slot /></div>'
  }
}));

describe('Select.vue', () => {
  it('renders the dropdown with the given label', () => {
    const wrapper = mount(Select, {
      props: {
        label: 'Test Label',
        options: [{ value: '1', label: 'Option 1' }],
        onChange: () => {},
      },
    });
    expect(wrapper.find('label').text()).toBe('Test Label');
  });

  it('disables the dropdown when disabled prop is true', () => {
    const wrapper = mount(Select, {
      props: {
        disabled: true,
        options: [{ value: '1', label: 'Option 1' }],
        onChange: () => {},
      },
    });
    expect(wrapper.findComponent({ name: 'VSelect' }).attributes('disabled')).toBe('true');
  });

  it('renders the dropdown options correctly', () => {
    const options = [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
    ];
    const wrapper = mount(Select, {
      props: {
        options,
        onChange: () => {},
      },
    });
    expect(wrapper.findComponent({ name: 'VSelect' }).props('options')).toEqual(options);
  });

  it('binds the placeholder text correctly', () => {
    const placeholderText = 'Select an option';
    const wrapper = mount(Select, {
      props: {
        placeholder: placeholderText,
        options: [{ value: '1', label: 'Option 1' }],
        onChange: () => {},
      },
    });
    expect(wrapper.findComponent({ name: 'VSelect' }).props('placeholder')).toBe(placeholderText);
  });

  it('calls onChange prop when selection changes', async () => {
    const onChange = vi.fn();
    const wrapper = mount(Select, {
      props: {
        options: [{ value: '1', label: 'Option 1' }],
        onChange,
      },
    });
    await wrapper.findComponent({ name: 'VSelect' }).vm.$emit('input', { value: '1', label: 'Option 1' });
    expect(onChange).toHaveBeenCalledWith({ value: '1', label: 'Option 1' });
  });

  it('reflects the selected value from v-model', () => {
    const wrapper = mount(Select, {
      props: {
        value: { value: '1', label: 'Option 1' },
        options: [{ value: '1', label: 'Option 1' }, { value: '2', label: 'Option 2' }],
        onChange: () => {},
      },
    });
    expect(wrapper.findComponent({ name: 'VSelect' }).props('modelValue')).toEqual({ value: '1', label: 'Option 1' });
  });

  it('renders with a default id attribute if provided', () => {
    const wrapper = mount(Select, {
      props: {
        id: 'dropdown-id',
        options: [{ value: '1', label: 'Option 1' }],
        onChange: () => {},
      },
    });
    expect(wrapper.find('label').attributes('for')).toBe('dropdown-id');
    expect(wrapper.findComponent({ name: 'VSelect' }).attributes('id')).toBe('dropdown-id');
  });
});
