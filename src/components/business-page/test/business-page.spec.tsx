import { newSpecPage } from '@stencil/core/testing';
import { BusinessPage } from '../business-page';

describe('business-page', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BusinessPage],
      html: `<business-page></business-page>`,
    });
    expect(page.root).toEqualHtml(`
      <business-page>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </business-page>
    `);
  });
});
