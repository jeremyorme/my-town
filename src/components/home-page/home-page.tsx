import { Component, Prop, h } from '@stencil/core';
import { MainDb } from '../../helpers/main-db';

@Component({
  tag: 'home-page',
  styleUrl: 'home-page.css',
})
export class HomePage {
  @Prop() db: MainDb;

  render() {
    return [
      <ion-content>
        <banner-block/>
        <navbar-block>
          <nav-link-block href="#/" current={true}>Home</nav-link-block>
          <nav-link-block href="#/shopping/">Shopping</nav-link-block>
          <nav-link-block href="#/food/">Food</nav-link-block>
          <nav-link-block href="#/services/">Services</nav-link-block>
          <nav-link-block href="#/contact/">Contact</nav-link-block>
        </navbar-block>
        <header-block>
          <h1 slot="left">Shop local. Help <strong>Farnborough</strong> thrive!</h1>
          <p slot="left">The high-street is the beating heart of our local community and vibrant small business underpins our freedom and democracy.</p>
          <p slot="left"><strong>Support our local businesses</strong> for a stronger community and brighter future.</p>
          <ion-button slot="left" href="#/shopping/" strong={true}>Find a Shop</ion-button>
          <map-block id="local-map" slot="right" latitude={51.2869} longitude={-0.7526} zoom={13}/>
        </header-block>
        <footer-block baseUrl="."/>
        {this.db.isTemporary() ? <div>
          DB address: {this.db.address()}
        </div> : null}
      </ion-content>,
    ];
  }
}
