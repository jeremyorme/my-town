import { Component, h } from '@stencil/core';

@Component({
  tag: 'food-page',
  styleUrl: 'food-page.css',
})
export class FoodPage {

  render() {
    return [
      <ion-content>
        <banner-block/>
        <navbar-block>
          <nav-link-block href="../">Home</nav-link-block>
          <nav-link-block href="../shopping/">Shopping</nav-link-block>
          <nav-link-block href="./" current={true}>Food</nav-link-block>
          <nav-link-block href="../services/">Services</nav-link-block>
          <nav-link-block href="../contact/">Contact</nav-link-block>
        </navbar-block>
        <sub-header-block>
          <h1>Locally made food to <strong>eat in</strong> or <strong>take away</strong></h1>
        </sub-header-block>
        <content-block>
        </content-block>
        <footer-block/>
      </ion-content>,
    ];
  }
}
