import {newE2EPage} from '@stencil/core/testing';

describe('header-section', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<header-section></header-section>');

    const element = await page.find('header-section');
    expect(element).toHaveClass('hydrated');
  });
});
