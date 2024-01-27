import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import jsQR from 'jsqr'; 


@Component({
  selector: 'pd-reservation-takeover-qr',
  templateUrl: './reservation-takeover-qr.component.html',
  styleUrls: ['./reservation-takeover-qr.component.css'] 
})
export class ReservationTakeoverQRComponent {

    qrCodeValue: string = ''; // Set a default QR code value
    decodedResult: string | null = null;



    constructor(
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {

    }

    
  onImageInputChange(event: any): void {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');

          canvas.width = img.width;
          canvas.height = img.height;

          context?.drawImage(img, 0, 0, img.width, img.height);

          const imageData = context?.getImageData(0, 0, img.width, img.height);

          if (imageData) {
            const decodedData = this.decodeQrCode(imageData.data, img.width, img.height);

            if (decodedData) {
              console.log('Decoded QR Code:', decodedData);
              this.decodedResult = decodedData;
            } else {
              console.log('No QR Code found in the image.');
              this.decodedResult = null;
            }
          }
        };

        img.src = e.target?.result as string;
      };

      reader.readAsDataURL(file);
    }
  }

  private decodeQrCode(imageData: Uint8ClampedArray, width: number, height: number): string | null {
    const code = jsQR(imageData, width, height);
    return code ? code.data : null;
  }

}
