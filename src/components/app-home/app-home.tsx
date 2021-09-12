import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
})
export class AppHome {
  render() {
    return [
      <ion-content>
        <app-banner/>
        <app-navbar>
          <app-nav-link href="./" current={true}>Home</app-nav-link>
          <app-nav-link href="shopping/">Shopping</app-nav-link>
          <app-nav-link href="food/">Food</app-nav-link>
          <app-nav-link href="services/">Services</app-nav-link>
          <app-nav-link href="contact/">Contact</app-nav-link>
        </app-navbar>
        <p>
          Welcome to the PWA Toolkit. You can use this starter to build entire apps with web components using Stencil and ionic/core! Check out the README for everything that comes
          in this starter out of the box and check out our docs on <a href="https://stenciljs.com">stenciljs.com</a> to get started.
        </p>

        <ion-button href="/profile/ionic" expand="block">
          Profile page
        </ion-button>
      </ion-content>,
    ];
  }
}
