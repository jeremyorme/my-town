import {newSpecPage} from '@stencil/core/testing';

import {AdminPage} from '../admin-page';

describe('admin-page', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components : [ AdminPage ],
      html : `<admin-page></admin-page>`,
    });
    expect(page.root).toEqualHtml(`
      <admin-page>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </admin-page>
    `);
  });
});
