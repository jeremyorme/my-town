import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'app-nav-link',
  styleUrl: 'app-nav-link.css',
  shadow: true,
})
export class AppNavLink {
  
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
