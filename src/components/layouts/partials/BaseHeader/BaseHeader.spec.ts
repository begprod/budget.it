// @ts-ignore
import { name, version } from '../../../../../package.json';
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

  it('should contain app name', () => {
    const nameEl = wrapper.find('[data-test-id="name"]');

    expect(nameEl.text()).toContain(name);
  });

  it('should contain version from package.json', () => {
    const versionEl = wrapper.find('[data-test-id="version"]');

    expect(versionEl.text()).toContain(`v${version}`);
  });

  it('should contain github link and icon', () => {
    const linkEl = wrapper.find('[data-test-id="github-link"]');
    const svgEl = linkEl.find('svg');

    expect(linkEl.exists()).toBe(true);
    expect(linkEl.attributes().href).toContain('https://github.com/begprod/budget.it');
    expect(svgEl.exists()).toBe(true);
  });
});
