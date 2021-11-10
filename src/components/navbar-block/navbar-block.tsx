import { Component, Host, State, h } from '@stencil/core';

@Component({
  tag: 'navbar-block',
  styleUrl: 'navbar-block.css',
  shadow: true,
})
export class NavbarBlock {
  @State() menuOpen: boolean = false;
  
  render() {
    return (
      <Host>
        <div class="navbar">
          <div class="navigation-container">
            <div class="navigation-left">
              <a href="/"><div class="img-logo-svg" /></a>
            </div>
            <div class="navigation-right">
              <div class={this.menuOpen ? "menu-button open" : "menu-button"} onClick={() => {this.menuOpen = !this.menuOpen}}>
                <ion-icon name="menu"/>
              </div>
              <div class="cart-button">
                <div class="cart-icon">
                  <svg width="17px" height="17px" viewBox="0 0 17 17"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><path d="M2.60592789,2 L0,2 L0,0 L4.39407211,0 L4.84288393,4 L16,4 L16,9.93844589 L3.76940945,12.3694378 L2.60592789,2 Z M15.5,17 C14.6715729,17 14,16.3284271 14,15.5 C14,14.6715729 14.6715729,14 15.5,14 C16.3284271,14 17,14.6715729 17,15.5 C17,16.3284271 16.3284271,17 15.5,17 Z M5.5,17 C4.67157288,17 4,16.3284271 4,15.5 C4,14.6715729 4.67157288,14 5.5,14 C6.32842712,14 7,14.6715729 7,15.5 C7,16.3284271 6.32842712,17 5.5,17 Z" fill="currentColor" fill-rule="nonzero"></path></g></svg>
                </div>
                <div class="cart-quantity">0</div>
              </div>
              <div class={this.menuOpen ? "nav-menu open" : "nav-menu"}>
                <slot></slot>
              </div>
            </div>
          </div>
        </div>
      </Host>
    );
  }

}
