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
            <span class="notice-text">We're open and available for takeaway &amp; delivery. <a href="order/" class="white-link">Order Now</a></span>
          </div>
        </div>
      </Host>
    );
  }

}
