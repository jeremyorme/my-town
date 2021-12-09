import { Component, Prop, State, h } from '@stencil/core';
import { MainDb } from '../../helpers/main-db';
import { DirectoryFieldsDb } from '../../helpers/directory-fields-db';

@Component({
  tag: 'business-page',
  styleUrl: 'business-page.css',
})
export class BusinessPage {
  @Prop() db: MainDb;

  // These properties are set for edits from a directory
  @Prop() directoryId: string;
  @Prop() directoryRoot: string;
  @Prop() slug: string;
  @Prop() category: string;

  // These properties are set for standalone edits
  @Prop() businessId: string;
  @Prop() businessIdx: number;

  // Directory state
  @State() resolvedDirectoryId: string;
  @State() homeDirectoryId: string;
  @State() directoryFields: DirectoryFieldsDb;

  // Business state
  @State() resolvedBusinessId: string;
  @State() resolvedBusinessIdx: number;
  @State() loading: boolean = true;
  @State() name: string = 'Local *Business* Name';
  @State() description: string = 'Great little convenience store with all the essentials you could need';
  @State() url: string = 'https://www.localbusiness.co.uk';
  @State() tel: string = '(01252) 818 818';
  @State() address: string = '89 Whetstone Rd, Cove, GU14 9SX';
  @State() longitude: number = -0.79131;
  @State() latitude: number = 51.29624;
  @State() icon: string = 'home-outline';
  @State() canWrite: boolean = false;

  async resolveBusinessId() {
    if (!this.directoryId)
      return this.businessId + '/' + this.businessIdx;
    const directory = await this.db.directory(this.directoryId);
    this.directoryFields = directory.directoryFields;
    await directory.businesses.load();
    const businessEntry = await directory.businesses.get(this.slug);
    return businessEntry ? businessEntry._id : null;
  }

  async loadData() {
    this.resolvedDirectoryId = (await this.db.directory()).id();
    const businessIdAndIdx = (await this.resolveBusinessId()).split('/');
    const myBusinesses = await this.db.business(businessIdAndIdx[0]);
    this.resolvedBusinessId = myBusinesses.id();
    this.resolvedBusinessIdx = parseInt(businessIdAndIdx[1]);
    myBusinesses.load();
    if (!myBusinesses)
      return;

    this.canWrite = await myBusinesses.canWrite();
    if (this.loading) {
      this.loading = false;
      myBusinesses.onChange(() => {return this.loadData()});
    }

    const business = await myBusinesses.get(this.resolvedBusinessIdx);
    if (!business)
      return;

    this.name = business.name;
    this.description = business.description;
    this.url = business.url;
    this.tel = business.tel;
    this.address = business.address;
    this.longitude = business.longitude;
    this.latitude = business.latitude;
    this.icon = business.icon;
  }

  async componentWillLoad() {
    this.loadData();
    this.homeDirectoryId = this.db.localStorage.getHomeDirectoryId() || this.resolvedDirectoryId;
    this.db.localStorage.onChange(() => {
      this.homeDirectoryId = this.db.localStorage.getHomeDirectoryId() || this.resolvedDirectoryId;
    });
  }

  async save() {
    const business = await this.db.business(this.resolvedBusinessId);
    await business.put({
      _id: this.resolvedBusinessIdx,
      name: this.name,
      description: this.description,
      url: this.url,
      tel: this.tel,
      address: this.address,
      longitude: this.longitude,
      latitude: this.latitude,
      icon: this.icon
    });
  }

  async onRequest() {
    const homeDirectory = await this.db.directory(this.homeDirectoryId);
    const requests = await homeDirectory.requests;
    return requests.push({_id: this.resolvedBusinessId, idx: this.businessIdx});
  }

  render() {
    const baseUrl = this.directoryId ? this.directoryRoot.replace(':directoryId', this.directoryId) : '#/';
    return [
      <ion-content>
        <banner-block/>
        {this.directoryId ? <navbar-block>
          <nav-link-block href={baseUrl}>Home</nav-link-block>
          {['Shopping', 'Food', 'Services'].map(c => <nav-link-block href={baseUrl + c.toLowerCase() + '/'} current={this.category == c.toLowerCase()}>{c}</nav-link-block>)}
          <nav-link-block href={baseUrl + 'contact/'}>Contact</nav-link-block>
        </navbar-block> :
        <navbar-block>
          {['Home', 'My Businesses', 'My Directory'].map(c => <nav-link-block href={'#/' + c.split(' ').join('-').toLowerCase() + '/'} current={c == 'My Businesses'}>{c}</nav-link-block>)}
        </navbar-block>}
        <sub-header-block>
          <div class="details centered">
            <field-block class="name-field" loading={this.loading} value={this.name} iconSize="large" readOnly={!this.canWrite} onValueChanged={e => {this.name = e.detail; this.save();}} />
            <field-block class="description-field" loading={this.loading} value={this.description} iconSize="small" readOnly={!this.canWrite} onValueChanged={e => {this.description = e.detail; this.save();}} />
          </div>
        </sub-header-block>
        <content-block>
          <map-block id="business-map" latitude={this.latitude} longitude={this.longitude} zoom={16}/>
          {this.canWrite ? <div class="details">
            <div class="detail">
              <ion-icon class="detail-left" name="swap-horizontal-outline" size="large"/>
              <field-block class="detail-right" loading={this.loading} value={this.longitude.toString()} iconSize="small" readOnly={false} onValueChanged={e => {this.longitude = parseFloat(e.detail); this.save();}}/>
            </div>
            <div class="detail">
              <ion-icon class="detail-left" name="swap-vertical-outline" size="large"/>
              <field-block class="detail-right" loading={this.loading} value={this.latitude.toString()} iconSize="small" readOnly={false} onValueChanged={e => {this.latitude = parseFloat(e.detail); this.save();}}/>
            </div>
          </div> : null}
        </content-block>
        <content-bg-block>
          <h2>Get in touch</h2>
          <div class="details">
            <div class="detail">
              <ion-icon class="detail-left" name="globe-outline" size="large"/>
              <field-block class="detail-right" loading={this.loading} value={this.url} iconSize="small" readOnly={!this.canWrite} isLink={true} onValueChanged={e => {this.url = e.detail; this.save();}}/>
            </div>
            <div class="detail">
              <ion-icon class="detail-left" name="call-outline" size="large"/>
              <field-block class="detail-right" loading={this.loading} value={this.tel} iconSize="small" readOnly={!this.canWrite} onValueChanged={e => {this.tel = e.detail; this.save();}}/>
            </div>
            <div class="detail">
              <ion-icon class="detail-left" name="home-outline" size="large"/>
              <field-block class="detail-right" loading={this.loading} value={this.address} iconSize="small" readOnly={!this.canWrite} onValueChanged={e => {this.address = e.detail; this.save();}}/>
            </div>
            {this.canWrite ? <div class="detail">
              <ion-icon class="detail-left" name="image-outline" size="large"/>
              <field-block class="detail-right" loading={this.loading} value={this.icon} iconSize="small" readOnly={false} onValueChanged={e => {this.icon = e.detail; this.save();}}/>
            </div> : null}
          </div>
        </content-bg-block>
        {this.canWrite && this.businessId ? <content-block>
          <h2>Add To Directory</h2>
          <p>Your home directory is set to:</p>
          <div class="details">
            <div class="detail">
              <ion-icon class="detail-left" name="link" size="large"/>
              <field-block class="detail-right" loading={this.loading} value={this.homeDirectoryId} iconSize="small" readOnly={false} onValueChanged={e => this.db.localStorage.setHomeDirectoryId(e.detail)}/>
              <p class="detail-right" ><a href={'#/directory/' + this.homeDirectoryId + '/'}>Visit</a></p>
            </div>
          </div>
          <ion-button onClick={() => this.onRequest()}>Request</ion-button>
        </content-block> : null}
        <footer-block db={this.directoryFields} baseUrl={baseUrl}/>
      </ion-content>,
    ];
  }

}
