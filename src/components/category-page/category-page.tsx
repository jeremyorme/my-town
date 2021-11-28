import { Component, Prop, State, h } from '@stencil/core';
import { DirectoryDb } from '../../helpers/directory-db';

@Component({
  tag: 'category-page',
  styleUrl: 'category-page.css',
})
export class CategoryPage {
  @Prop() db: DirectoryDb;
  @Prop() category: string;

  @State() loadingCategory: boolean = true;
  @State() loadingBusinesses: boolean = true;
  @State() businesses: any[] = [];
  @State() headline: string = '';

  async loadBusinessData() {
    await this.db.businessDb.load();
    const businesses = await this.db.businessDb.query(this.category);
    if (businesses) {
      this.businesses = businesses;
      this.loadingBusinesses = false;
    }
    else {
      this.businesses = [];
    }
  }

  async loadCategoryData() {
    await this.db.categoryDb.load();
    const cat = await this.db.categoryDb.get(this.category);
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

  componentWillLoad() {
    this.headline = 'Find *' + this.category + '* businesses';
    this.loadData();
    this.db.businessDb.onChange(() => { return this.loadBusinessData(); });
    this.db.categoryDb.onChange(() => { return this.loadCategoryData(); });
  }

  async save() {
    const category = {
      _id: this.category,
      headline: this.headline
    };

    await this.db.categoryDb.put(category);
  }

  render() {
    return [
      <ion-content>
        <banner-block/>
        <navbar-block>
          <nav-link-block href="#/">Home</nav-link-block>
          {['Shopping', 'Food', 'Services'].map(c => <nav-link-block href={'#/' + c.toLowerCase() + '/'} current={this.category == c.toLowerCase()}>{c}</nav-link-block>)}
          <nav-link-block href="#/contact/">Contact</nav-link-block>
        </navbar-block>
        <sub-header-block>
          <field-block class="headline-field" loading={this.loadingCategory} value={this.headline} iconSize="large" readOnly={!this.db.canWrite()} onValueChanged={e => {this.headline = e.detail; this.save();}} />
        </sub-header-block>
        <content-block>
          <div class="menu-item">
            {this.db.canWrite() ? <business-card-block name="Add new business" description="Add a new business to the list" buttonText="Add" icon="add-circle-outline" href={'#/' + this.category + '/new-business'}/> : null}
            {this.businesses.map(b => <business-card-block name={b.name.split('*').join('')} description={b.description.split('*').join('')} icon={b.icon} href={'#/' + b.category + '/' + b._id}/>)}
          </div>
        </content-block>
        <footer-block/>
      </ion-content>,
    ];
  }
}
