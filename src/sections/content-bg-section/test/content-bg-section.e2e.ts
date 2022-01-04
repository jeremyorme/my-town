import {newE2EPage} from '@stencil/core/testing';

describe('content-bg-section', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<content-bg-section></content-bg-section>');

    const element = await page.find('content-bg-section');
    expect(element).toHaveClass('hydrated');
  });
});
