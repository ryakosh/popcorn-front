import { shallowMount } from '@vue/test-utils';
import Button from '../Button.vue';

describe('Button component', () => {
  it('emits "on-click" when clicked', () => {
    const w = shallowMount(Button, {
      propsData: {
        text: 'button',
      },
    });
    w.find('.button').trigger('click');
    expect(w.emitted()['on-click']).toBeTruthy();
  });
});