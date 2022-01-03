import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'contact-page',
  styleUrl: 'contact-page.css',
})
export class ContactPage {
  @Prop() directoryId: string;
  @Prop() directoryRoot: string;

  render() {
    const baseUrl = this.directoryRoot.replace(':directoryId', this.directoryId);
    return [
      <ion-content>
        <banner-block/>
        <navbar-block>
          <nav-link-block href={baseUrl}>Home</nav-link-block>
          {['Shopping', 'Food', 'Services'].map(c => <nav-link-block href={baseUrl + c.toLowerCase() + '/'}>{c}</nav-link-block>)}
          <nav-link-block href={baseUrl + 'contact/'} current={true}>Contact</nav-link-block>
        </navbar-block>
        <footer-block directoryId={this.directoryId} baseUrl={baseUrl}/>
      </ion-content>,
    ];
  }
}
