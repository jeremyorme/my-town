import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'content-block',
  styleUrl: 'content-block.css',
  shadow: true,
})
export class ContentBlock {

  render() {
    return (
      <Host>
        <div class="content-section">
          <div class="container">
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }

}
