import { Component, h } from '@stencil/core';
import { MainDb } from '../../helpers/main-db';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot {

  db: MainDb = new MainDb((window as any).Ipfs, (window as any).OrbitDB, localStorage.getItem('my-town-id'));
  directoryId: string = (window as any).myTownDirectoryId;

  render() {
    return (
      <ion-app>
        {this.directoryId ? <ion-router useHash={true}>
          <ion-route url="/" component="directory-page" componentProps={{db: this.db, directoryId: this.directoryId}}/>
          <ion-route url="/shopping" component="category-page" componentProps={{db: this.db, directoryId: this.directoryId, category: 'shopping'}}/>
          <ion-route url="/shopping/:slug" component="business-page" componentProps={{db: this.db, directoryId: this.directoryId, category: 'shopping'}}/>
          <ion-route url="/food" component="category-page" componentProps={{db: this.db, directoryId: this.directoryId, category: 'food'}}/>
          <ion-route url="/food/:slug" component="business-page" componentProps={{db: this.db, directoryId: this.directoryId, category: 'food'}}/>
          <ion-route url="/services" component="category-page" componentProps={{db: this.db, directoryId: this.directoryId, category: 'services'}}/>
          <ion-route url="/services/:slug" component="business-page" componentProps={{db: this.db, directoryId: this.directoryId, category: 'services'}}/>
          <ion-route url="/contact" component="contact-page"/>
          <ion-route url="/admin" component="admin-page" componentProps={{db: this.db, directoryId: this.directoryId}}/>
        </ion-router> : <ion-router useHash={true}>
          <ion-route url="/directory/:directoryId/" component="directory-page" componentProps={{db: this.db}}/>
          <ion-route url="/directory/:directoryId/shopping" component="category-page" componentProps={{db: this.db, category: 'shopping'}}/>
          <ion-route url="/directory/:directoryId/shopping/:slug" component="business-page" componentProps={{db: this.db, category: 'shopping'}}/>
          <ion-route url="/directory/:directoryId/food" component="category-page" componentProps={{db: this.db, category: 'food'}}/>
          <ion-route url="/directory/:directoryId/food/:slug" component="business-page" componentProps={{db: this.db, category: 'food'}}/>
          <ion-route url="/directory/:directoryId/services" component="category-page" componentProps={{db: this.db, category: 'services'}}/>
          <ion-route url="/directory/:directoryId/services/:slug" component="business-page" componentProps={{db: this.db, category: 'services'}}/>
          <ion-route url="/directory/:directoryId/contact" component="contact-page"/>
          <ion-route url="/directory/:directoryId/admin" component="admin-page" componentProps={{db: this.db}}/>
        </ion-router>}
        <ion-nav/>
      </ion-app>
    );
  }
}
