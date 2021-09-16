import {newSpecPage} from '@stencil/core/testing';

import {FoodPage} from '../food-page';

describe('food-page', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components : [ FoodPage ],
      html : `<food-page></food-page>`,
    });
    expect(page.root).toEqualHtml(`
      <food-page>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </food-page>
    `);
  });
});
