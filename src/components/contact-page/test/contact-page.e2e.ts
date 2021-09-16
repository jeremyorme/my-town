import {newE2EPage} from '@stencil/core/testing';

describe('services-page', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<services-page></services-page>');

    const element = await page.find('services-page');
    expect(element).toHaveClass('hydrated');
  });
});
