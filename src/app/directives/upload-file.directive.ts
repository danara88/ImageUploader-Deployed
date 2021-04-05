import { Directive, Output, EventEmitter, HostListener, Input } from '@angular/core';
import { FileItem } from '../models/fileItem.model';
import { UploadService } from '../services/upload.service';
import { environment } from '../../environments/environment';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Directive({
  selector: '[appUploadFile]'
})
export class UploadFileDirective {
  public urlApi: string;
  public token: string;
  @Input()  public filesToUpload: FileItem[];
  @Output() public mouseIsHover: EventEmitter<boolean>;
  constructor( private uploadService: UploadService, private userService: UserService, private router: Router ) {
    this.urlApi = environment.apiUrlProd;
    this.token = this.userService.getToken();
    this.mouseIsHover = new EventEmitter();
    this.filesToUpload = [];
  }

  @HostListener('dragover', ['$event'])
  mouseIsOver( event ): void {
    this.mouseIsHover.emit(true);
    this._preventOpen( event );
  }

  @HostListener('dragleave', ['$event'])
  mouseIsNotOver( event ): void {
    this.mouseIsHover.emit(false);
    this._preventOpen( event );
  }

  @HostListener('drop', ['$event'])
  async dropFile( event ) {

    this._preventOpen( event );

    this.mouseIsHover.emit(false);

    const transference = this._transferFile( event );

    if ( !transference ) {
      return;
    };

    await this._extractFiles( transference.files );
    
  }

  private _preventOpen( event ): void {
    event.preventDefault();
    event.stopPropagation();
  }

  private _transferFile( event ): any {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }


  private async _extractFiles( filesInEvent: FileList ): Promise<any> {
      return new Promise((resolve, reject) => {
        let result = false;
        for ( const property of Object.getOwnPropertyNames(filesInEvent) ) {
          const tempFile: File = filesInEvent[property];
  
          // Verificar si el archivo esta preparado para subirse
          if ( this._isPreparedToBeLoaded( tempFile ) ) {
            const fileItem: FileItem = new FileItem(tempFile);
            this.filesToUpload.push( fileItem );
            // console.log(this.filesToUpload);
           
            // subir al servidor las imágenes
            this.uploadService.makeFilesRequest(this.urlApi + 'images/', [tempFile], [], this.token, 'image')
              .then((resp) => {
               result = true;
              })
              .catch( err => { 
                result = false;
               });
          }
  
        }

        this.router.navigate(['home', 2]);
       
      });
  }


  private _isPreparedToBeLoaded( fileToUpload: File ): boolean {
    if ( !this._repeatedImageFile( fileToUpload.name ) && this._isImageFile( fileToUpload ) ) {
      return true;
    }
    return false;
  }

  private _repeatedImageFile( fileName: string ): boolean {
    let result = false;
    this.filesToUpload.forEach( file => {
      if (file.name === fileName) {
        result = true;
      }
    });
    return result;
  }

  private _isImageFile( fileToUpload: File ) {
    return (fileToUpload.type === '' || fileToUpload.type === undefined) ? false : fileToUpload.type.startsWith('image');
  }

}
