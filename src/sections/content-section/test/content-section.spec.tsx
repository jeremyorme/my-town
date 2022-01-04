import { newSpecPage } from '@stencil/core/testing';
import { ContentSection } from '../content-section';

describe('content-section', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ContentSection],
      html: `<content-section></content-section>`,
    });
    expect(page.root).toEqualHtml(`
      <content-section>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </content-section>
    `);
  });
});
