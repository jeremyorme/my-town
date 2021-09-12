import { newE2EPage } from '@stencil/core/testing';

describe('app-nav-link', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-nav-link></app-nav-link>');

    const element = await page.find('app-nav-link');
    expect(element).toHaveClass('hydrated');
  });
});
