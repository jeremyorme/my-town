import { newE2EPage } from '@stencil/core/testing';

describe('content-block', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<content-block></content-block>');

    const element = await page.find('content-block');
    expect(element).toHaveClass('hydrated');
  });
});
