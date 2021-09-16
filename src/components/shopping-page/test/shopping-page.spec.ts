import {newSpecPage} from '@stencil/core/testing';

import {ShoppingPage} from '../shopping-page';

describe('shopping-page', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components : [ ShoppingPage ],
      html : `<shopping-page></shopping-page>`,
    });
    expect(page.root).toEqualHtml(`
      <shopping-page>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </shopping-page>
    `);
  });
});
