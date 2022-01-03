import {newSpecPage} from '@stencil/core/testing';

import {HomePage} from '../home-page';

describe('home-page', () => {
  it('renders', async () => {
    const {root} = await newSpecPage({
      components : [ HomePage ],
      html : '<home-page></home-page>',
    });
    expect(root.querySelector('ion-title').textContent).toEqual('Home');
  });
});
