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
        <app-header imageSrc="assets/img/farnborough-main.jpeg">
          <h1>Shop local. Help <strong>Farnborough</strong> thrive!</h1>
          <p>The high-street is the beating heart of our local community and vibrant small business underpins our freedom and democracy. Support our local businesses for a stronger community and brighter future.</p>
          <ion-button href="shopping/" strong={true}>Find a Shop</ion-button>
        </app-header>
      </ion-content>,
    ];
  }
}
