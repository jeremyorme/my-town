import { newSpecPage } from '@stencil/core/testing';
import { BannerBlock } from '../banner-block';

describe('banner-block', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BannerBlock],
      html: `<banner-block></banner-block>`,
    });
    expect(page.root).toEqualHtml(`
      <banner-block>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </banner-block>
    `);
  });
});
