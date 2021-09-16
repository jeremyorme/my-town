import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot {
  render() {
    return (
      <ion-app>
        <ion-router useHash={false}>
          <ion-route url="/" component="home-page" />
          <ion-route url="/shopping" component="shopping-page" />
          <ion-route url="/food" component="food-page" />
        </ion-router>
        <ion-nav />
      </ion-app>
    );
  }
}
