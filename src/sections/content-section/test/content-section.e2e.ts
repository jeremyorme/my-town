import { newE2EPage } from '@stencil/core/testing';

describe('content-section', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<content-section></content-section>');

    const element = await page.find('content-section');
    expect(element).toHaveClass('hydrated');
  });
});
