import { newSpecPage } from '@stencil/core/testing';
import { AppNavLink } from '../app-nav-link';

describe('app-nav-link', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppNavLink],
      html: `<app-nav-link></app-nav-link>`,
    });
    expect(page.root).toEqualHtml(`
      <app-nav-link>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-nav-link>
    `);
  });
});
