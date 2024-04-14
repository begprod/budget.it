// @ts-ignore
import { version } from '../../../../../package.json';
import type { ComponentWrapperType } from '@/types';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseHeader from '@/components/layouts/partials/BaseHeader/BaseHeader.vue';

describe('BaseHeader', () => {
  let wrapper: ComponentWrapperType<typeof BaseHeader>;

  const createComponent = () => {
    wrapper = mount(BaseHeader);
  };

  beforeEach(() => {
    createComponent();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should contain version from package.json', () => {
    expect(wrapper.html()).toContain(`v${version}`);
  });
});
