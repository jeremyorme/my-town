import slugify from 'slugify';

import { Component, Prop, State, h } from '@stencil/core';
import { Category, BusinessEntry, BusinessEntryRequest, Business, BusinessEntryId, businessEntryIdEquals } from '../../state/root';
import { store } from '@stencil/redux';
import { loadDirectory, putCategory, putBusinessEntry, delBusinessEntry } from '../../state/actions/directory';
import { loadBusinesses } from '../../state/actions/businesses';

@Component({
  tag: 'category-page',
  styleUrl: 'category-page.css',
})
export class CategoryPage {
  @Prop() directoryId: string;
  @Prop() directoryRoot: string;
  @Prop() category: string;

  @State() canWrite: boolean;
  @State() loading: boolean;

  @State() categories: Category[];
  @State() businessEntries: BusinessEntry[];
  @State() businesses: Business[];
  @State() requests: BusinessEntryRequest[];
  @State() townName: string;

  @State() newSlug: string = 'not-set';
  @State() newId: BusinessEntryId = {businessesId: 'not-set', businessIdx: 0};

  loadBusinesses: (...args: any) => any;
  loadDirectory: (...args: any) => any;
  putCategory: (...args: any) => any;
  putBusinessEntry: (...args: any) => any;
  delBusinessEntry: (...args: any) => any;

  componentWillLoad() {
    store.mapStateToProps(this, state => {
      const {
        directory: { canWrite, loading, townName, categories, businessEntries, requests },
        businesses: { businesses }
      } = state;
      return { canWrite, loading, townName, categories, businessEntries, requests, businesses };
    });
    store.mapDispatchToProps(this, { loadBusinesses, loadDirectory, putCategory, putBusinessEntry, delBusinessEntry });
    this.loadDirectory(this.directoryId);
  }

  getHeadline() {
    const cat = this.categories.find(c => c._id == this.category);
    return cat ? cat.headline : '';
  }

  setHeadline(headline: string) {
    this.putCategory({_id: this.category, headline});
  }

  async createOrUpdateBusinessEntry(oldId: BusinessEntryId, newId: BusinessEntryId, newSlug: string) {
    // Load the new business details
    await this.loadBusinesses(newId.businessesId);
    const business = this.businesses.find(b => b._id == newId.businessIdx);
    if (!business) {
      alert('Business could not be found with specified index');
      return;
    }

    // If the ID changes then delete the old entry
    if (oldId && !businessEntryIdEquals(newId, oldId))
      await this.delBusinessEntry(oldId);

    // Update/create new business entry
    await this.putBusinessEntry({
      _id: newId,
      category: this.category,
      slug: newSlug != 'not-set' ? newSlug : slugify(business.name.split('*').join('').toLowerCase()),
      name: business.name,
      description: business.description,
      icon: business.icon
    });
  }

  async addBusinessEntryRequest(newId: BusinessEntryId) {
    try {
      await this.createOrUpdateBusinessEntry(null, newId, 'not-set');
    }
    catch (e) {
      alert('Business could not be found with specified hash');
    }
  }

  async addBusinessEntry() {
    try {
      await this.createOrUpdateBusinessEntry(null, this.newId, this.newSlug);
      this.newSlug = 'not-set';
      this.newId = {businessesId: 'not-set', businessIdx: 0};
    }
    catch (e) {
      alert('Business could not be found with specified hash');
    }
  }

  async updateBusinessEntry(oldId: BusinessEntryId, newId: BusinessEntryId, newSlug: string) {
    try {
      await this.createOrUpdateBusinessEntry(oldId, newId, newSlug);
    }
    catch (e) {
      alert('Business could not be found with specified hash');
    }
  }

  async deleteBusiness(id: BusinessEntryId) {
    await this.delBusinessEntry(id);
  }

  render() {
    const baseUrl = this.directoryRoot.replace(':directoryId', this.directoryId);
    return [
      <ion-content>
        <banner-section directoryId={this.directoryId} baseUrl={baseUrl}/>
        <navbar-block>
          <nav-link-block href={baseUrl}>Home</nav-link-block>
          {['Shopping', 'Food', 'Services'].map(c => <nav-link-block href={baseUrl + c.toLowerCase() + '/'} current={this.category == c.toLowerCase()}>{c}</nav-link-block>)}
          <nav-link-block href={baseUrl + 'contact/'}>Contact</nav-link-block>
        </navbar-block>
        <sub-header-section>
          <field-block class="headline-field" loading={this.loading} value={this.getHeadline()} iconSize="large" readOnly={!this.canWrite} onValueChanged={e => {this.setHeadline(e.detail)}} />
        </sub-header-section>
        <content-section>
          {this.canWrite ? <business-card-block canWrite={true} businessEntryId={this.newId} slug={this.newSlug} name="Add new business" description="Add a new business to the list" buttonText="Add" icon="add-circle-outline" onIdChanged={e => this.newId = e.detail} onSlugChanged={e => this.newSlug = e.detail} onButtonClicked={() => this.addBusinessEntry()}/> : null}
          {this.businessEntries.map(b => <business-card-block canWrite={this.canWrite} businessEntryId={b._id} slug={b.slug} name={b.name.split('*').join('')} description={b.description.split('*').join('')} icon={b.icon} href={baseUrl + b.category + '/' + b.slug} onIdChanged={e => this.updateBusinessEntry(b._id, e.detail, b.slug)} onSlugChanged={e => this.updateBusinessEntry(b._id, b._id, e.detail)} onDeleteClicked={() => this.deleteBusiness(b._id)}/>)}
        </content-section>
        <content-bg-section>
          <h2>Requests</h2>
          {this.loading ? <p>Loading...</p> : this.requests.length ? <ul>{this.requests.map(r => <li><div class="request-container"><field-block value={r.name} href={baseUrl + 'business/' + r._id.businessesId +'/' + r._id.businessIdx} readOnly={true}/><div class="request-icon"><ion-icon name="add-circle-outline" onClick={() => this.addBusinessEntryRequest(r._id)}/></div></div></li>)}</ul> : <p>None</p>}
        </content-bg-section>
        <footer-section directoryId={this.directoryId} baseUrl={baseUrl}/>
      </ion-content>,
    ];
  }
}
