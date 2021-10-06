import { newSpecPage } from '@stencil/core/testing';
import { MapBlock } from '../map-block';

describe('map-block', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MapBlock],
      html: `<map-block></map-block>`,
    });
    expect(page.root).toEqualHtml(`
      <map-block>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </map-block>
    `);
  });
});
