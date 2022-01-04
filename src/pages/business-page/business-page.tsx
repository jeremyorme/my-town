import { Component, Prop, State, h } from '@stencil/core';
import { store } from '@stencil/redux';
import { BusinessEntry, BusinessEntryId, Business } from '../../state/root';
import { loadDirectory, setHomeDirectoryId, addRequest } from '../../state/actions/directory';
import { loadBusinesses, putBusiness } from '../../state/actions/businesses';

@Component({
  tag: 'business-page',
  styleUrl: 'business-page.css',
})
export class BusinessPage {
  // These properties are set for edits from a directory
  @Prop() directoryId: string;
  @Prop() directoryRoot: string;
  @Prop() slug: string;
  @Prop() category: string;

  // These properties are set for standalone edits
  @Prop() businessesId: string;
  @Prop() businessIdx: number;

  @State() canWrite: boolean;
  @State() loading: boolean;
  @State() loadedDirectoryId: string;
  @State() homeDirectoryId: string;
  @State() townName: string;
  @State() businessEntries: BusinessEntry[];
  @State() businesses: Business[];
  @State() business: Business;
  @State() loadedBusinessesId: string;

  loadBusinesses: (...args: any) => any;
  loadDirectory: (...args: any) => any;
  putBusiness: (...args: any) => any;
  setHomeDirectoryId: (...args: any) => any;
  addRequest: (...args: any) => any;

  async loadData() {
    // Determine the business id and idx
    let businessEntryId: BusinessEntryId = {
      businessesId: '',
      businessIdx: NaN
    };
    if (this.directoryId) {
      await this.loadDirectory(this.directoryId);
      const businessEntry = this.businessEntries.find(x => x.category == this.category && x.slug == this.slug);
      if (businessEntry)
        businessEntryId = businessEntry._id;
    }
    else {
      await this.loadDirectory();
      businessEntryId.businessesId = this.businessesId;
      businessEntryId.businessIdx = this.businessIdx;
    }

    // Load the business details
    await this.loadBusinesses(businessEntryId.businessesId);
    this.business = this.businesses.find(b => b._id == businessEntryId.businessIdx) || {
      _id: 0,
      name: '',
      description: '',
      longitude: 0.0,
      latitude: 0.0,
      url: '',
      tel: '',
      address: '',
      icon: ''
    };
  }

  async componentWillLoad() {
    store.mapStateToProps(this, state => {
      const {
        directory: { loading, loadedDirectoryId, homeDirectoryId, townName, businessEntries },
        businesses: { canWrite, businesses, loadedBusinessesId }
      } = state;
      return { canWrite, loading, loadedDirectoryId, homeDirectoryId, townName, businessEntries, businesses, loadedBusinessesId };
    });
    store.mapDispatchToProps(this, { loadDirectory, loadBusinesses, putBusiness, setHomeDirectoryId, addRequest });
    this.loadData();
  }

  async save(fields: any) {
    this.putBusiness({...this.business, ...fields});
  }

  async onRequest() {
    await this.addRequest({_id: this.loadedBusinessesId, idx: this.business._id});
    alert('Request sent!');
  }

  render() {
    const baseUrl = this.directoryId ? this.directoryRoot.replace(':directoryId', this.directoryId) : '#/';
    return [
      <ion-content>
        <banner-section/>
        {this.directoryId ? <navbar-block>
          <nav-link-block href={baseUrl}>Home</nav-link-block>
          {['Shopping', 'Food', 'Services'].map(c => <nav-link-block href={baseUrl + c.toLowerCase() + '/'} current={this.category == c.toLowerCase()}>{c}</nav-link-block>)}
          <nav-link-block href={baseUrl + 'contact/'}>Contact</nav-link-block>
        </navbar-block> :
        <navbar-block>
          {['Home', 'My Businesses', 'My Directory'].map(c => <nav-link-block href={'#/' + c.split(' ').join('-').toLowerCase() + '/'} current={c == 'My Businesses'}>{c}</nav-link-block>)}
        </navbar-block>}
        <sub-header-section>
          <div class="details centered">
            <field-block class="name-field" loading={this.loading} value={this.business.name} iconSize="large" readOnly={!this.canWrite} onValueChanged={e => {this.save({name: e.detail})}} />
            <field-block class="description-field" loading={this.loading} value={this.business.description} iconSize="small" readOnly={!this.canWrite} onValueChanged={e => {this.save({description: e.detail})}} />
          </div>
        </sub-header-section>
        <content-section>
          <map-block id="business-map" latitude={this.business.latitude} longitude={this.business.longitude} zoom={16}/>
          {this.canWrite ? <div class="details">
            <div class="detail">
              <ion-icon class="detail-left" name="swap-horizontal-outline" size="large"/>
              <field-block class="detail-right" loading={this.loading} value={this.business.longitude.toString()} iconSize="small" readOnly={false} onValueChanged={e => {this.save({longitude: parseFloat(e.detail)})}}/>
            </div>
            <div class="detail">
              <ion-icon class="detail-left" name="swap-vertical-outline" size="large"/>
              <field-block class="detail-right" loading={this.loading} value={this.business.latitude.toString()} iconSize="small" readOnly={false} onValueChanged={e => {this.save({latitude: parseFloat(e.detail)})}}/>
            </div>
          </div> : null}
        </content-section>
        <content-bg-section>
          <h2>Get in touch</h2>
          <div class="details">
            <div class="detail">
              <ion-icon class="detail-left" name="globe-outline" size="large"/>
              <field-block class="detail-right" loading={this.loading} value={this.business.url} iconSize="small" readOnly={!this.canWrite} isLink={true} onValueChanged={e => {this.save({url: e.detail})}}/>
            </div>
            <div class="detail">
              <ion-icon class="detail-left" name="call-outline" size="large"/>
              <field-block class="detail-right" loading={this.loading} value={this.business.tel} iconSize="small" readOnly={!this.canWrite} onValueChanged={e => {this.save({tel: e.detail})}}/>
            </div>
            <div class="detail">
              <ion-icon class="detail-left" name="home-outline" size="large"/>
              <field-block class="detail-right" loading={this.loading} value={this.business.address} iconSize="small" readOnly={!this.canWrite} onValueChanged={e => {this.save({address: e.detail})}}/>
            </div>
            {this.canWrite ? <div class="detail">
              <ion-icon class="detail-left" name="image-outline" size="large"/>
              <field-block class="detail-right" loading={this.loading} value={this.business.icon} iconSize="small" readOnly={false} onValueChanged={e => {this.save({icon: e.detail})}}/>
            </div> : null}
          </div>
        </content-bg-section>
        {this.canWrite && this.businessesId ? <content-section>
          <h2>Add To Directory</h2>
          <p>Your home directory is set to:</p>
          <div class="details">
            <div class="detail">
              <ion-icon class="detail-left" name="link" size="large"/>
              <field-block class="detail-right" loading={this.loading} value={this.homeDirectoryId} iconSize="small" readOnly={false} onValueChanged={e => this.setHomeDirectoryId(e.detail)}/>
              <p class="detail-right" ><a href={'#/directory/' + this.homeDirectoryId + '/'}>Visit</a></p>
            </div>
          </div>
          <ion-button onClick={() => this.onRequest()}>Request</ion-button>
        </content-section> : null}
        <footer-section directoryId={this.directoryId} baseUrl={baseUrl}/>
      </ion-content>,
    ];
  }

}
