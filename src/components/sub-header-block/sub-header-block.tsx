import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'sub-header-block',
  styleUrl: 'sub-header-block.css',
  shadow: true,
})
export class SubHeaderBlock {

  render() {
    return (
      <Host>
        <div class="header-section">
          <div class="container-flex">
            <img class="cursive-text" src="assets/img/YumYum.png"/>
            <div class="title-wrap-center">
              <slot></slot>
            </div>
          </div>
        </div>
      </Host>
    );
  }

}
