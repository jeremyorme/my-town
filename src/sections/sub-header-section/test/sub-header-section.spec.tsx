import { newSpecPage } from '@stencil/core/testing';
import { SubHeaderSection } from '../sub-header-section';

describe('sub-header-section', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SubHeaderSection],
      html: `<sub-header-section></sub-header-section>`,
    });
    expect(page.root).toEqualHtml(`
      <sub-header-section>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </sub-header-section>
    `);
  });
});
