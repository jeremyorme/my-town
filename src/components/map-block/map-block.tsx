import { Component, Host, Prop, Watch, h } from '@stencil/core';
import { map, TileLayer, marker, LatLng } from 'leaflet';

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
  markerObj: marker;

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
      this.markerObj = marker([this.latitude, this.longitude]);
      this.markerObj.addTo(this.mapObj);
    }, 100);
  }

  componentWillRender() {
    if (this.mapObj) {
      this.mapObj.invalidateSize();
    }
  }

  @Watch('longitude') longitudeChanged() {
    const latLng = new LatLng(this.latitude, this.longitude);
    if (this.markerObj) {
      this.markerObj.setLatLng(latLng);
    }
    if (this.mapObj) {
      this.mapObj.panTo(latLng);
    }
  }

  @Watch('latitude') latitudeChanged() {
    const latLng = new LatLng(this.latitude, this.longitude);
    if (this.markerObj) {
      this.markerObj.setLatLng(latLng);
    }
    if (this.mapObj) {
      this.mapObj.panTo(latLng);
    }
  }
}
