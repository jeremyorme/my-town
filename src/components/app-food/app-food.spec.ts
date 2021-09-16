import {newSpecPage} from '@stencil/core/testing';

import {AppFood} from './app-food';

describe('app-food', () => {
  describe('normalization', () => {
    it('returns a blank string if the name is undefined', async () => {
      const {rootInstance} = await newSpecPage({
        components : [ AppShopping ],
        html : '<app-food></app-food>',
      });
      expect(rootInstance.formattedName()).toEqual('');
    });
  });
});
