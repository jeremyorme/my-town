import {newE2EPage} from '@stencil/core/testing';

describe('nav-link-block', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<nav-link-block></nav-link-block>');

    const element = await page.find('nav-link-block');
    expect(element).toHaveClass('hydrated');
  });
});
