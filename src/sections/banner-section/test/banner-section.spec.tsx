import { newSpecPage } from '@stencil/core/testing';
import { BannerSection } from '../banner-section';

describe('banner-section', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BannerSection],
      html: `<banner-section></banner-section>`,
    });
    expect(page.root).toEqualHtml(`
      <banner-section>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </banner-section>
    `);
  });
});
