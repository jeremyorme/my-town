import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'header-block',
  styleUrl: 'header-block.css',
  shadow: true,
})
export class HeaderBlock {
  @Prop() imageSrc: string;
  //            <img class="hero-image" src={this.imageSrc}/>

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
