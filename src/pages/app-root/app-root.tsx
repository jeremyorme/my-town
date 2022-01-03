import { Component, h } from '@stencil/core';
import { store } from '@stencil/redux';
import { configureStore } from '../../store/index';
import { connectDatabase } from '../../actions/database';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot {

  directoryId: string = (window as any).myTownDirectoryId;

  connectDatabase: (...args: any) => any;

  constructor() {
    store.setStore(configureStore({}));
    store.mapDispatchToProps(this, { connectDatabase });
  }

  componentWillLoad() {
    return this.connectDatabase((window as any).Ipfs, (window as any).OrbitDB, localStorage.getItem('my-town-id'));
  }

  render() {
    return (
      <ion-app>
        {this.directoryId ? <ion-router useHash={true}>
          <ion-route url="/" component="directory-page" componentProps={{directoryId: this.directoryId, directoryRoot: '#/'}}/>
          <ion-route url="/shopping/" component="category-page" componentProps={{directoryId: this.directoryId, directoryRoot: '#/', category: 'shopping'}}/>
          <ion-route url="/shopping/:slug/" component="business-page" componentProps={{directoryId: this.directoryId, directoryRoot: '#/', category: 'shopping'}}/>
          <ion-route url="/food/" component="category-page" componentProps={{directoryId: this.directoryId, directoryRoot: '#/', category: 'food'}}/>
          <ion-route url="/food/:slug/" component="business-page" componentProps={{directoryId: this.directoryId, directoryRoot: '#/', category: 'food'}}/>
          <ion-route url="/services/" component="category-page" componentProps={{directoryId: this.directoryId, directoryRoot: '#/', category: 'services'}}/>
          <ion-route url="/services/:slug/" component="business-page" componentProps={{directoryId: this.directoryId, directoryRoot: '#/', category: 'services'}}/>
          <ion-route url="/contact/" component="contact-page" componentProps={{directoryId: this.directoryId, directoryRoot: '#/'}}/>
          <ion-route url="/admin/" component="admin-page" componentProps={{directoryId: this.directoryId, directoryRoot: '#/'}}/>
        </ion-router> : <ion-router useHash={true}>
          <ion-route url="/" component="home-page"/>
          <ion-route url="/business/:businessesId/:businessIdx/" component="business-page"/>
          <ion-route url="/my-businesses/" component="my-businesses-page"/>
          <ion-route url="/my-businesses/:businessIdx/" component="business-page" componentProps={{businessesId: 'self'}}/>
          <ion-route url="/directory/:directoryId/" component="directory-page" componentProps={{directoryRoot: '#/directory/:directoryId/'}}/>
          <ion-route url="/directory/:directoryId/shopping/" component="category-page" componentProps={{directoryRoot: '#/directory/:directoryId/', category: 'shopping'}}/>
          <ion-route url="/directory/:directoryId/shopping/:slug/" component="business-page" componentProps={{directoryRoot: '#/directory/:directoryId/', category: 'shopping'}}/>
          <ion-route url="/directory/:directoryId/food/" component="category-page" componentProps={{directoryRoot: '#/directory/:directoryId/', category: 'food'}}/>
          <ion-route url="/directory/:directoryId/food/:slug/" component="business-page" componentProps={{directoryRoot: '#/directory/:directoryId/', category: 'food'}}/>
          <ion-route url="/directory/:directoryId/services/" component="category-page" componentProps={{directoryRoot: '#/directory/:directoryId/', category: 'services'}}/>
          <ion-route url="/directory/:directoryId/services/:slug/" component="business-page" componentProps={{directoryRoot: '#/directory/:directoryId/', category: 'services'}}/>
          <ion-route url="/directory/:directoryId/contact/" component="contact-page" componentProps={{directoryRoot: '#/directory/:directoryId/'}}/>
          <ion-route url="/directory/:directoryId/admin/" component="admin-page" componentProps={{directoryRoot: '#/directory/:directoryId/'}}/>
          <ion-route url="/my-directory/" component="directory-page" componentProps={{directoryRoot: '#/my-directory/', directoryId: 'self'}}/>
          <ion-route url="/my-directory/shopping/" component="category-page" componentProps={{directoryRoot: '#/my-directory/', directoryId: 'self', category: 'shopping'}}/>
          <ion-route url="/my-directory/shopping/:slug/" component="business-page" componentProps={{directoryRoot: '#/my-directory/', directoryId: 'self', category: 'shopping'}}/>
          <ion-route url="/my-directory/food/" component="category-page" componentProps={{directoryRoot: '#/my-directory/', directoryId: 'self', category: 'food'}}/>
          <ion-route url="/my-directory/food/:slug/" component="business-page" componentProps={{directoryRoot: '#/my-directory/', directoryId: 'self', category: 'food'}}/>
          <ion-route url="/my-directory/services/" component="category-page" componentProps={{directoryRoot: '#/my-directory/', directoryId: 'self', category: 'services'}}/>
          <ion-route url="/my-directory/services/:slug/" component="business-page" componentProps={{directoryRoot: '#/my-directory/', directoryId: 'self', category: 'services'}}/>
          <ion-route url="/my-directory/contact/" component="contact-page" componentProps={{directoryRoot: '#/my-directory/', directoryId: 'self'}}/>
          <ion-route url="/my-directory/admin/" component="admin-page" componentProps={{directoryRoot: '#/my-directory/', directoryId: 'self'}}/>
        </ion-router>}
        <ion-nav/>
      </ion-app>
    );
  }
}
