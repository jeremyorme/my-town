import {newE2EPage} from '@stencil/core/testing';

describe('my-businesses-page', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<my-businesses-page></my-businesses-page>');

    const element = await page.find('my-businesses-page');
    expect(element).toHaveClass('hydrated');
  });
});
