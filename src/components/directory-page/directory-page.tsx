import { Component, Prop, State, h } from '@stencil/core';
import { MainDb } from '../../helpers/main-db';
import { DirectoryFieldsDb } from '../../helpers/directory-fields-db';

@Component({
  tag: 'directory-page',
  styleUrl: 'directory-page.css',
})
export class DirectoryPage {
  @Prop() db: MainDb;
  @Prop() directoryId: string;
  @Prop() directoryRoot: string;

  @State() resolvedDirectoryId: string;
  @State() homeDirectoryId: string;

  @State() directoryFields: DirectoryFieldsDb;
  @State() townName: string;
  @State() headline: string;
  @State() introText: string;
  @State() canWrite: string;

  @State() loading: boolean = true;

  loadDirectoryFields() {
    this.canWrite = this.directoryFields.canWrite();
    this.townName = this.directoryFields.getTownName();
    this.headline = this.directoryFields.getHeadline();
    this.introText = this.directoryFields.getIntroText();
    console.log(this.introText);
  }

  async componentWillLoad() {
    const directory = await this.db.directory(this.directoryId);
    this.resolvedDirectoryId = directory.id();
    this.homeDirectoryId = this.db.localStorage.getHomeDirectoryId() || this.resolvedDirectoryId;
    this.db.localStorage.onChange(() => {
      this.homeDirectoryId = this.db.localStorage.getHomeDirectoryId() || this.resolvedDirectoryId;      
    });

    this.directoryFields = directory.directoryFields;
    this.loadDirectoryFields();
    this.directoryFields.onChange(() => {
      this.loadDirectoryFields();
    });
    this.loading = false;
  }

  render() {
    const baseUrl = this.directoryRoot.replace(':directoryId', this.directoryId);
    return [
      <ion-content>
        <banner-block townName={this.townName}/>
        <navbar-block>
          <nav-link-block href={baseUrl} current={true}>Home</nav-link-block>
          {['Shopping', 'Food', 'Services', 'Contact'].map(c => <nav-link-block href={baseUrl + c.toLowerCase() + '/'}>{c}</nav-link-block>)}
        </navbar-block>
        <header-block>
          <field-block slot="left" class="headline-field" loading={this.loading} value={this.headline} iconSize="large" readOnly={!this.canWrite} onValueChanged={e => {this.directoryFields.setHeadline(e.detail)}} />
          <field-block slot="left" class="intro-text-field" loading={this.loading} value={this.introText} iconSize="large" readOnly={!this.canWrite} onValueChanged={e => {this.directoryFields.setIntroText(e.detail)}} />
          <div class="buttons" slot="left">
            <ion-button slot="left" href={baseUrl + 'shopping/'} strong={true}>Find a Shop</ion-button>
            {!this.loading && this.resolvedDirectoryId != this.homeDirectoryId ? <ion-button slot="left" onClick={() => this.db.localStorage.setHomeDirectoryId(this.resolvedDirectoryId)} strong={true}>Make Home</ion-button> : null}
          </div>
          <map-block id="local-map" slot="right" latitude={51.2869} longitude={-0.7526} zoom={13}/>
        </header-block>
        <footer-block db={this.directoryFields} baseUrl={baseUrl}/>
      </ion-content>,
    ];
  }
}
