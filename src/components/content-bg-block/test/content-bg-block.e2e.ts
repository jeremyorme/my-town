import {newE2EPage} from '@stencil/core/testing';

describe('content-bg-block', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<content-bg-block></content-bg-block>');

    const element = await page.find('content-bg-block');
    expect(element).toHaveClass('hydrated');
  });
});
