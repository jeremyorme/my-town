import {newE2EPage} from '@stencil/core/testing';

describe('shopping-page', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<shopping-page></shopping-page>');

    const element = await page.find('shopping-page');
    expect(element).toHaveClass('hydrated');
  });
});
