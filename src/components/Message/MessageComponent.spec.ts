import { mount } from '@vue/test-utils';
import Message from './Message.vue';

describe('Message.vue', () => {
  it('renders the error message correctly', () => {
    const wrapper = mount(Message, {
      props: {
        label: 'This is an error message.',
        status: 'error',
      },
    });
    
    expect(wrapper.text()).toContain('This is an error message.');

    expect(wrapper.classes()).toContain('bg-red-50');
    expect(wrapper.classes()).toContain('border-red-200');
    expect(wrapper.classes()).toContain('text-red-800');
  });

  it('renders the success message correctly', () => {
    const wrapper = mount(Message, {
      props: {
        label: 'This is a success message.',
        status: 'success',
      },
    });
    
    expect(wrapper.text()).toContain('This is a success message.');

    expect(wrapper.classes()).toContain('bg-green-50');
    expect(wrapper.classes()).toContain('border-green-200');
    expect(wrapper.classes()).toContain('text-green-800');
  });

  it('renders without status and shows label only', () => {
    const wrapper = mount(Message, {
      props: {
        label: 'No status provided.',
      },
    });
    
    expect(wrapper.text()).toContain('No status provided.');

    expect(wrapper.classes()).not.toContain('bg-red-50');
    expect(wrapper.classes()).not.toContain('bg-green-50');
  });
});
