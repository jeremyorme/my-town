import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'banner-block',
  styleUrl: 'banner-block.css',
  shadow: true,
})
export class BannerBlock {
  @Prop() baseUrl: string = '..';

  render() {
    return (
      <Host>
        <div class="banner">
          <div class="banner-wrap">
            <span class="notice-text">We list the best locally owned businesses in Farnborough. <a href={this.baseUrl + '/shopping/'} class="white-link">Shop Now!</a></span>
          </div>
        </div>
      </Host>
    );
  }

}
