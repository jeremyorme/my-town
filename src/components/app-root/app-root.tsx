import { Component, h } from '@stencil/core';
import { MainDb } from '../../helpers/main-db';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot {

  db: MainDb = new MainDb((window as any).Ipfs, (window as any).OrbitDB, localStorage.getItem('my-town-id'));
  directoryId: string = (window as any).myTownDbAddress;

  render() {
    return (
      <ion-app>
        <ion-router useHash={true}>
          <ion-route url="/" component="home-page" componentProps={{db: this.db}}/>
          <ion-route url="/shopping" component="category-page" componentProps={{db: this.db, directoryId: this.directoryId, category: 'shopping'}}/>
          <ion-route url="/shopping/:slug" component="business-page" componentProps={{db: this.db, directoryId: this.directoryId, category: 'shopping'}}/>
          <ion-route url="/food" component="category-page" componentProps={{db: this.db, directoryId: this.directoryId, category: 'food'}}/>
          <ion-route url="/food/:slug" component="business-page" componentProps={{db: this.db, directoryId: this.directoryId, category: 'food'}}/>
          <ion-route url="/services" component="category-page" componentProps={{db: this.db, directoryId: this.directoryId, category: 'services'}}/>
          <ion-route url="/services/:slug" component="business-page" componentProps={{db: this.db, directoryId: this.directoryId, category: 'services'}}/>
          <ion-route url="/contact" component="contact-page"/>
          <ion-route url="/admin" component="admin-page" componentProps={{db: this.db, directoryId: this.directoryId}}/>
        </ion-router>
        <ion-nav/>
      </ion-app>
    );
  }
}
