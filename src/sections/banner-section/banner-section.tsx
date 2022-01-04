import { Component, Host, Prop, State, h } from '@stencil/core';
import { store } from '@stencil/redux';
import { loadDirectory } from '../../state/actions/directory';

@Component({
  tag: 'banner-section',
  styleUrl: 'banner-section.css',
  shadow: true,
})
export class BannerSection {
  @Prop() directoryId: string;
  @Prop() baseUrl: string;

  @State() townName: string;
  @State() loading: boolean;

  loadDirectory: (...args: any) => any;

  async componentWillLoad() {
    store.mapStateToProps(this, state => {
      const {
        directory: { townName, loading },
      } = state;
      return { townName, loading };
    });
    store.mapDispatchToProps(this, { loadDirectory });
    if (this.directoryId)
      this.loadDirectory(this.directoryId);
  }

  render() {
    return (
      <Host>
        <div class="banner">
          <div class="banner-wrap">
            <span class="notice-text">The best locally owned businesses{this.directoryId ? <span> in <field-block value={this.townName} readOnly={true}/>. <a href={this.baseUrl + 'shopping/'} class="white-link">Shop Now!</a></span> : '!'}</span>
          </div>
        </div>
      </Host>
    );
  }
}
