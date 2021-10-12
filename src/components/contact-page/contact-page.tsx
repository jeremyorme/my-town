import { Component, h } from '@stencil/core';

@Component({
  tag: 'contact-page',
  styleUrl: 'contact-page.css',
})
export class ContactPage {

  render() {
    return [
      <ion-content>
        <banner-block/>
        <navbar-block>
          <nav-link-block href="#/">Home</nav-link-block>
          <nav-link-block href="#/shopping/">Shopping</nav-link-block>
          <nav-link-block href="#/food/">Food</nav-link-block>
          <nav-link-block href="#/services/">Services</nav-link-block>
          <nav-link-block href="#/contact/" current={true}>Contact</nav-link-block>
        </navbar-block>
        <footer-block/>
      </ion-content>,
    ];
  }
}
