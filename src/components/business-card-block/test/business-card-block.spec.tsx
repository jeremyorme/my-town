import { newSpecPage } from '@stencil/core/testing';
import { BusinessCardBlock } from '../business-card-block';

describe('business-card-block', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BusinessCardBlock],
      html: `<business-card-block></business-card-block>`,
    });
    expect(page.root).toEqualHtml(`
      <business-card-block>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </business-card-block>
    `);
  });
});
