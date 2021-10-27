import { Component, Host, Prop, State, Event, EventEmitter, h } from '@stencil/core';

@Component({
  tag: 'field-block',
  styleUrl: 'field-block.css',
  shadow: true
})
export class FieldBlock {
  @Prop() value: string;
  @Prop() iconSize: string;
  @Prop() readOnly: boolean;
  @Prop() isLink: boolean;

  @Event() valueChanged: EventEmitter<string>;

  @State() isEditing: boolean = false;

  textInput: HTMLElement;

  render() {
    return (
      <Host>
        {this.isEditing ? <div class="field">
          <span class="content editing" contenteditable={true} ref={el => this.textInput = el as HTMLElement}>{this.value}</span>
          <ion-icon class="editing-icon" name="checkmark-done-outline" size={this.iconSize} onClick={() => {this.isEditing = false; this.valueChanged.emit(this.textInput.innerText);}}/>
          <ion-icon class="editing-icon" name="close-outline" size={this.iconSize} onClick={() => {this.isEditing = false}}/>
        </div> : <div class="field">
          {this.isLink ? <a href={this.value} target="_blank">{this.value}</a> :
            <span class="content">{this.value.split('*').map((s, i) => s.length == 0 ? null : i % 2 == 0 ? <span>{s}</span> : <strong>{s}</strong>)}</span>}
          {!this.readOnly ? <ion-icon class="editing-icon" name="create-outline" size={this.iconSize} onClick={() => {this.isEditing = true}}/> : null}
        </div>}
      </Host>
    );
  }

}
