import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-shopping',
  styleUrl: 'app-shopping.css',
})
export class AppShopping {

  render() {
    return [
      <ion-content>
        <app-banner/>
        <app-navbar>
          <app-nav-link href="../">Home</app-nav-link>
          <app-nav-link href="./" current={true}>Shopping</app-nav-link>
          <app-nav-link href="../food/">Food</app-nav-link>
          <app-nav-link href="../services/">Services</app-nav-link>
          <app-nav-link href="../contact/">Contact</app-nav-link>
        </app-navbar>
        <app-footer/>
      </ion-content>,
    ];
  }
}
