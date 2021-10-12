import { Component, h } from '@stencil/core';

@Component({
  tag: 'services-page',
  styleUrl: 'services-page.css',
})
export class ServicesPage {

  render() {
    return [
      <ion-content>
        <banner-block/>
        <navbar-block>
          <nav-link-block href="#/">Home</nav-link-block>
          <nav-link-block href="#/shopping/">Shopping</nav-link-block>
          <nav-link-block href="#/food/">Food</nav-link-block>
          <nav-link-block href="#/services/" current={true}>Services</nav-link-block>
          <nav-link-block href="#/contact/">Contact</nav-link-block>
        </navbar-block>
        <sub-header-block>
          <h1>Find <strong>trusted</strong> local traders</h1>
        </sub-header-block>
        <content-block>
        </content-block>
        <footer-block/>
      </ion-content>,
    ];
  }
}
