import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Image } from '../models/image.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ImageService {

  public apiUrl = environment.apiUrlProd;

  constructor( private http: HttpClient ) { }

  getImages( token: string ): Observable<Image[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
          .set('Authorization', token);
    return this.http.get<Image[]>(`${ this.apiUrl }images/`, { headers })
        .pipe(map((resp: any) => resp.images));
  }

  deleteImage( token: string, id: string): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', token);
    return this.http.delete<any>(`${ this.apiUrl }images/${ id }`, { headers });
  }

}
