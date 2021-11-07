import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'banner-block',
  styleUrl: 'banner-block.css',
  shadow: true,
})
export class BannerBlock {

  render() {
    return (
      <Host>
        <div class="banner">
          <div class="banner-wrap">
            <span class="notice-text">The best locally owned shops in Farnborough. <a href={'#/shopping/'} class="white-link">Shop Now!</a></span>
          </div>
        </div>
      </Host>
    );
  }

}
