import { Component, Host, Prop, h } from '@stencil/core';
import { map, TileLayer, marker } from 'leaflet';

@Component({
  tag: 'map-block',
  styleUrl: 'map-block.css',
})
export class MapBlock {

  @Prop() longitude: number = -0.3;
  @Prop() latitude: number = 51.5;
  @Prop() zoom: number = 10;
  @Prop() name: string;

  render() {
    return (
      <Host>
        <div class="map" id={this.name}/>
      </Host>
    );
  }

  componentDidLoad() {
    setTimeout(() => {
      const mapOptions = {
        center: [this.latitude, this.longitude],
        zoom: this.zoom
      };
      const businessMap = map(this.name, mapOptions);
      const layer = new TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
      businessMap.addLayer(layer);
      marker([this.latitude, this.longitude]).addTo(businessMap);
    }, 1000);
  }

}
