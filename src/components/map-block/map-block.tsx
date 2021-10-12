import { Component, Host, Prop, h } from '@stencil/core';
import { map, TileLayer, marker } from 'leaflet';

@Component({
  tag: 'map-block',
  styleUrl: 'map-block.css',
  shadow: true
})
export class MapBlock {

  @Prop() longitude: number = -0.3;
  @Prop() latitude: number = 51.5;
  @Prop() zoom: number = 10;

  mapDiv: HTMLElement;
  mapObj: map;

  render() {
    return (
      <Host>
        <div class="map" ref={(el) => this.mapDiv = el}/>
      </Host>
    );
  }

  componentDidLoad() {
    setTimeout(() => {
      const mapOptions = {
        center: [this.latitude, this.longitude],
        zoom: this.zoom,
        layers: [new TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')],
        dragging: false
      };
      this.mapObj = map(this.mapDiv, mapOptions);
      marker([this.latitude, this.longitude]).addTo(this.mapObj);
    }, 100);
  }

  componentWillRender() {
    this.mapObj.invalidateSize();
  }

}
