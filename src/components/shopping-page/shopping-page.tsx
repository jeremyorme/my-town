import { Component, Prop, State, h } from '@stencil/core';
import { MainDb } from '../../helpers/main-db';

@Component({
  tag: 'shopping-page',
  styleUrl: 'shopping-page.css',
})
export class ShoppingPage {
  @Prop() db: MainDb;

  @State() shops: any[] = [];

  async componentWillLoad() {
    this.shops = await this.db.businessDb.db.query(b => b.category == 'shopping');
  }

  render() {
    return [
      <ion-content>
        <banner-block/>
        <navbar-block>
          <nav-link-block href="#/">Home</nav-link-block>
          <nav-link-block href="#/shopping/" current={true}>Shopping</nav-link-block>
          <nav-link-block href="#/food/">Food</nav-link-block>
          <nav-link-block href="#/services/">Services</nav-link-block>
          <nav-link-block href="#/contact/">Contact</nav-link-block>
        </navbar-block>
        <sub-header-block>
          <h1><strong>Excellent</strong> quality products from <strong>local</strong> retailers</h1>
        </sub-header-block>
        <content-block>
          <div class="menu-item">
            {this.db.canWrite() ? <business-card-block name="Add new business" description="Add a new business to the list" buttonText="Add" icon="add-circle-outline" href="#/shopping/new-business"/> : null}
            {this.shops.map(s => <business-card-block name={s.name.split('*').join('')} description={s.description.split('*').join('')} icon={s.icon} href={'#/' + s.category + '/' + s._id}/>)}
          </div>
        </content-block>
        <footer-block/>
      </ion-content>,
    ];
  }
}
