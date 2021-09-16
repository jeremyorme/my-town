import {newE2EPage} from '@stencil/core/testing';

describe('navbar-block', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<navbar-block></navbar-block>');

    const element = await page.find('navbar-block');
    expect(element).toHaveClass('hydrated');
  });
});
