import { Component, h } from '@stencil/core';

@Component({
  tag: 'business-page',
  styleUrl: 'business-page.css',
})
export class BusinessPage {

  render() {
    return [
      <ion-content>
        <banner-block/>
        <navbar-block>
          <nav-link-block href="../">Home</nav-link-block>
          <nav-link-block href="./">Shopping</nav-link-block>
          <nav-link-block href="../food/">Food</nav-link-block>
          <nav-link-block href="../services/">Services</nav-link-block>
          <nav-link-block href="../contact/">Contact</nav-link-block>
        </navbar-block>
        <sub-header-block>
          <h1>Whetstone <strong>Convenience</strong> Store</h1>
        </sub-header-block>
        <content-block>
          <map-block latitude={51.29624} longitude={-0.79131} zoom={17}/>
        </content-block>
        <content-bg-block>
          <h2>Get in touch</h2>
          <div class="details">
            <div class="detail">
              <div class="detail-left">
                <ion-icon name="globe-outline" size="large"/>
              </div>
              <div class="detail-right">
                <p>https://www.premier-stores.co.uk/our-stores/whetsone-convenience-store</p>
              </div>
            </div>
            <div class="detail">
              <div class="detail-left">
                <ion-icon name="call-outline" size="large"/>
              </div>
              <div class="detail-right">
                <p>(01252) 542 381</p>
              </div>
            </div>
            <div class="detail">
              <div class="detail-left">
                <ion-icon name="home-outline" size="large"/>
              </div>
              <div class="detail-right">
                <p>89 Whetstone Rd, Cove, GU14 9SX</p>
              </div>
            </div>
          </div>
        </content-bg-block>
        <footer-block/>
      </ion-content>,
    ];
  }

}
