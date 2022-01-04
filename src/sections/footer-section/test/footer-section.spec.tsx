import { newSpecPage } from '@stencil/core/testing';
import { FooterSection } from '../footer-section';

describe('footer-section', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [FooterSection],
      html: `<footer-section></footer-section>`,
    });
    expect(page.root).toEqualHtml(`
      <footer-section>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </footer-section>
    `);
  });
});
