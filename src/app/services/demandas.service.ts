import { Injectable } from '@angular/core';

import { Demandas } from '../models/demandas';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';


const base_url =environment.base_url ;


@Injectable({
  providedIn: 'root'
})


export class DemandasService {

  public Demandas: Demandas []=[];

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


  cargar(desde: number =0,cuantos: number =10, idexpediente :Number = 0, nombre :string="")
  {
    const url = `${ base_url }/demandasSQL?desde=${desde}&elementos=${cuantos}&idexpediente=${idexpediente}&nombre=${nombre}&expediente=${nombre}`;
    console.log(url);

    return this.http.get(url,this.headers);
  }


  crear(item : Demandas)
  {
      console.log('creando');
      console.log(item);
      
      return this.http.post(`${ base_url }/demandasSQL/`,item,this.headers);
  }

  modificar(item : Demandas)
  {
      console.log('modificar');
      console.log(item);
      
      const {id } =item;

    var respuesta =this.http.put(`${ base_url }/demandasSQL/${id}`,item,this.headers) 
    console.log(respuesta);
    return respuesta;
  }

  eliminar(item : Demandas)
  {
    const url = `${ base_url }/demandasSQL/${item.id}`;
    console.log(url);
    return this.http.delete(url,this.headers);
  }

}

