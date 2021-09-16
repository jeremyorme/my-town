import {newE2EPage} from '@stencil/core/testing';

describe('app-food', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-food></app-food>');

    const element = await page.find('app-food');
    expect(element).toHaveClass('hydrated');
  });
});
