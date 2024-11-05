import { Component } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'Maps-root',
  templateUrl: 'Maps.component.html',
  styleUrls: ['Maps.component.scss'],
})
export class MapsComponent {
  constructor() {
    this.requestPermissions();
  }

  async requestPermissions() {
    await Geolocation.requestPermissions();
  }
}