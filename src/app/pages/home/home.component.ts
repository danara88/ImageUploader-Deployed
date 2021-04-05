import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { ImageService } from '../../services/image.service';
import { Image } from '../../models/image.model';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {
  public identity: User;
  public token: string;
  public images: Image[];
  public loader: boolean;
  public loadingUploadedFiles: boolean;
  public apiUrl: string;
  public alertMessage: string;
  public status: string;
  public errors: any[];
  constructor( private userService: UserService, private imageService: ImageService, private route: ActivatedRoute, private router: Router) { 
    this.loader = false;
    this.loadingUploadedFiles = false;
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    this.apiUrl = environment.apiUrlProd;
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      const flag = +params.flag;
      
      if (flag === 1) {
        this.getImages();
      }

      if (flag === 2) {
        this.loadingUploadedFiles = true;
        this.getImages();
      }
      
    });

    
  }

  getImages() {
    this.imageService.getImages(this.token).subscribe(images => {
      this.images = images;
      this.loader = false;
      this.loadingUploadedFiles = false;
    });
  }

  deletImage( image: Image ) {
    const idx = this.images.indexOf( image );
    if(idx !== -1) {
      this.images.splice(idx, 1);
    }
    this.imageService.deleteImage(this.token, image._id).subscribe(resp => {
      this.loader = false;
      // this.getImages();
      this.status = 'success';
      this.alertMessage = resp.message;
    }, error => {
      this.loader = false;
      this.errors = error.error.errors;
      this.status = 'error';
    });
  }

}
