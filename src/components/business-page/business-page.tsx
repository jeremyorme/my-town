import { Component, Prop, State, h } from '@stencil/core';
import { MainDb } from '../../helpers/main-db';

@Component({
  tag: 'business-page',
  styleUrl: 'business-page.css',
})
export class BusinessPage {
  @Prop() db: MainDb;
  @Prop() slug: string;

  @State() name: string = 'Local *Business* Name';
  @State() url: string = 'https://www.localbusiness.co.uk';
  @State() tel: string = '(01252) 818 818';
  @State() address: string = '89 Whetstone Rd, Cove, GU14 9SX';
  @State() longitude: number = -0.79131;
  @State() latitude: number = 51.29624;

  async componentWillLoad() {
    if (this.slug == 'new-business')
      return;

    const matchingBusinesses = await this.db.businessDb.db.query(b => b._id == this.slug);
    if (matchingBusinesses.length == 0)
      return; // TODO: do something better than this

    const business = matchingBusinesses[0];
    this.name = business.name;
    this.url = business.url;
    this.tel = business.tel;
    this.address = business.address;
    this.longitude = business.longitude;
    this.latitude = business.latitude;
  }

  async save() {
    const business = {
      _id: this.name.toLowerCase().split(/[^a-z0-9 ]/).join('').split(' ').join('-'),
      name: this.name,
      url: this.url,
      tel: this.tel,
      address: this.address,
      longitude: this.longitude,
      latitude: this.latitude
    };

    await this.db.businessDb.db.put(business);
  }

  render() {
    return [
      <ion-content>
        <banner-block/>
        <navbar-block>
          <nav-link-block href="#/">Home</nav-link-block>
          <nav-link-block href="#/shopping/">Shopping</nav-link-block>
          <nav-link-block href="#/food/">Food</nav-link-block>
          <nav-link-block href="#/services/">Services</nav-link-block>
          <nav-link-block href="#/contact/">Contact</nav-link-block>
        </navbar-block>
        <sub-header-block>
          <field-block class="name-field" value={this.name} iconSize="large" readOnly={!this.db.canWrite()} onValueChanged={e => {this.name = e.detail; this.save();}} />
        </sub-header-block>
        <content-block>
          <map-block id="business-map" latitude={this.latitude} longitude={this.longitude} zoom={16}/>
          {this.db.canWrite() ? <div class="details">
            <div class="detail">
              <ion-icon class="detail-left" name="swap-horizontal-outline" size="large"/>
              <field-block class="detail-right" value={this.longitude.toString()} iconSize="small" readOnly={false} onValueChanged={e => {this.longitude = parseFloat(e.detail); this.save();}}/>
            </div>
            <div class="detail">
              <ion-icon class="detail-left" name="swap-vertical-outline" size="large"/>
              <field-block class="detail-right" value={this.latitude.toString()} iconSize="small" readOnly={false} onValueChanged={e => {this.latitude = parseFloat(e.detail); this.save();}}/>
            </div>
          </div> : null}
        </content-block>
        <content-bg-block>
          <h2>Get in touch</h2>
          <div class="details">
            <div class="detail">
              <ion-icon class="detail-left" name="globe-outline" size="large"/>
              <field-block class="detail-right" value={this.url} iconSize="small" readOnly={!this.db.canWrite()} isLink={true} onValueChanged={e => {this.url = e.detail; this.save();}}/>
            </div>
            <div class="detail">
              <ion-icon class="detail-left" name="call-outline" size="large"/>
              <field-block class="detail-right" value={this.tel} iconSize="small" readOnly={!this.db.canWrite()} onValueChanged={e => {this.tel = e.detail; this.save();}}/>
            </div>
            <div class="detail">
              <ion-icon class="detail-left" name="home-outline" size="large"/>
              <field-block class="detail-right" value={this.address} iconSize="small" readOnly={!this.db.canWrite()} onValueChanged={e => {this.address = e.detail; this.save();}}/>
            </div>
          </div>
        </content-bg-block>
        <footer-block/>
      </ion-content>,
    ];
  }

}
