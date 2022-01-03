import { Component, Prop, State, h } from '@stencil/core';
import { store } from '@stencil/redux';
import { loadDirectory, setDirectoryField, setHome } from '../../state/actions/directory';

@Component({
  tag: 'directory-page',
  styleUrl: 'directory-page.css',
})
export class DirectoryPage {
  @Prop() directoryId: string;
  @Prop() directoryRoot: string;

  @State() canWrite: string;
  @State() loading: boolean;
  @State() loadedDirectoryId: string;
  @State() homeDirectoryId: string;

  @State() townName: string;
  @State() headline: string;
  @State() introText: string;

  loadDirectory: (...args: any) => any;
  setDirectoryField: (...args: any) => any;
  setHome: (...args: any) => any;

  componentWillLoad() {
    store.mapStateToProps(this, state => {
      const {
        directory: { canWrite, loading, loadedDirectoryId, homeDirectoryId, townName, headline, introText },
      } = state;
      return { canWrite, loading, loadedDirectoryId, homeDirectoryId, townName, headline, introText };
    });
    store.mapDispatchToProps(this, { loadDirectory, setDirectoryField, setHome });
    return this.loadDirectory(this.directoryId);
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
          <field-block slot="left" class="headline-field" loading={this.loading} value={this.headline} iconSize="large" readOnly={!this.canWrite} onValueChanged={e => this.setDirectoryField('headline', e.detail)}/>
          <field-block slot="left" class="intro-text-field" loading={this.loading} value={this.introText} iconSize="large" readOnly={!this.canWrite} onValueChanged={e => this.setDirectoryField('introText', e.detail)}/>
          <div class="buttons" slot="left">
            <ion-button slot="left" href={baseUrl + 'shopping/'} strong={true}>Find a Shop</ion-button>
            {this.loadedDirectoryId != this.homeDirectoryId ? <ion-button slot="left" onClick={() => this.setHome()} strong={true}>Make Home</ion-button> : null}
          </div>
          <map-block id="local-map" slot="right" latitude={51.2869} longitude={-0.7526} zoom={13}/>
        </header-block>
        <footer-block showDirectoryFields={true} baseUrl={baseUrl}/>
      </ion-content>,
    ];
  }
}
