import slugify from 'slugify';

import { Component, Prop, State, h } from '@stencil/core';
import { Category, BusinessEntry, Request, Business, BusinessEntryId, businessEntryIdEquals } from '../../state/root';
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
  @State() requests: Request[];
  @State() townName: string;

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

  async addBusiness() {
    this.putBusinessEntry({
      _id: {businessesId: 'not-set', businessIdx: 0},
      category: this.category,
      slug: 'new-business',
      name: 'New business',
      description: 'Enter business ID:',
      icon: 'help'
    });
  }

  async deleteBusiness(id: BusinessEntryId) {
    await this.delBusinessEntry(id);
  }

  async updateBusinessEntryId(oldId: BusinessEntryId, newId: BusinessEntryId) {

    // Load the new business details
    await this.loadBusinesses(newId.businessesId);
    const business = this.businesses.find(b => b._id == newId.businessIdx);
    if (!business) {
      alert('Business could not be found with specified hash/index');
      return;
    }

    // If the ID changes then delete the old entry
    if (!businessEntryIdEquals(newId, oldId))
      await this.delBusinessEntry(oldId);

    // Update/create new business entry
    await this.putBusinessEntry({
      _id: newId,
      category: this.category,
      slug: slugify(business.name.split('*').join('').toLowerCase()),
      name: business.name,
      description: business.description,
      icon: business.icon
    });
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
          <div class="menu-item">
            {this.canWrite ? <business-card-block name="Add new business" description="Add a new business to the list" buttonText="Add" icon="add-circle-outline" onButtonClicked={() => this.addBusiness()}/> : null}
            {this.businessEntries.map(b => <business-card-block canWrite={this.canWrite} businessEntryId={b._id} slug={b.slug} name={b.name.split('*').join('')} description={b.description.split('*').join('')} icon={b.icon} href={baseUrl + b.category + '/' + b.slug} onIdChanged={e => this.updateBusinessEntryId(b._id, e.detail)} onDeleteClicked={() => this.deleteBusiness(b._id)}/>)}
          </div>
        </content-section>
        <content-section>
          <h2>Requests</h2>
          <div class="menu-item">
            {this.loading ? <p>Loading...</p> : this.requests.length ? this.requests.map(r => <p>{r._id}/{r.idx}</p>) : <p>None</p>}
          </div>
        </content-section>
        <footer-section directoryId={this.directoryId} baseUrl={baseUrl}/>
      </ion-content>,
    ];
  }
}
