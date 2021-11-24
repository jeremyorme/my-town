import { Component, Prop, State, h } from '@stencil/core';
import { MainDb } from '../../helpers/main-db';

// https://blog.jayway.com/2017/07/13/open-pdf-downloaded-api-javascript/
function showFile(blob, filename) {
  // It is necessary to create a new blob object with mime-type explicitly set
  // otherwise only Chrome works like it should
  var newBlob = new Blob([blob], {type: "application/json"})

  // IE doesn't allow using a blob object directly as link href
  // instead it is necessary to use msSaveOrOpenBlob
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(newBlob);
    return;
  } 

  // For other browsers: 
  // Create a link pointing to the ObjectURL containing the blob.
  const data = window.URL.createObjectURL(newBlob);
  var link = document.createElement('a');
  link.href = data;
  link.download=filename;
  link.click();
  setTimeout(function(){
    // For Firefox it is necessary to delay revoking the ObjectURL
    window.URL.revokeObjectURL(data);
  }, 100);
}

@Component({
  tag: 'admin-page',
  styleUrl: 'admin-page.css',
})
export class AdminPage {
  @Prop() db: MainDb;
  @State() keyData: string;
  @State() backupPhrase: string = '';
  @State() restorePhrase: string = '';
  @State() dbAddress: string;

  constructor() {
    this.db.onChange(async () => {
      this.dbAddress = this.db.address();
    });
  }

  async backupIdentity() {
    const keyData = await this.db.backupIdentity(this.backupPhrase);
    showFile(keyData, 'my-town-login.json');
  }

  async restoreIdentity() {
    const id = await this.db.restoreIdentity(this.keyData, this.restorePhrase);
    localStorage.setItem('my-town-id', id);
    alert('Identity [' + id + '] restored');
  }

  handleFileSelect(evt) {
    let files = evt.target.files; // FileList object

    // use the 1st file from the list
    let f = files[0];
    
    let reader = new FileReader();

    // Closure to capture the file information.
    reader.onload = (_ => {
        return e => {
          this.keyData = (e.target as any).result;
        };
      })(f);

    // Read in the image file as a data URL.
    reader.readAsText(f);
  }

  render() {
    return [
      <ion-content>
        <banner-block/>
        <navbar-block>
          <nav-link-block href="#/">Home</nav-link-block>
          <nav-link-block href="#/shopping/">Shopping</nav-link-block>
          <nav-link-block href="#/food/">Food</nav-link-block>
          <nav-link-block href="#/services/">Services</nav-link-block>
          <nav-link-block href="#/contact/">Contact</nav-link-block>
        </navbar-block>
        <sub-header-block>
          <h1><strong>Administrator</strong> Settings</h1>
        </sub-header-block>
        <content-block>
          <h3>Download login pass</h3>
          <ion-item>
            <ion-input type="password" placeholder="Enter pass phrase" value={this.backupPhrase} onIonInput={e => this.backupPhrase = (e.target as HTMLInputElement).value}/>
          </ion-item>
          <ion-button onClick={() => this.backupIdentity()} disabled={this.backupPhrase.length < 10}>Download</ion-button>
          <h3>Log-in with pass</h3>
          <form enctype="multipart/form-data">
            <ion-item>
              <ion-input type="password" placeholder="Enter pass phrase" value={this.restorePhrase} onIonInput={e => this.restorePhrase = (e.target as HTMLInputElement).value}/>
            </ion-item>
            <ion-item>
              <ion-label>Log-in pass</ion-label>
              <input id="upload" type="file" accept="application/json" name="files[]" size={30} onChange={e => this.handleFileSelect(e)}/>
            </ion-item>
            <ion-button onClick={() => this.restoreIdentity()} disabled={!this.keyData || this.restorePhrase.length < 10}>Log In</ion-button>
          </form>
          <h3>Database address</h3>
          {this.db.address() || 'Connecting...'}
        </content-block>
        <footer-block/>
      </ion-content>,
    ];
  }
}
