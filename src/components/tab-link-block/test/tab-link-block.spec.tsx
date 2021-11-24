import { newSpecPage } from '@stencil/core/testing';
import { TabLinkBlock } from '../tab-link-block';

describe('tab-link-block', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TabLinkBlock],
      html: `<tab-link-block></tab-link-block>`,
    });
    expect(page.root).toEqualHtml(`
      <tab-link-block>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </tab-link-block>
    `);
  });
});
