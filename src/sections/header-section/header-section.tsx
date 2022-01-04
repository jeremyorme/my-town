import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'header-section',
  styleUrl: 'header-section.css',
  shadow: true,
})
export class HeaderSection {

  render() {
    return (
      <Host>
        <div class="header">
          <div class="container-flex">
            <div class="hero-content">
              <slot name="left"/>
            </div>
            <div class="hero-image-wrap">
              <slot name="right"/>
            </div>
          </div>
        </div>
      </Host>
    );
  }

}
