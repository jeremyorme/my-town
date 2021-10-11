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
        </content-bg-block>
        <footer-block/>
      </ion-content>,
    ];
  }

}
