import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'footer-block',
  styleUrl: 'footer-block.css',
  shadow: true,
})
export class FooterBlock {
  @Prop() instagram: string;
  @Prop() twitter: string;
  @Prop() youtube: string;

  render() {
    return (
      <Host>
        <div class="footer">
          <div class="container">
            <div class="footer-grid">
              <div class="footer-column col-1">
                <div class="footer-logo"/>
                <p>Promoting locally owned businesses in Farnborough.</p>
              </div>
              <div class="footer-column col-2">
                <div class="title">Farnborough</div>
                <a href="#/">Home</a>
                <a href="#/shopping/">Shopping</a>
                <a href="#/food/">Food</a>
                <a href="#/services/">Services</a>
                <a href="#/contact/">Contact</a>
              </div>
              <div class="footer-column col-3">
                <div class="title">My Town</div>
                <a href="#/mission/">Mission</a>
                <a href="https://github.com/jeremyorme/my-town/">Github</a>
                <a href="#/install/">Install</a>
                <a href="https://github.com/jeremyorme/my-town/issues">Issues</a>
                <a href="#/admin/">Admin</a>
              </div>
              <div class="footer-column col-4">
                <div class="title">Legal</div>
                <a href="#/tandcs/">T&amp;Cs</a>
                <a href="#/privacy/">Privacy</a>
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
