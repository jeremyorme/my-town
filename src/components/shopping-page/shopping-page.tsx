import { Component, Prop, h } from '@stencil/core';
import { BusinessDb } from '../../helpers/business-db';

@Component({
  tag: 'shopping-page',
  styleUrl: 'shopping-page.css',
})
export class ShoppingPage {
  @Prop() db: BusinessDb;

  render() {
    return [
      <ion-content>
        <banner-block/>
        <navbar-block>
          <nav-link-block href="#/">Home</nav-link-block>
          <nav-link-block href="#/shopping/" current={true}>Shopping</nav-link-block>
          <nav-link-block href="#/food/">Food</nav-link-block>
          <nav-link-block href="#/services/">Services</nav-link-block>
          <nav-link-block href="#/contact/">Contact</nav-link-block>
        </navbar-block>
        <sub-header-block>
          <h1><strong>Excellent</strong> quality products from <strong>local</strong> retailers</h1>
        </sub-header-block>
        <content-block>
          <div class="menu-item">
            <business-card-block name="Whetstone Convenience Store" description="Great little convenience store with all the essentials you could need" icon="cart-outline" href="#/shopping/whetstone-convenience-store"/>
          </div>
        </content-block>
        <footer-block/>
      </ion-content>,
    ];
  }
}
