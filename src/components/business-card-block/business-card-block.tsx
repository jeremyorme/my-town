import { Component, Host, Prop, Event, EventEmitter, h } from '@stencil/core';
import { BusinessEntry, BusinessEntryId } from '../../state/root';

@Component({
  tag: 'business-card-block',
  styleUrl: 'business-card-block.css',
  shadow: true,
})
export class BusinessCardBlock {
  @Prop() canWrite: boolean;
  @Prop() businessEntryId: BusinessEntryId;
  @Prop() group: string;
  @Prop() slug: string;
  @Prop() name: string;
  @Prop() description: string;
  @Prop() icon: string;
  @Prop() href: string;
  @Prop() buttonText: string = 'Shop';
  @Prop() visible: boolean;

  @Event() buttonClicked: EventEmitter<void>;
  @Event() deleteClicked: EventEmitter<void>;
  @Event() fieldChanged: EventEmitter<Partial<BusinessEntry>>;

  notifyIdChanged(idStr: string) {
    const idParts = idStr.split('/');
    if (idParts.length != 2 || parseInt(idParts[1]) == NaN) {
      alert('ID must be format: hash/index');
      return;
    }
    const _id: BusinessEntryId = {
      businessesId: idParts[0],
      businessIdx: parseInt(idParts[1])
    };
    this.fieldChanged.emit({_id});
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
            <h6>{this.name}{this.canWrite && this.businessEntryId.businessesId != 'not-set' ? <div class="icons"><ion-icon class="icon" name="trash" size="small" onClick={() => this.notifyDelete()}/><ion-icon class="icon" name={this.visible ? 'eye' : 'eye-off'} onClick={() => this.fieldChanged.emit({visible: !this.visible})}/></div> : null}</h6>
          </div>
          <div class="business-description">
            <p>{this.description}</p>
          </div>
          {this.canWrite ? [<div class="business-slug-label detail">Slug:</div>,<div class="business-slug-edit"><field-block class="field detail" value={this.slug} readOnly={false} iconSize="small" onValueChanged={e => this.fieldChanged.emit({slug: e.detail})}/></div>] : null}
          {this.canWrite ? [<div class="business-id-label detail">ID:</div>,<div class="business-id-edit"><field-block class="field detail" value={this.businessEntryId.businessesId + '/' + this.businessEntryId.businessIdx} readOnly={false} iconSize="small" onValueChanged={e => this.notifyIdChanged(e.detail)}/></div>] : null}
          {this.canWrite ? [<div class="business-group-label detail">Group:</div>,<div class="business-group-edit"><field-block class="field detail" value={this.group} readOnly={false} iconSize="small" onValueChanged={e => this.fieldChanged.emit({group: e.detail})}/></div>] : null}
          <div class="business-buttons">
            <a class="shop-button" href={this.href} onClick={() => this.buttonClicked.emit()}>{this.buttonText}</a>
          </div>
        </div>
      </Host>
    );
  }

}
