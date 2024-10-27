import { mount } from '@vue/test-utils'
import ButtonComponent from './Button.vue'
import { expect, vi } from 'vitest'

describe('ButtonComponent.vue', () => {
  it('renders the button with default properties', () => {
    const wrapper = mount(ButtonComponent)
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('applies correct classes for solid appearance', () => {
    const wrapper = mount(ButtonComponent, {
      props: {
        appearance: 'solid',
      },
    })
    expect(wrapper.find('button').classes()).toContain('text-white')
    expect(wrapper.find('button').classes()).toContain('bg-color-secondary')
  })

  it('applies correct classes for outline appearance', () => {
    const wrapper = mount(ButtonComponent, {
      props: {
        appearance: 'outline',
      },
    })
    expect(wrapper.find('button').classes()).toContain('text-color-secondary')
    expect(wrapper.find('button').classes()).toContain('bg-white')
  })

  it('disables the button when disabled is true', () => {
    const wrapper = mount(ButtonComponent, {
      props: {
        disabled: true,
        appearance: 'solid',
      },
    });
    console.log(wrapper.find('button').classes());
    expect(wrapper.find('button').attributes('disabled')).toBeDefined();
    expect(wrapper.find('button').classes()).toContain('cursor-not-allowed');
  });

  it('disables the button when loading is true', () => {
    const wrapper = mount(ButtonComponent, {
      props: {
        loading: true,
      },
    })
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
    expect(wrapper.find('button').classes()).toContain('cursor-not-allowed')
  })

  it('renders an icon when hasIcon is true', () => {
    const wrapper = mount(ButtonComponent, {
      props: {
        hasIcon: true,
        icon: 'icon-url',
      },
    })
    expect(wrapper.find('img').exists()).toBe(true)
    expect(wrapper.find('img').attributes('src')).toBe('icon-url')
  })

  it('does not trigger onClick when disabled is true', async () => {
    const onClick = vi.fn()
    const wrapper = mount(ButtonComponent, {
      props: {
        onClick,
        disabled: true,
      },
    })
    await wrapper.find('button').trigger('click')
    expect(onClick).not.toHaveBeenCalled()
  })

  it('does not trigger onClick when loading is true', async () => {
    const onClick = vi.fn()
    const wrapper = mount(ButtonComponent, {
      props: {
        onClick,
        loading: true,
      },
    })
    await wrapper.find('button').trigger('click')
    expect(onClick).not.toHaveBeenCalled()
  })

  it('triggers onClick when button is enabled and not loading', async () => {
    const onClick = vi.fn()
    const wrapper = mount(ButtonComponent, {
      props: {
        onClick,
      },
    })
    await wrapper.find('button').trigger('click')
    expect(onClick).toHaveBeenCalled()
  })
})