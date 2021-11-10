import { Component, Prop, State, h } from '@stencil/core';
import { MainDb } from '../../helpers/main-db';

@Component({
  tag: 'shopping-page',
  styleUrl: 'shopping-page.css',
})
export class ShoppingPage {
  @Prop() db: MainDb;
  @Prop() category: string;

  @State() businesses: any[] = [];
  @State() headline: string = '*Excellent* quality products from *local* retailers';

  async loadBusinessData() {
    await this.db.businessDb.load();
    this.businesses = await this.db.businessDb.query(this.category);
  }

  async loadCategoryData() {
    await this.db.categoryDb.load();
    const cat = await this.db.categoryDb.query(this.category);
    if (cat.length > 0)
      this.headline = cat[0].headline;
  }

  async componentWillLoad() {
    await this.loadBusinessData();
    await this.loadCategoryData();
    this.db.businessDb.onChange(() => { return this.loadBusinessData(); });
    this.db.categoryDb.onChange(() => { return this.loadCategoryData(); });
  }

  async save() {
    const category = {
      _id: this.category,
      headline: this.headline
    };

    await this.db.categoryDb.db.put(category);
  }

  render() {
    return [
      <ion-content>
        <banner-block/>
        <navbar-block>
          <nav-link-block href="#/">Home</nav-link-block>
          <nav-link-block href="#/shopping/" current={this.category == 'shopping'}>Shopping</nav-link-block>
          <nav-link-block href="#/food/" current={this.category == 'food'}>Food</nav-link-block>
          <nav-link-block href="#/services/" current={this.category == 'services'}>Services</nav-link-block>
          <nav-link-block href="#/contact/">Contact</nav-link-block>
        </navbar-block>
        <sub-header-block>
          <field-block class="headline-field" value={this.headline} iconSize="large" readOnly={!this.db.canWrite()} onValueChanged={e => {this.headline = e.detail; this.save();}} />
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
