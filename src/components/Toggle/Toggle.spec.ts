import { mount } from '@vue/test-utils';
import Toggle from './Toggle.vue';
import { expect } from 'vitest';

describe('Toggle.vue', () => {
  it('renders with default props', () => {
    const wrapper = mount(Toggle);
    expect(wrapper.find('span').text()).toBe('');
    expect((wrapper.find('input[type="checkbox"]').element as HTMLInputElement).checked).toBe(false);
  });

  it('renders the label when passed', () => {
    const label = 'Toggle Label';
    const wrapper = mount(Toggle, {
      props: { label }
    });
    expect(wrapper.find('span').text()).toBe(label);
  });

  it('emits update:checked when checkbox is toggled', async () => {
    const wrapper = mount(Toggle, {
      props: { modelValue: false }
    });

    const checkbox = wrapper.find('input[type="checkbox"]');

    // Check the checkbox
    await checkbox.setValue(true);
    expect(wrapper.emitted()['update:checked'][0]).toEqual([true]);

    // Uncheck the checkbox
    await checkbox.setValue(false);
    expect(wrapper.emitted()['update:checked'][1]).toEqual([false]);
  });

  it('emits refreshClick when refresh button is clicked', async () => {
    const wrapper = mount(Toggle, {
      props: { modelValue: true, hasRefreshIcon: true }
    });
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted()['refreshClick']).toBeTruthy();
  });

  it('does not render refresh button if modelValue is false', () => {
    const wrapper = mount(Toggle, {
      props: { modelValue: false, hasRefreshIcon: true }
    });
    expect(wrapper.find('button').exists()).toBe(false);
  });

  it('does not render refresh button if hasRefreshIcon is false', () => {
    const wrapper = mount(Toggle, {
      props: { modelValue: true, hasRefreshIcon: false }
    });
    expect(wrapper.find('button').exists()).toBe(false);
  });
});
