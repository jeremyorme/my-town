import { Component, Prop, h } from '@stencil/core';
import { MainDb } from '../../helpers/main-db';

@Component({
  tag: 'directory-page',
  styleUrl: 'directory-page.css',
})
export class DirectoryPage {
  @Prop() db: MainDb;
  @Prop() directoryId: string;
  @Prop() directoryRoot: string;

  render() {
    const baseUrl = this.directoryRoot.replace(':directoryId', this.directoryId);
    return [
      <ion-content>
        <banner-block/>
        <navbar-block>
          <nav-link-block href={baseUrl} current={true}>Home</nav-link-block>
          {['Shopping', 'Food', 'Services', 'Contact'].map(c => <nav-link-block href={baseUrl + c.toLowerCase() + '/'}>{c}</nav-link-block>)}
        </navbar-block>
        <header-block>
          <h1 slot="left">Shop local. Help <strong>Farnborough</strong> thrive!</h1>
          <p slot="left">The high-street is the beating heart of our local community and vibrant small business underpins our freedom and democracy.</p>
          <p slot="left"><strong>Support our local businesses</strong> for a stronger community and brighter future.</p>
          <ion-button slot="left" href="#/shopping/" strong={true}>Find a Shop</ion-button>
          <map-block id="local-map" slot="right" latitude={51.2869} longitude={-0.7526} zoom={13}/>
        </header-block>
        <footer-block baseUrl={baseUrl}/>
      </ion-content>,
    ];
  }
}
