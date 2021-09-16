import { newSpecPage } from '@stencil/core/testing';
import { NavbarBlock } from '../navbar-block';

describe('navbar-block', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [NavbarBlock],
      html: `<navbar-block></navbar-block>`,
    });
    expect(page.root).toEqualHtml(`
      <navbar-block>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </navbar-block>
    `);
  });
});
