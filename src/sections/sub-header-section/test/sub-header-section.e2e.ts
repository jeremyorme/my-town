import { newE2EPage } from '@stencil/core/testing';

describe('sub-header-section', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<sub-header-section></sub-header-section>');

    const element = await page.find('sub-header-section');
    expect(element).toHaveClass('hydrated');
  });
});
