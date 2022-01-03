import { Component, State, h } from '@stencil/core';
import { Business } from '../../state/root';
import { store } from '@stencil/redux';
import { loadBusinesses, putBusiness } from '../../state/actions/businesses';

@Component({
  tag: 'my-businesses-page',
  styleUrl: 'my-businesses-page.css',
})
export class MyBusinessesPage {

  @State() canWrite: boolean;
  @State() loading: boolean;
  @State() businesses: Business[];
  @State() nextIndex: number;

  loadBusinesses: (...args: any) => any;
  putBusiness: (...args: any) => any;

  private navCtrl: HTMLIonRouterElement;

  componentWillLoad() {
    this.navCtrl = document.querySelector("ion-router");
    store.mapStateToProps(this, state => {
      const {
        businesses: { canWrite, loading, businesses, nextIndex },
      } = state;
      return { canWrite, loading, businesses, nextIndex };
    });
    store.mapDispatchToProps(this, { loadBusinesses, putBusiness });
    this.loadBusinesses();
  }

  async createBusiness() {
    const businessIdx = this.nextIndex;
    this.putBusiness({
      _id: businessIdx,
      name: 'My *Business* Name',
      description: 'My business in a sentence or two',
      url: 'https://my-business.com',
      tel: '(0800) 123 456',
      address: '123 My Road, My Area, P05TC0D3',
      longitude: -3.0,
      latitude: 52.0,
      icon: 'help'
    });
    this.navCtrl.push('/my-businesses/' + businessIdx + '/');
  }

  render() {
    return [
      <ion-content>
        <banner-block/>
        <navbar-block>
          <nav-link-block href="#/">Home</nav-link-block>
          {['My Businesses', 'My Directory'].map(c => <nav-link-block href={'#/' + c.split(' ').join('-').toLowerCase() + '/'} current={c == 'My Businesses'}>{c}</nav-link-block>)}
        </navbar-block>
        <sub-header-block>
          <h1>My <strong>Businesses</strong></h1>
        </sub-header-block>
        <content-block>
          <div class="menu-item">
            {this.canWrite ? <business-card-block name="Add new business" description="Add a new business to the list" buttonText="Add" icon="add-circle-outline" onButtonClicked={() => this.createBusiness()}/> : null}
            {this.businesses.map(b => <business-card-block canWrite={false} buttonText="Edit" name={b.name.split('*').join('')} description={b.description.split('*').join('')} icon={b.icon} href={'#/my-businesses/' + b._id}/>)}
          </div>
        </content-block>
        <footer-block baseUrl="#/"/>
      </ion-content>,
    ];
  }
}
