import { Injectable } from '@angular/core';

import { Gestiones } from '../models/gestiones';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';



const base_url =environment.base_url ;


@Injectable({
  providedIn: 'root'
})
export class GestionesService {

  public gestiones: Gestiones []=[];

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


  cargar(desde: number =0,cuantos: number =10, idexpediente :Number = 0, nombre :string="",idgestion :Number = 0)
  {
    const url = `${ base_url }/GestionesSQL?desde=${desde}&elementos=${cuantos}&idexpediente=${idexpediente}&expediente=${nombre}&idgestion=${idgestion}`;
 console.log(url);

    return this.http.get(url,this.headers);
  }


  crear(item : Gestiones)
  {
      console.log('creando');
      console.log(item);
      
      return this.http.post(`${ base_url }/GestionesSQL/`,item,this.headers);
  }

  modificar(item : Gestiones)
  {
      console.log('modificar');
      console.log(item);
      
      const {id } =item;

    var respuesta =this.http.put(`${ base_url }/GestionesSQL/${id}`,item,this.headers) 
    console.log(respuesta);
    return respuesta;
  }

  eliminar(item : Gestiones)
  {
    const url = `${ base_url }/GestionesSQL/${item.id}`;
    console.log(url);
    return this.http.delete(url,this.headers);
  }

}

