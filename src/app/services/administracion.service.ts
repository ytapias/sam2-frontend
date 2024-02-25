import { Injectable } from '@angular/core';
import { Administracion } from '../models/administracion.model';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

const base_url =environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AdministracionService {

  constructor(private http: HttpClient) { }

  get token():string{
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      headers:
      {
        'x-token':this.token
          }

      };
  }

 // public totalUsuarios :number =0;
 //public tiposdetalle:Empresas[]=[];


  dashboard(item: Administracion)
  {
   // const url = `${ base_url }/compararSQL?cadena1=${cadena1}&cadena2=${cadena2}`;
  //  return this.http.get(url,this.headers);

    return this.http.post(`${ base_url }/administracionSQL/`,item,this.headers);

  }


  
  cargar(desde: number =0,cuantos: number =10, espais :Number = 0, nombre :string="")
  {
    const url = `${ base_url }/compararSQL`;
    return this.http.get(url,this.headers);
  }

}
