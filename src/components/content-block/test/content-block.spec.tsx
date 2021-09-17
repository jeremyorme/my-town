import { newSpecPage } from '@stencil/core/testing';
import { ContentBlock } from '../content-block';

describe('content-block', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ContentBlock],
      html: `<content-block></content-block>`,
    });
    expect(page.root).toEqualHtml(`
      <content-block>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </content-block>
    `);
  });
});
