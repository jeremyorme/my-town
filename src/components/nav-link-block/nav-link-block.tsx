import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'nav-link-block',
  styleUrl: 'nav-link-block.css',
  shadow: true,
})
export class NavLinkBlock {
  
  @Prop() current: boolean;
  @Prop() href: string;

  render() {
    return (
      <Host>
        <div class={this.current ? "nav-link current" : "nav-link"}>
          <a href={this.href}><slot></slot></a>
        </div>
      </Host>
    );
  }

}
