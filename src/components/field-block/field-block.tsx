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
  @Prop() loading: boolean = false;

  @Event() valueChanged: EventEmitter<string>;

  @State() isEditing: boolean = false;

  textInput: HTMLElement;

  render() {
    return (
      <Host>
        {this.isEditing ? <div class="field">
          <span class="content editing" contenteditable={true} ref={el => this.textInput = el as HTMLElement}>{this.value}</span>
          <div class="editing-icon"><ion-icon name="checkmark-done-outline" size={this.iconSize} onClick={() => {this.valueChanged.emit(this.textInput.innerText); this.isEditing = false;}}/></div>
          <div class="editing-icon"><ion-icon name="close-outline" size={this.iconSize} onClick={() => {this.isEditing = false}}/></div>
        </div> : <div class={'field' + (this.loading ? ' loading' : '')}>
          {this.isLink ?
            <a href={this.value} target="_blank">{this.value}</a> :
            <div class="content">{this.value.split('\n').map((p, j) => <span>{j != 0 ? <br/> : null}{p.split('*').map((s, i) => s.length == 0 ? null : i % 2 == 0 ? <span>{s}</span> : <strong>{s}</strong>)}</span>)}</div>}
          {!this.readOnly && !this.loading ? <div class="editing-icon"><ion-icon name="create-outline" size={this.iconSize} onClick={() => {this.isEditing = true}}/></div> : null}
        </div>}
      </Host>
    );
  }

}
