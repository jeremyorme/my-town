import { newSpecPage } from '@stencil/core/testing';
import { NavLinkBlock } from '../nav-link-block';

describe('nav-link-block', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [NavLinkBlock],
      html: `<nav-link-block></nav-link-block>`,
    });
    expect(page.root).toEqualHtml(`
      <nav-link-block>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </nav-link-block>
    `);
  });
});
