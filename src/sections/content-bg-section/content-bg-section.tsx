import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'content-bg-section',
  styleUrl: 'content-bg-section.css'
})
export class ContentBgSection {

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
