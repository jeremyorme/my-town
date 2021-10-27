import { Component, h } from '@stencil/core';
import { MainDb } from '../../helpers/main-db';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot {

  db: MainDb = new MainDb((window as any).myTownDbAddress);

  async componentWillLoad() {
    return this.db.init((window as any).Ipfs, (window as any).OrbitDB);
  }

  render() {
    return (
      <ion-app>
        <ion-router useHash={true}>
          <ion-route url="/" component="home-page" componentProps={{db: this.db}}/>
          <ion-route url="/shopping" component="shopping-page" componentProps={{db: this.db}}/>
          <ion-route url="/shopping/:slug" component="business-page" componentProps={{db: this.db}}/>
          <ion-route url="/food" component="food-page" componentProps={{db: this.db}}/>
          <ion-route url="/services" component="services-page" componentProps={{db: this.db}}/>
          <ion-route url="/contact" component="contact-page"/>
        </ion-router>
        <ion-nav/>
      </ion-app>
    );
  }
}
