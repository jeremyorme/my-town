import {newSpecPage} from '@stencil/core/testing';

import {ServicesPage} from '../services-page';

describe('services-page', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components : [ ServicesPage ],
      html : `<services-page></services-page>`,
    });
    expect(page.root).toEqualHtml(`
      <services-page>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </services-page>
    `);
  });
});
