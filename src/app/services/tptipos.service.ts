import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import {  tp_tipos } from '../models/tptipos.model';
import { environment } from 'src/environments/environment.development';

const base_url =environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class TptiposService {

 
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

public totalUsuarios :number =0;
public tipos:tp_tipos[]=[];


  cargarTpTipo(desde: number =0,cuantos: number =5)
  {   
    const url = `${ base_url }/tiposSQL`;
    return this.http.get(url,this.headers);
  }
}
