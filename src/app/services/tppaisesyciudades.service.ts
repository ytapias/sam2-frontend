import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

import {  paisesyciudades } from '../models/paisesyciudades.model';


const base_url =environment.base_url;

@Injectable({
  providedIn: 'root'
})


export class TppaisesyciudadesService {

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
 //public tiposdetalle:paisesyciudades[]=[];


  cargar(desde: number =0,cuantos: number =10, espais :Number = 0, nombre :string="")
  {
    const url = `${ base_url }/paisesyciudadesSQL?desde=${desde}&elementos=${cuantos}&espais=${espais}&nombre=${nombre}`;
    return this.http.get(url,this.headers);
  }


  crear(item : paisesyciudades)
  {
      console.log('creando');
      console.log(item);
      
      return this.http.post(`${ base_url }/paisesyciudadesSQL/`,item,this.headers);
  }

  modificar(item : paisesyciudades)
  {
      console.log('modificar');
      console.log(item);
      
      const {id } =item;

    var respuesta =this.http.put(`${ base_url }/paisesyciudadesSQL/${id}`,item,this.headers) 
    console.log(respuesta);
    return respuesta;
  }

  eliminar(item : paisesyciudades)
  {
    const url = `${ base_url }/paisesyciudadesSQL/${item.id}`;
    console.log(url);
    return this.http.delete(url,this.headers);
  }


}
