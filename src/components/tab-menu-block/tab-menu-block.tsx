import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'tab-menu-block',
  styleUrl: 'tab-menu-block.css',
  shadow: true,
})
export class TabMenuBlock {

  render() {
    return (
      <Host>
        <div class="tab-menu">
          <slot></slot>
        </div>
      </Host>
    );
  }

}
