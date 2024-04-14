import type { ComponentWrapperType } from '@/types';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseFooter from '@/components/layouts/partials/BaseFooter/BaseFooter.vue';

describe('BaseFooter', () => {
  let wrapper: ComponentWrapperType<typeof BaseFooter>;

  const createComponent = () => {
    wrapper = mount(BaseFooter, {});
  };

  beforeEach(() => {
    createComponent();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should contain correct links', () => {
    expect(wrapper.html()).toContain('https://github.com/begprod');
    expect(wrapper.html()).toContain(
      'https://github.com/begprod/budget.it#install-application-on-your-device',
    );
  });
});
