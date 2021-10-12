import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot {
  render() {
    return (
      <ion-app>
        <ion-router useHash={true}>
          <ion-route url="/" component="home-page"/>
          <ion-route url="/shopping" component="shopping-page"/>
          <ion-route url="/food" component="food-page"/>
          <ion-route url="/services" component="services-page"/>
          <ion-route url="/contact" component="contact-page"/>
          <ion-route url="/:businessName" component="business-page"/>
        </ion-router>
        <ion-nav/>
      </ion-app>
    );
  }
}
