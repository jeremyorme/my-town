import { newE2EPage } from '@stencil/core/testing';

describe('sub-header-block', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<sub-header-block></sub-header-block>');

    const element = await page.find('sub-header-block');
    expect(element).toHaveClass('hydrated');
  });
});
