import {newSpecPage} from '@stencil/core/testing';

import {ContactPage} from '../contact-page';

describe('contact-page', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components : [ ContactPage ],
      html : `<contact-page></contact-page>`,
    });
    expect(page.root).toEqualHtml(`
      <contact-page>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </contact-page>
    `);
  });
});
