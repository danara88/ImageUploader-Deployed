import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor() { }

  makeFilesRequest (path: string, files: Array<File>, params: Array<string>, token: string, name: string) {
    return new Promise((resolve, reject) => {
      const formData:any = new FormData();
      const xhr = new XMLHttpRequest();

      for(let i = 0; i < files.length; i++) {
        formData.append(name, files[i], files[i].name);
      }

      xhr.onreadystatechange = function() {
        if ( xhr.readyState === 4 && xhr.status === 200) {
          resolve( JSON.stringify(xhr.response) );
        } else {
          reject(xhr.response);
        }
      }

      xhr.open('POST', path, true);
      xhr.setRequestHeader('Authorization', token);
      xhr.send( formData );

    });
  }
}
