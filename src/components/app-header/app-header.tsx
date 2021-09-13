import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'app-header',
  styleUrl: 'app-header.css',
  shadow: true,
})
export class AppHeader {
  @Prop() imageSrc: string;

  render() {
    return (
      <Host>
        <div class="header">
          <div class="container-flex">
            <div class="hero-content">
              <slot></slot>
            </div>
            <div class="hero-image-wrap">
              <img class="hero-image" src={this.imageSrc}/>
            </div>
          </div>
        </div>
      </Host>
    );
  }

}
