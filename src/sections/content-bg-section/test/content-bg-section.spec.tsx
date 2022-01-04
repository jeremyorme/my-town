import { newSpecPage } from '@stencil/core/testing';
import { ContentBgSection } from '../content-bg-section';

describe('content-bg-section', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ContentBgSection],
      html: `<content-bg-section></content-bg-section>`,
    });
    expect(page.root).toEqualHtml(`
      <content-bg-section>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </content-bg-section>
    `);
  });
});
