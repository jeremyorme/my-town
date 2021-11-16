import { newE2EPage } from '@stencil/core/testing';

describe('tab-menu-block', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<tab-menu-block></tab-menu-block>');

    const element = await page.find('tab-menu-block');
    expect(element).toHaveClass('hydrated');
  });
});
