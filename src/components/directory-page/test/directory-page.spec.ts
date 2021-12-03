import {newSpecPage} from '@stencil/core/testing';

import {DirectoryPage} from '../directory-page';

describe('directory-page', () => {
  it('renders', async () => {
    const {root} = await newSpecPage({
      components : [ DirectoryPage ],
      html : '<directory-page></directory-page>',
    });
    expect(root.querySelector('ion-title').textContent).toEqual('Home');
  });
});
