import { newSpecPage } from '@stencil/core/testing';
import { HeaderBlock } from '../header-block';

describe('header-block', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [HeaderBlock],
      html: `<header-block></header-block>`,
    });
    expect(page.root).toEqualHtml(`
      <header-block>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </header-block>
    `);
  });
});
