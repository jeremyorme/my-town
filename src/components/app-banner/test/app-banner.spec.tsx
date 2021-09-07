import { newSpecPage } from '@stencil/core/testing';
import { AppBanner } from '../app-banner';

describe('app-banner', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppBanner],
      html: `<app-banner></app-banner>`,
    });
    expect(page.root).toEqualHtml(`
      <app-banner>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-banner>
    `);
  });
});
