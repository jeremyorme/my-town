import {newE2EPage} from '@stencil/core/testing';

describe('banner-section', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<banner-section></banner-section>');

    const element = await page.find('banner-section');
    expect(element).toHaveClass('hydrated');
  });
});
