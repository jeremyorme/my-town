import {newE2EPage} from '@stencil/core/testing';

describe('footer-block', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<footer-block></footer-block>');

    const element = await page.find('footer-block');
    expect(element).toHaveClass('hydrated');
  });
});
