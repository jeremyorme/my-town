import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'tab-link-block',
  styleUrl: 'tab-link-block.css',
  shadow: true,
})
export class TabLinkBlock {

  render() {
    return (
      <Host>
        <div class="tab-link">
          <slot></slot>
        </div>
      </Host>
    );
  }

}
