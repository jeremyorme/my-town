import {newE2EPage} from '@stencil/core/testing';

describe('category-page', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<category-page></category-page>');

    const element = await page.find('category-page');
    expect(element).toHaveClass('hydrated');
  });
});
