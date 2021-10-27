import { newSpecPage } from '@stencil/core/testing';
import { FieldBlock } from '../field-block';

describe('field-block', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [FieldBlock],
      html: `<field-block></field-block>`,
    });
    expect(page.root).toEqualHtml(`
      <field-block>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </field-block>
    `);
  });
});
