import { newE2EPage } from '@stencil/core/testing';

describe('app-banner', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-banner></app-banner>');

    const element = await page.find('app-banner');
    expect(element).toHaveClass('hydrated');
  });
});
