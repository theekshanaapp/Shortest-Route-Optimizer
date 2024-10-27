import { mount } from '@vue/test-utils';
import Loader from './Loader.vue';
import { expect } from 'vitest';

describe('Loader.vue', () => {
  it('renders the loader component', () => {
    const wrapper = mount(Loader);
    expect(wrapper.exists()).toBe(true);
  });

  it('contains a loader circle', () => {
    const wrapper = mount(Loader);
    const loaderCircle = wrapper.find('.loader-circle');
    expect(loaderCircle.exists()).toBe(true);
  });

  it('applies the correct classes to the loader circle', () => {
    const wrapper = mount(Loader);
    const loaderCircle = wrapper.find('.loader-circle');
    
    expect(loaderCircle.classes()).toContain('animate-spin');
    expect(loaderCircle.classes()).toContain('rounded-full');
    expect(loaderCircle.classes()).toContain('border-t-4');
    expect(loaderCircle.classes()).toContain('border-b-4');
    expect(loaderCircle.classes()).toContain('border-blue-600');
    expect(loaderCircle.classes()).toContain('h-10');
    expect(loaderCircle.classes()).toContain('w-10');
  });
});
