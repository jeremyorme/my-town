import { Component, Host, Prop, Event, EventEmitter, h } from '@stencil/core';
import { BusinessEntryId } from '../../state/root';

@Component({
  tag: 'business-card-block',
  styleUrl: 'business-card-block.css',
  shadow: true,
})
export class BusinessCardBlock {
  @Prop() canWrite: boolean;
  @Prop() businessEntryId: BusinessEntryId;
  @Prop() slug: string;
  @Prop() name: string;
  @Prop() description: string;
  @Prop() icon: string;
  @Prop() href: string;
  @Prop() buttonText: string = 'Shop';

  @Event() buttonClicked: EventEmitter<void>;
  @Event() idChanged: EventEmitter<BusinessEntryId>;
  @Event() slugChanged: EventEmitter<string>;
  @Event() deleteClicked: EventEmitter<void>;

  notifyIdChanged(idStr: string) {
    const idParts = idStr.split('/');
    if (idParts.length != 2 || parseInt(idParts[1]) == NaN) {
      alert('ID must be format: hash/index');
      return;
    }
    const businessEntryId: BusinessEntryId = {
      businessesId: idParts[0],
      businessIdx: parseInt(idParts[1])
    };
    this.idChanged.emit(businessEntryId);
  }

  notifyDelete() {
    this.deleteClicked.emit();
  }

  render() {
    return (
      <Host>
        <div class="business-card">
          <div class="business-icon-container">
            <ion-icon class="business-icon" name={this.icon}/>
          </div>
          <div class="business-name">
            <h6>{this.name}{this.canWrite ? <ion-icon class="delete-button" name="trash" size="small" onClick={() => this.notifyDelete()}/> : null}</h6>
          </div>
          <div class="business-description">
            <p>{this.description}</p>
          </div>
          {this.canWrite ? [<div class="business-slug-label detail">Slug:</div>,<div class="business-slug-edit"><field-block class="field detail" value={this.slug} readOnly={false} iconSize="small" isLink={false} onValueChanged={e => this.slugChanged.emit(e.detail)}/></div>] : null}
          {this.canWrite ? [<div class="business-id-label detail">ID:</div>,<div class="business-id-edit"><field-block class="field detail" value={this.businessEntryId.businessesId + '/' + this.businessEntryId.businessIdx} readOnly={false} iconSize="small" isLink={false} onValueChanged={e => this.notifyIdChanged(e.detail)}/></div>] : null}
          <div class="business-buttons">
            <a class="shop-button" href={this.href} onClick={() => this.buttonClicked.emit()}>{this.buttonText}</a>
          </div>
        </div>
      </Host>
    );
  }

}
