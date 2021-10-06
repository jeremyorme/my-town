import { Component, Host, Prop, h } from '@stencil/core';
import { map, TileLayer } from 'leaflet';

@Component({
  tag: 'map-block',
  styleUrl: 'map-block.css',
})
export class MapBlock {

  @Prop() longitude: number = -0.3;
  @Prop() latitude: number = 51.5;
  @Prop() zoom: number = 10;

  render() {
    return (
      <Host>
        <div id="mapid"/>
      </Host>
    );
  }

  componentDidLoad() {
    setTimeout(() => {
      const mapOptions = {
        center: [this.latitude, this.longitude],
        zoom: this.zoom
      };
      const businessMap = map('mapid', mapOptions);
      const layer = new TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
      businessMap.addLayer(layer);
    }, 100);
  }

}
