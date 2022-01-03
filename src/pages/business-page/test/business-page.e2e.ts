import { newE2EPage } from '@stencil/core/testing';

describe('business-page', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<business-page></business-page>');

    const element = await page.find('business-page');
    expect(element).toHaveClass('hydrated');
  });
});
