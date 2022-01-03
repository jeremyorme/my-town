import {newSpecPage} from '@stencil/core/testing';

import {MyBusinessesPage} from '../my-businesses-page';

describe('my-businesses-page', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components : [ MyBusinessesPage ],
      html : `<my-businesses-page></my-businesses-page>`,
    });
    expect(page.root).toEqualHtml(`
      <my-businesses-page>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </my-businesses-page>
    `);
  });
});
