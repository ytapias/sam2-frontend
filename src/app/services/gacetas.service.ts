import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


const base_url =environment.base_url ;


@Injectable({
  providedIn: 'root'
})


export class GacetasService {

  
 

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

  cargar(desde: number =0,cuantos: number =10,  nombre :string="")
  {
    const url = `${ base_url }/gacetasSQL?desde=${desde}&elementos=${cuantos}&nombre=${nombre}`;
    return this.http.get(url,this.headers);
  }
 }
