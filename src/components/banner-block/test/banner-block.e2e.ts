import {newE2EPage} from '@stencil/core/testing';

describe('banner-block', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<banner-block></banner-block>');

    const element = await page.find('banner-block');
    expect(element).toHaveClass('hydrated');
  });
});
