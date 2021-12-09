import { Component, Host, Prop, Event, EventEmitter, h } from '@stencil/core';

@Component({
  tag: 'business-card-block',
  styleUrl: 'business-card-block.css',
  shadow: true,
})
export class BusinessCardBlock {
  @Prop() canWrite: boolean;
  @Prop() businessId: string;
  @Prop() slug: string;
  @Prop() name: string;
  @Prop() description: string;
  @Prop() icon: string;
  @Prop() href: string;
  @Prop() buttonText: string = 'Shop';

  @Event() buttonClicked: EventEmitter<void>;
  @Event() idChanged: EventEmitter<string>;
  @Event() slugChanged: EventEmitter<string>;

  render() {
    return (
      <Host>
        <div class="business-card">
          <ion-icon class="business-icon" name={this.icon}/>
          <div class="business-card-content">
            <h6>{this.name}</h6>
            <p>{this.description}</p>
            <div class="details">
              {this.canWrite ? <div class="detail">Slug: <field-block class="field" value={this.slug} readOnly={false} iconSize="small" isLink={false} onValueChanged={e => this.slugChanged.emit(e.detail)}/></div> : null}
              {this.canWrite ? <div class="detail">ID: <field-block class="field" value={this.businessId} readOnly={false} iconSize="small" isLink={false} onValueChanged={e => this.idChanged.emit(e.detail)}/></div> : null}
            </div>
            <a class="shop-button" href={this.href} onClick={() => this.buttonClicked.emit()}>{this.buttonText}</a>
          </div>
        </div>
      </Host>
    );
  }

}
