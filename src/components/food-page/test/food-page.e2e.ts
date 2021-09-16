import {newE2EPage} from '@stencil/core/testing';

describe('food-page', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<food-page></food-page>');

    const element = await page.find('food-page');
    expect(element).toHaveClass('hydrated');
  });
});
