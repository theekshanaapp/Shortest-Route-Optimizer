import { mount } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import ShortestPathOptimizer from './ShortestPathOptimizer.vue';
import ResultCard from './ResultCard/ResultCard.vue';

// Mock the API call
vi.mock('../utils/SendShortestPathData', () => ({
  __esModule: true,
  default: vi.fn(() => Promise.resolve({
    data: {
      parsedBody: {
        nodeNames: ['A', 'B'],
        distance: 10,
      },
    },
  })),
}));

describe('ShortestPathOptimizer.vue', () => {
  it('renders the main card structure', () => {
    const wrapper = mount(ShortestPathOptimizer);
    expect(wrapper.find('.card').exists()).toBe(true);
  });

  it('renders ResultCard when calculation is successful', async () => {
    const wrapper = mount(ShortestPathOptimizer);

    // Simulate user selecting 'From' and 'To' nodes
    await wrapper.vm.handleFromChange({ value: 'A', label: 'A' });
    await wrapper.vm.handleToChange({ value: 'B', label: 'B' });

    // Trigger calculation
    await wrapper.vm.calculateHandler();

    // Wait for the component to reactively update
    await wrapper.vm.$nextTick();

    const resultCard = wrapper.findComponent(ResultCard);
    expect(resultCard.exists()).toBe(true);
    
    // Assert that ResultCard receives the correct props
    expect(resultCard.props('nodeNames')).toEqual(['A', 'B']);
    expect(resultCard.props('distance')).toBe(10);
  });
});
