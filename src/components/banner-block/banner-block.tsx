import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'banner-block',
  styleUrl: 'banner-block.css',
  shadow: true,
})
export class BannerBlock {

  @Prop() townName: string;

  render() {
    return (
      <Host>
        <div class="banner">
          <div class="banner-wrap">
            <span class="notice-text">The best locally owned businesses{this.townName ? <span> in {this.townName}. <a href={'#/shopping/'} class="white-link">Shop Now!</a></span> : '!'}</span>
          </div>
        </div>
      </Host>
    );
  }

}
