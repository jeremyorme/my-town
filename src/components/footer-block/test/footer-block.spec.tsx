import { newSpecPage } from '@stencil/core/testing';
import { FooterBlock } from '../footer-block';

describe('footer-block', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [FooterBlock],
      html: `<footer-block></footer-block>`,
    });
    expect(page.root).toEqualHtml(`
      <footer-block>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </footer-block>
    `);
  });
});
