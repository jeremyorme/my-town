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

    it('capitalizes the first letter', async () => {
      const {rootInstance} = await newSpecPage({
        components : [ AppShopping ],
        html : '<app-shopping name="quincy"></app-shopping>',
      });
      expect(rootInstance.formattedName()).toEqual('Quincy');
    });

    it('lower-cases the following letters', async () => {
      const {rootInstance} = await newSpecPage({
        components : [ AppShopping ],
        html : '<app-shopping name="JOSEPH"></app-shopping>',
      });
      expect(rootInstance.formattedName()).toEqual('Joseph');
    });

    it('handles single letter names', async () => {
      const {rootInstance} = await newSpecPage({
        components : [ AppShopping ],
        html : '<app-shopping name="Q"></app-shopping>',
      });
      expect(rootInstance.formattedName()).toEqual('Q');
    });
  });
});
