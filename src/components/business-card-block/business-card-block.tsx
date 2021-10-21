import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'business-card-block',
  styleUrl: 'business-card-block.css',
  shadow: true,
})
export class BusinessCardBlock {
  @Prop() name: string;
  @Prop() description: string;
  @Prop() icon: string;
  @Prop() href: string;
  @Prop() buttonText: string = 'Shop';

  render() {
    return (
      <Host>
        <div class="business-card">
          <ion-icon class="business-icon" name={this.icon}/>
          <div class="business-card-content">
            <h6>{this.name}</h6>
            <p>{this.description}</p>
            <a class="shop-button" href={this.href}>{this.buttonText}</a>
          </div>
        </div>
      </Host>
    );
  }

}
