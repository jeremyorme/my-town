import { newE2EPage } from '@stencil/core/testing';

describe('field-block', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<field-block></field-block>');

    const element = await page.find('field-block');
    expect(element).toHaveClass('hydrated');
  });
});
