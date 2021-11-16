import { newSpecPage } from '@stencil/core/testing';
import { TabMenuBlock } from '../tab-menu-block';

describe('tab-menu-block', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TabMenuBlock],
      html: `<tab-menu-block></tab-menu-block>`,
    });
    expect(page.root).toEqualHtml(`
      <tab-menu-block>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </tab-menu-block>
    `);
  });
});
