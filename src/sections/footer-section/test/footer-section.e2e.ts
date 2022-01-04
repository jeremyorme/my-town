import {newE2EPage} from '@stencil/core/testing';

describe('footer-section', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<footer-section></footer-section>');

    const element = await page.find('footer-section');
    expect(element).toHaveClass('hydrated');
  });
});
