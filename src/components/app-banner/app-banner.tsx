import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'app-banner',
  styleUrl: 'app-banner.css',
  shadow: true,
})
export class AppBanner {

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
