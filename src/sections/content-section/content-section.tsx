import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'content-section',
  styleUrl: 'content-section.css',
  shadow: true,
})
export class ContentSection {

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
