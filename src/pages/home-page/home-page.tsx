import { Component, h } from '@stencil/core';

@Component({
  tag: 'home-page',
  styleUrl: 'home-page.css',
})
export class HomePage {
  private navCtrl: HTMLIonRouterElement;

  componentWillLoad() {
    this.navCtrl = document.querySelector("ion-router");
  }

  render() {
    return [
      <ion-content>
        <banner-section/>
        <navbar-block>
          <nav-link-block href="#/" current={true}>Home</nav-link-block>
          {['My Businesses', 'My Directory'].map(c => <nav-link-block href={'#/' + c.split(' ').join('-').toLowerCase() + '/'}>{c}</nav-link-block>)}
        </navbar-block>
        <header-section>
          <h1 slot="left">Your Favourite <strong>Locally Owned</strong> Businesses</h1>
          <p slot="left"><strong>Create a business page</strong> or add your favourite shops to <strong>your directory</strong>...</p>
          <div class="buttons" slot="left">
            <ion-button strong={true} onClick={() => this.navCtrl.push('/my-businesses/')}>My Businesses</ion-button>
            <ion-button strong={true} onClick={() => this.navCtrl.push('/my-directory/')}>My Directory</ion-button>
          </div>
          <map-block id="local-map" slot="right" latitude={51.2869} longitude={-0.7526} zoom={13}/>
        </header-section>
        <footer-section baseUrl="#/"/>
      </ion-content>,
    ];
  }
}
