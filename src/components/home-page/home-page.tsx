import { Component, Prop, h } from '@stencil/core';
import { MainDb } from '../../helpers/main-db';

@Component({
  tag: 'home-page',
  styleUrl: 'home-page.css',
})
export class HomePage {
  @Prop() db: MainDb;

  private navCtrl: HTMLIonRouterElement;

  componentWillLoad() {
    this.navCtrl = document.querySelector("ion-router");
  }

  async createBusiness() {
    const myBusinesses = await this.db.business();
    const idx = myBusinesses.nextIndex()
    myBusinesses.put({
      _id: idx,
      name: 'My *Business* Name',
      description: 'My business in a sentence or two',
      url: 'https://my-business.com',
      tel: '(0800) 123 456',
      address: '123 My Road, My Area, P05TC0D3',
      longitude: -3.0,
      latitude: 52.0,
      icon: 'help'
    });
    this.navCtrl.push('/my-businesses/' + idx + '/');
  }

  async createDirectory() {
    this.navCtrl.push('/my-directory/');
  }

  render() {
    return [
      <ion-content>
        <banner-block/>
        <navbar-block>
          <nav-link-block href="#/" current={true}>Home</nav-link-block>
          {['My Businesses', 'My Directory'].map(c => <nav-link-block href={'#/' + c.split(' ').join('-').toLowerCase() + '/'}>{c}</nav-link-block>)}
        </navbar-block>
        <header-block>
          <h1 slot="left">Your Favourite <strong>Locally Owned</strong> Businesses</h1>
          <p slot="left"><strong>Create a business page</strong> or add your favourite shops to <strong>your directory</strong>...</p>
          <div class="buttons" slot="left">
            <ion-button strong={true} onClick={() => this.createBusiness()}>Create Business</ion-button>
            <ion-button strong={true} onClick={() => this.createDirectory()}>My Directory</ion-button>
          </div>
          <map-block id="local-map" slot="right" latitude={51.2869} longitude={-0.7526} zoom={13}/>
        </header-block>
        <footer-block baseUrl="#/"/>
      </ion-content>,
    ];
  }
}
