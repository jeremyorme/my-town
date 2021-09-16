import {newE2EPage} from '@stencil/core/testing';

describe('header-block', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<header-block></header-block>');

    const element = await page.find('header-block');
    expect(element).toHaveClass('hydrated');
  });
});
