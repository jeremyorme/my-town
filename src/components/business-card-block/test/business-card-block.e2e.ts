import { newE2EPage } from '@stencil/core/testing';

describe('business-card-block', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<business-card-block></business-card-block>');

    const element = await page.find('business-card-block');
    expect(element).toHaveClass('hydrated');
  });
});
