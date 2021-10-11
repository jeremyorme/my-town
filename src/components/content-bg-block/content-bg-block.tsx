import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'content-bg-block',
  styleUrl: 'content-bg-block.css',
  shadow: true,
})
export class ContentBgBlock {

  render() {
    return (
      <Host>
        <div class="content-section-bg">
          <div class="container">
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }

}
