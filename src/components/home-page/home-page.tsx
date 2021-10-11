import { Component, h } from '@stencil/core';

@Component({
  tag: 'home-page',
  styleUrl: 'home-page.css',
})
export class HomePage {
  render() {
    return [
      <ion-content class="root-page">
        <banner-block baseUrl="."/>
        <navbar-block>
          <nav-link-block href="./" current={true}>Home</nav-link-block>
          <nav-link-block href="shopping/">Shopping</nav-link-block>
          <nav-link-block href="food/">Food</nav-link-block>
          <nav-link-block href="services/">Services</nav-link-block>
          <nav-link-block href="contact/">Contact</nav-link-block>
        </navbar-block>
        <header-block imageSrc="assets/img/farnborough-main.jpeg">
          <h1 slot="left">Shop local. Help <strong>Farnborough</strong> thrive!</h1>
          <p slot="left">The high-street is the beating heart of our local community and vibrant small business underpins our freedom and democracy. Support our local businesses for a stronger community and brighter future.</p>
          <ion-button slot="left" href="shopping/" strong={true}>Find a Shop</ion-button>
          <map-block slot="right" name="localMap" latitude={51.2869} longitude={-0.7526} zoom={13}/>
        </header-block>
        <footer-block baseUrl="."/>
      </ion-content>,
    ];
  }
}
