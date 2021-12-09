import { Component, Prop, State, h } from '@stencil/core';
import { MainDb } from '../../helpers/main-db';
import { Business } from '../../helpers/business-db';

@Component({
  tag: 'my-businesses-page',
  styleUrl: 'my-businesses-page.css',
})
export class MyBusinessesPage {
  @Prop() db: MainDb;

  @State() loadingBusinesses: boolean = true;
  @State() businesses: Business[] = [];
  @State() canWrite: boolean = false;

  private navCtrl: HTMLIonRouterElement;

  async loadData() {
    const myBusinesses = await this.db.business();
    this.canWrite = await myBusinesses.canWrite();
    const businesses = await myBusinesses.all();
    this.businesses = businesses.map(b => ({
      _id: b._id,
      category: 'not-set',
      slug: 'not-set',
      name: b.name,
      description: b.description,
      icon: b.icon
    }));
    this.loadingBusinesses = false;
  }

  async init() {
    await this.loadData();
    const myBusinesses = await this.db.business();
    myBusinesses.onChange(() => { return this.loadData(); });
  }

  componentWillLoad() {
    this.navCtrl = document.querySelector("ion-router");
    this.init();
  }

  async createBusiness() {
    const myBusinesses = await this.db.business();
    const idx = myBusinesses.nextIndex()
    myBusinesses.put({
      _id: idx,
      name: 'My *Business* Name',
      description: 'My business in a sentence or two',
      url: 'https://my-business.com',
      tel: '(0800) 123 456',
      address: '123 My Road, My Area, P05TC0D3',
      longitude: -3.0,
      latitude: 52.0,
      icon: 'help'
    });
    this.navCtrl.push('/my-businesses/' + idx + '/');
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
