import { newSpecPage } from '@stencil/core/testing';
import { HeaderSection } from '../header-section';

describe('header-section', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [HeaderSection],
      html: `<header-section></header-section>`,
    });
    expect(page.root).toEqualHtml(`
      <header-section>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </header-section>
    `);
  });
});
