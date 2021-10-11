import { newSpecPage } from '@stencil/core/testing';
import { ContentBgBlock } from '../content-bg-block';

describe('content-bg-block', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ContentBgBlock],
      html: `<content-bg-block></content-bg-block>`,
    });
    expect(page.root).toEqualHtml(`
      <content-bg-block>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </content-bg-block>
    `);
  });
});
