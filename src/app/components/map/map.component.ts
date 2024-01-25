import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Company } from '../../company/model/company.model';
import { CompanyService } from '../../company/company.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as L from 'leaflet';
import { Coordinates } from '../../infrastructure/rest/model/coordinates.model';
import {Stomp} from '@stomp/stompjs';
import SockJS, * as WebSocketJS from 'sockjs-client';



@Component({
  selector: 'pd-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapDeliveryComponent implements OnInit, AfterViewInit {

  private map!: L.Map;

  private serverUrl = "http://localhost:8080/ws";
  private stompClient: any;

  isLoaded: boolean = false;
  isCustomSocketOpened: boolean = false;



  startCoordinates: Coordinates = new Coordinates(45.267136, 19.833549);
  endCoordinates: Coordinates = new Coordinates(45.21, 19.73);
  coordinatesList: Coordinates[]=[];

  constructor() { 

  }

  ngOnInit(): void {
    // this.coordinatesList.push(this.startCoordinates);
    // this.coordinatesList.push(this.endCoordinates);
    this.initializeWebSocketConnection();
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

  public startDelivery(): void{

    const coordinatesList: Coordinates[] = [this.startCoordinates, this.endCoordinates];
    console.log(coordinatesList);

    // if (!this.stompClient.connected) {
    //   console.error('WebSocket connection is not established.');
    //   return;
    // }

    this.sendMessageUsingSocket();
    
  }  


  initializeWebSocketConnection() {
    // serverUrl je vrednost koju smo definisali u registerStompEndpoints() metodi na serveru
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;

    const headers = { 'Authorization': `Bearer ${localStorage.getItem("jwt")}` };

    this.stompClient.configure({
      websocket: true,
      debug: (str: string) => {
          console.log(str);
      },
      headers: headers,
      withCredentials: true  // Set withCredentials to true
  });

    this.stompClient.connect(headers, function () {
      that.isLoaded = true;
      that.openGlobalSocket()
    });

  }

  sendMessageUsingSocket() {
      const message = "Proba";
      
      this.stompClient.send("/ws-subscriber/delivery", {}, JSON.stringify(message));
  }

  openGlobalSocket() {
    if (this.isLoaded) {
      this.stompClient.subscribe("/ws-publisher", (message: { body: string; }) => {
        this.handleResult(message);
      });
    }
  }

  openSocket() {
    if (this.isLoaded) {
      this.isCustomSocketOpened = true;
      this.stompClient.subscribe("/ws-publisher/coordinates", (message: { body: string; }) => {
        this.handleResult(message);
      });
    }
  }

  handleResult(message: { body: string; }) {
    if (message.body) {
      let messageResult: string = JSON.parse(message.body);
    }
  }

}
