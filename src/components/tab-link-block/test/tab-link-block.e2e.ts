import { newE2EPage } from '@stencil/core/testing';

describe('tab-link-block', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<tab-link-block></tab-link-block>');

    const element = await page.find('tab-link-block');
    expect(element).toHaveClass('hydrated');
  });
});
