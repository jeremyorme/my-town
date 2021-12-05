import { Component, Prop, State, h } from '@stencil/core';
import { MainDb } from '../../helpers/main-db';

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
  @State() businesses: any[] = [];
  @State() headline: string = 'Loading category...';
  @State() canWrite: boolean = false;

  async loadBusinessData() {
    const directory = await this.db.directory(this.directoryId);
    await directory.businesses.load();
    this.canWrite = await directory.businesses.canWrite();
    const businesses = await directory.businesses.query(this.category);
    if (businesses) {
      this.businesses = businesses;
      this.loadingBusinesses = false;
    }
    else {
      this.businesses = [];
    }
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

  async loadData() {
    // Apparently these can't be concurrent
    await this.loadBusinessData();
    await this.loadCategoryData();
  }

  async init() {
    const directory = await this.db.directory(this.directoryId);
    this.headline = 'Find *' + this.category + '* businesses';
    this.loadData();
    directory.businesses.onChange(() => { return this.loadBusinessData(); });
    directory.categories.onChange(() => { return this.loadCategoryData(); });
    directory.onChange(() => {
      this.loadData();
      directory.businesses.onChange(() => { return this.loadBusinessData(); });
      directory.categories.onChange(() => { return this.loadCategoryData(); });
    });
  }

  componentWillLoad() {
    this.init();
  }

  async save() {
    const category = {
      _id: this.category,
      headline: this.headline
    };

    const directory = await this.db.directory(this.directoryId);
    await directory.categories.put(category);
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
          <field-block class="headline-field" loading={this.loadingCategory} value={this.headline} iconSize="large" readOnly={!this.canWrite} onValueChanged={e => {this.headline = e.detail; this.save();}} />
        </sub-header-block>
        <content-block>
          <div class="menu-item">
            {this.canWrite ? <business-card-block name="Add new business" description="Add a new business to the list" buttonText="Add" icon="add-circle-outline" href={baseUrl + this.category + '/new-business'}/> : null}
            {this.businesses.map(b => <business-card-block name={b.name.split('*').join('')} description={b.description.split('*').join('')} icon={b.icon} href={baseUrl + b.category + '/' + b._id}/>)}
          </div>
        </content-block>
        <footer-block baseUrl={baseUrl}/>
      </ion-content>,
    ];
  }
}
