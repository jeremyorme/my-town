import {newSpecPage} from '@stencil/core/testing';

import {AppShopping} from './app-shopping';

describe('app-shopping', () => {
  describe('normalization', () => {
    it('returns a blank string if the name is undefined', async () => {
      const {rootInstance} = await newSpecPage({
        components : [ AppShopping ],
        html : '<app-shopping></app-shopping>',
      });
      expect(rootInstance.formattedName()).toEqual('');
    });
  });
});
