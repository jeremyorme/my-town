import {newSpecPage} from '@stencil/core/testing';

import {CategoryPage} from '../category-page';

describe('business-list-page', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components : [ CategoryPage ],
      html : `<category-page></category-page>`,
    });
    expect(page.root).toEqualHtml(`
      <category-page>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </category-page>
    `);
  });
});
