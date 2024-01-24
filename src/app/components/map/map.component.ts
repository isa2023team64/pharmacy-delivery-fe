import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Company } from '../../company/model/company.model';
import { CompanyService } from '../../company/company.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as L from 'leaflet';
import { Coordinates } from '../../infrastructure/rest/model/coordinates.model';


@Component({
  selector: 'pd-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapDeliveryComponent implements OnInit, AfterViewInit {

  private map!: L.Map;

  startCoordinates: Coordinates = new Coordinates(45.267136, 19.833549);
  endCoordinates: Coordinates = new Coordinates(45.21, 19.73);


  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void { 
    this.initMap();
    this.addMarkers();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 45.267136,  19.833549 ],
      zoom: 10
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }


  private addMarkers(): void {
    // Example marker at the center of the map
    const markerIcon = L.icon({
      iconUrl: '../../../../assets/icons/marker_icon_red.png',
      iconSize: [40, 40],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30]
    });

    const goalIcon = L.icon({
      iconUrl: '../../../../assets/icons/goal_icon_red.png',
      iconSize: [40, 40],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30]
    });

    const deliveryIcon = L.icon({
      iconUrl: '../../../../assets/icons/delivery_icon.png',
      iconSize: [40, 40],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30]
    });
  
    const start = L.marker([this.startCoordinates.latitude,  this.startCoordinates.longitude], { icon: markerIcon }).addTo(this.map);

    const goal = L.marker([this.endCoordinates.latitude,  this.endCoordinates.longitude], { icon: goalIcon }).addTo(this.map);

    const delivery = L.marker([this.startCoordinates.latitude,  this.startCoordinates.longitude], { icon: deliveryIcon }).addTo(this.map);


    start.bindPopup('Start').openPopup();
    goal.bindPopup('Goal').openPopup();
    delivery.bindPopup('Delivery').openPopup();
  }

  private startDelivery():void{

  }  


}
