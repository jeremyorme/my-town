import { Component, h } from '@stencil/core';

@Component({
  tag: 'shopping-page',
  styleUrl: 'shopping-page.css',
})
export class ShoppingPage {

  render() {
    return [
      <ion-content>
        <banner-block/>
        <navbar-block>
          <nav-link-block href="../">Home</nav-link-block>
          <nav-link-block href="./" current={true}>Shopping</nav-link-block>
          <nav-link-block href="../food/">Food</nav-link-block>
          <nav-link-block href="../services/">Services</nav-link-block>
          <nav-link-block href="../contact/">Contact</nav-link-block>
        </navbar-block>
        <footer-block/>
      </ion-content>,
    ];
  }
}
