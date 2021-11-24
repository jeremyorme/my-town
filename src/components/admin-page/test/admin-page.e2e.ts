import {newE2EPage} from '@stencil/core/testing';

describe('admin-page', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<admin-page></admin-page>');

    const element = await page.find('admin-page');
    expect(element).toHaveClass('hydrated');
  });
});
