import { newE2EPage } from '@stencil/core/testing';

describe('map-block', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<map-block></map-block>');

    const element = await page.find('map-block');
    expect(element).toHaveClass('hydrated');
  });
});
