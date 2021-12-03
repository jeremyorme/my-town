import {newE2EPage} from '@stencil/core/testing';

describe('directory-page', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<directory-page></directory-page>');

    const element = await page.find('directory-page');
    expect(element).toHaveClass('hydrated');
  });
});
