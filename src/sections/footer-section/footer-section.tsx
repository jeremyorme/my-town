import { Component, Host, Prop, State, h } from '@stencil/core';
import { store } from '@stencil/redux';
import { loadDirectory, setDirectoryField } from '../../state/actions/directory';

@Component({
  tag: 'footer-section',
  styleUrl: 'footer-section.css',
  shadow: true,
})
export class FooterSection {
  @Prop() directoryId: string;
  @Prop() baseUrl: string;
  @Prop() instagram: string;
  @Prop() twitter: string;
  @Prop() youtube: string;

  @State() townName: string;
  @State() canWrite: boolean;
  @State() loading: boolean;

  loadDirectory: (...args: any) => any;
  setDirectoryField: (...args: any) => any;

  async componentWillLoad() {
    store.mapStateToProps(this, state => {
      const {
        directory: { townName, canWrite, loading },
      } = state;
      return { townName, canWrite, loading };
    });
    store.mapDispatchToProps(this, { loadDirectory, setDirectoryField });
    if (this.directoryId)
      this.loadDirectory(this.directoryId);
  }

  render() {
    return (
      <Host>
        <div class="footer">
          <div class="container">
            <div class="footer-grid">
              <div class="footer-column col-1">
                <div class="footer-logo"/>
                <p>Promoting locally owned businesses{this.directoryId ? <span> in <field-block value={this.townName} readOnly={!this.canWrite} onValueChanged={e => this.setDirectoryField('town-name', e.detail)} /></span> : null}.</p>
              </div>
              {this.directoryId ? <div class="footer-column col-2">
                <div class="title">{this.townName}</div>
                <a href={this.baseUrl}>Home</a>
                <a href={this.baseUrl + 'shopping/'}>Shopping</a>
                <a href={this.baseUrl + 'food/'}>Food</a>
                <a href={this.baseUrl + 'services/'}>Services</a>
                <a href={this.baseUrl + 'contact/'}>Contact</a>
                <a href={this.baseUrl + 'admin/'}>Admin</a>
              </div> : null}
              <div class="footer-column col-3">
                <div class="title">My Town</div>
                <a href={this.baseUrl + 'mission/'}>Mission</a>
                <a href="https://github.com/jeremyorme/my-town/">Github</a>
                <a href={this.baseUrl + 'install/'}>Install</a>
                <a href="https://github.com/jeremyorme/my-town/issues">Issues</a>
              </div>
              <div class="footer-column col-4">
                <div class="title">Legal</div>
                <a href={this.baseUrl + 'tandcs/'}>T&amp;Cs</a>
                <a href={this.baseUrl + 'privacy/'}>Privacy</a>
              </div>
            </div>
            <div class="footer-legal">
              <div class="footer-detail-left">
                <p>Powered by <a href="https://ipfs.io" target="_blank">IPFS</a> and <a href="https://orbitdb.org" target="_blank">OrbitDB</a></p>
              </div>
              <div class="footer-detail-right">
                <div class="social-icon-wrap">
                  <a href={this.instagram} class="social-link"><div class="social-icon-instagram"/></a>
                  <a href={this.twitter} class="social-link"><div class="social-icon-twitter"/></a>
                  <a href={this.youtube} class="social-link"><div class="social-icon-youtube"/></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
