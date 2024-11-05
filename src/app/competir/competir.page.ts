import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { FirebaseLoginService } from '../servicios/firebase-login.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

declare var google: any;

interface Marker {
  position: {
    lat: number,
    lng: number,
  };
  title: string;
}

@Component({
  selector: 'app-competir',
  templateUrl: './competir.page.html',
  styleUrls: ['./competir.page.scss'],
})
export class CompetirPage implements OnInit, AfterViewInit {
  distance: string = '';
  duration: string = '';
  map: any;
  destino: any;
  marker: any; 
  origen: any; 
  currentMarker: any;
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  totalDistance: number = 0;

  constructor(
    private logoutFirebase: FirebaseLoginService,
    public toast: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    const storedDistance = localStorage.getItem('totalDistance');
    this.totalDistance = storedDistance ? parseFloat(storedDistance) : 0;
  }
  
  // Método para actualizar la distancia total
  updateTotalDistance(newDistance: number) {
    this.totalDistance += newDistance; // Acumula la nueva distancia al total
    localStorage.setItem('totalDistance', this.totalDistance.toString()); // Guarda en almacenamiento local
  }

  async calculateDistance() {
    if (!this.origen || !this.destino) {
      console.warn('Origen o destino no están definidos.');
      return;
    }

    const service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [this.origen],
        destinations: [this.destino],
        travelMode: google.maps.TravelMode.WALKING,
      },
      (response: any, status: string) => {
        if (status === google.maps.DistanceMatrixStatus.OK) {
          const results = response.rows[0].elements[0];
          this.distance = results.distance.text;
          this.duration = results.duration.text;

          const distanceInKm = results.distance.value / 1000; // 'value' está en metros
          this.updateTotalDistance(distanceInKm);

          console.log(`Distancia: ${this.distance}, Duración: ${this.duration}`);
        } else {
          console.error('Error calculando distancia:', status);
        }
      }
    );
  }

  async getCurrentPosition() {
    return await Geolocation.getCurrentPosition();
  }

  ngAfterViewInit() {
    // Cargamos el mapa una vez que el DOM esté listo
    this.loadMap();
    
  }

  async loadMap() {
    const mapEle: HTMLElement = document.getElementById('map')!;
    const position = await this.getCurrentPosition();

    const latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    this.origen = latLng;

    const mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.WALKING, // Cambiado a ROADMAP
    };

    // Inicializamos el mapa y añadimos el listener en 'idle'
    this.map = new google.maps.Map(mapEle, mapOptions);
    this.directionsDisplay.setMap(this.map); // Aseguramos que directionsDisplay esté vinculado al mapa aquí

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
     

      // Añadimos el listener 'click' al mapa después de que esté cargado
      this.map.addListener('click', (event: any) => {
        if (event && event.latLng) {
          this.destino = event.latLng;

          // Elimina el marcador anterior si existe
          if (this.currentMarker) {
            this.currentMarker.setMap(null);
          }

    

          this.calculateDistance();
          this.calculateRoute(); // Calculamos la ruta al hacer clic en un nuevo destino
        }
      });
    });
  }

  addMarker(marker: Marker) {
    return new google.maps.Marker({
      position: marker.position,
      map: this.map,
      title: marker.title,
    });
  }

  async cerrarsession() {
    const toast = await this.toast.create({
      message: 'Sesión cerrada',
      duration: 2000,
    });
    toast.present();
  }

  logout() {
    this.logoutFirebase.logout();
    this.cerrarsession();
  }

  estadisticas() {
    this.router.navigate(["/estadisticas"]);
  }

  calculateRoute() {
    if (!this.origen || !this.destino) {
      console.warn('Origen o destino no están definidos para la ruta.');
      return;
    }

    this.directionsService.route(
      {
        origin: this.origen, // Uso de this.origen
        destination: this.destino,
        travelMode: google.maps.TravelMode.WALKING,
      },
      (response: any, status: string) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.directionsDisplay.setDirections(response);
        } else {
          alert('No se pudieron mostrar las direcciones debido a: ' + status);
        }
      }
    );
  }
}