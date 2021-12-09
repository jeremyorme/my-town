import slugify from 'slugify';

import { Component, Prop, State, h } from '@stencil/core';
import { MainDb } from '../../helpers/main-db';
import { BusinessEntry } from '../../helpers/businesses-db';
import { Request } from '../../helpers/requests-db';
import { DirectoryFieldsDb } from '../../helpers/directory-fields-db';

@Component({
  tag: 'category-page',
  styleUrl: 'category-page.css',
})
export class CategoryPage {
  @Prop() db: MainDb;
  @Prop() directoryId: string;
  @Prop() directoryRoot: string;
  @Prop() category: string;

  @State() loadingCategory: boolean = true;
  @State() loadingBusinesses: boolean = true;
  @State() loadingRequests: boolean = true;
  @State() headline: string = 'Loading category...';
  @State() businesses: BusinessEntry[] = [];
  @State() requests: Request[] = [];
  @State() canWrite: boolean = false;
  @State() directoryFields: DirectoryFieldsDb;

  async loadBusinessData() {
    const directory = await this.db.directory(this.directoryId);
    this.directoryFields = directory.directoryFields;
    await directory.businesses.load();
    this.canWrite = await directory.businesses.canWrite();
    const businesses = await directory.businesses.query(this.category);
    this.businesses = businesses || [];
    this.loadingBusinesses = false;
  }

  async loadCategoryData() {
    const directory = await this.db.directory(this.directoryId);
    await directory.categories.load();
    const cat = await directory.categories.get(this.category);
    if (cat) {
      this.headline = cat.headline;
    }
    this.loadingCategory = false;
  }

  async loadRequestsData() {
    const directory = await this.db.directory(this.directoryId);
    await directory.requests.load();
    const reqs = await directory.requests.top(25);
    if (reqs) {
      this.requests = reqs;
    }
    this.loadingRequests = false;
  }

  async loadData() {
    await this.loadBusinessData();
    await this.loadCategoryData();
    await this.loadRequestsData();
  }

  async init() {
    const directory = await this.db.directory(this.directoryId);
    this.headline = 'Find *' + this.category + '* businesses';
    await this.loadData();
    directory.businesses.onChange(() => { return this.loadBusinessData(); });
    directory.categories.onChange(() => { return this.loadCategoryData(); });
    directory.requests.onChange(() => { return this.loadRequestsData(); });
    directory.onChange(async () => {
      await this.loadData();
      directory.businesses.onChange(() => { return this.loadBusinessData(); });
      directory.categories.onChange(() => { return this.loadCategoryData(); });
      directory.requests.onChange(() => { return this.loadRequestsData(); });
    });
  }

  componentWillLoad() {
    this.init();
  }

  async saveCategory() {
    const directory = await this.db.directory(this.directoryId);
    await directory.categories.put({
      _id: this.category,
      headline: this.headline
    });
  }

  async addBusiness() {
    const directory = await this.db.directory(this.directoryId);
    await directory.businesses.put({
      _id: 'not-set',
      category: this.category,
      slug: 'new-business',
      name: 'New business',
      description: 'Enter business ID:',
      icon: 'help'
    });
    await this.loadData();
  }

  async updateBusinessId(oldId: string, newId: string) {

    const businessIdAndIdx = newId.split('/');
    const myBusinesses = await this.db.business(businessIdAndIdx[0]);
    if (!myBusinesses) {
      return;
    }

    const fields = await myBusinesses.get(parseInt(businessIdAndIdx[1]));

    const directory = await this.db.directory(this.directoryId);
    await directory.businesses.del(oldId);
    await directory.businesses.put({
      _id: newId,
      category: this.category,
      slug: slugify(fields.name.replaceAll('*', '').toLowerCase()),
      name: fields.name,
      description: fields.description,
      icon: fields.icon
    });
    await this.loadData();
  }

  render() {
    const baseUrl = this.directoryRoot.replace(':directoryId', this.directoryId);
    return [
      <ion-content>
        <banner-block/>
        <navbar-block>
          <nav-link-block href={baseUrl}>Home</nav-link-block>
          {['Shopping', 'Food', 'Services'].map(c => <nav-link-block href={baseUrl + c.toLowerCase() + '/'} current={this.category == c.toLowerCase()}>{c}</nav-link-block>)}
          <nav-link-block href={baseUrl + 'contact/'}>Contact</nav-link-block>
        </navbar-block>
        <sub-header-block>
          <field-block class="headline-field" loading={this.loadingCategory} value={this.headline} iconSize="large" readOnly={!this.canWrite} onValueChanged={e => {this.headline = e.detail; this.saveCategory();}} />
        </sub-header-block>
        <content-block>
          <div class="menu-item">
            {this.canWrite ? <business-card-block name="Add new business" description="Add a new business to the list" buttonText="Add" icon="add-circle-outline" onButtonClicked={() => this.addBusiness()}/> : null}
            {this.businesses.map(b => <business-card-block canWrite={this.canWrite} id={b._id} slug={b.slug} name={b.name.split('*').join('')} description={b.description.split('*').join('')} icon={b.icon} href={baseUrl + b.category + '/' + b.slug} onIdChanged={e => this.updateBusinessId(b._id, e.detail)}/>)}
          </div>
        </content-block>
        <content-block>
          <h2>Requests</h2>
          <div class="menu-item">
            {this.loadingRequests ? <p>Loading...</p> : this.requests.length ? this.requests.map(r => <p>{r._id}/{r.idx}</p>) : <p>None</p>}
          </div>
        </content-block>
        <footer-block db={this.directoryFields} baseUrl={baseUrl}/>
      </ion-content>,
    ];
  }
}
