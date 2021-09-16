import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-food',
  styleUrl: 'app-food.css',
})
export class AppFood {

  render() {
    return [
      <ion-content>
        <app-banner/>
        <app-navbar>
          <app-nav-link href="../">Home</app-nav-link>
          <app-nav-link href="../shopping/">Shopping</app-nav-link>
          <app-nav-link href="./" current={true}>Food</app-nav-link>
          <app-nav-link href="../services/">Services</app-nav-link>
          <app-nav-link href="../contact/">Contact</app-nav-link>
        </app-navbar>
        <app-footer/>
      </ion-content>,
    ];
  }
}
