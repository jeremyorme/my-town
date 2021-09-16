import { newSpecPage } from '@stencil/core/testing';
import { SubHeaderBlock } from '../sub-header-block';

describe('sub-header-block', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SubHeaderBlock],
      html: `<sub-header-block></sub-header-block>`,
    });
    expect(page.root).toEqualHtml(`
      <sub-header-block>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </sub-header-block>
    `);
  });
});
