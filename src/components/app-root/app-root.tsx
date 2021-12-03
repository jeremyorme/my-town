import { Component, h } from '@stencil/core';
import { MainDb } from '../../helpers/main-db';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot {

  db: MainDb = new MainDb((window as any).Ipfs, (window as any).OrbitDB, localStorage.getItem('my-town-id'));

  render() {
    return (
      <ion-app>
        <ion-router useHash={true}>
          <ion-route url="/directory/:directoryId/" component="home-page" componentProps={{db: this.db}}/>
          <ion-route url="/directory/:directoryId/shopping" component="category-page" componentProps={{db: this.db, category: 'shopping'}}/>
          <ion-route url="/directory/:directoryId/shopping/:slug" component="business-page" componentProps={{db: this.db, category: 'shopping'}}/>
          <ion-route url="/directory/:directoryId/food" component="category-page" componentProps={{db: this.db, category: 'food'}}/>
          <ion-route url="/directory/:directoryId/food/:slug" component="business-page" componentProps={{db: this.db, category: 'food'}}/>
          <ion-route url="/directory/:directoryId/services" component="category-page" componentProps={{db: this.db, category: 'services'}}/>
          <ion-route url="/directory/:directoryId/services/:slug" component="business-page" componentProps={{db: this.db, category: 'services'}}/>
          <ion-route url="/directory/:directoryId/contact" component="contact-page"/>
          <ion-route url="/directory/:directoryId/admin" component="admin-page" componentProps={{db: this.db}}/>
        </ion-router>
        <ion-nav/>
      </ion-app>
    );
  }
}
