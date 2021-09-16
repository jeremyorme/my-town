import {newE2EPage} from '@stencil/core/testing';

describe('app-shopping', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-shopping></app-shopping>');

    const element = await page.find('app-shopping');
    expect(element).toHaveClass('hydrated');
  });

  it('displays the specified name', async () => {
    const page = await newE2EPage({url : '/shopping/joseph'});

    const element = await page.find('app-shopping ion-content p');
    expect(element.textContent).toContain('My name is Joseph.');
  });
});
