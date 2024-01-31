import { Injectable } from '@angular/core';

import { Expedientes } from '../models/expedientes';
import { Empresas } from '../models/empresas.model';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

const base_url =environment.base_url;



@Injectable({
  providedIn: 'root'
})
export class ExpedientesService {

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


  cargar(desde: number =0,cuantos: number =10, idmarca :Number = 0, nombre :string="")
  {
    const url = `${ base_url }/ExpedientesSQL?desde=${desde}&elementos=${cuantos}&idmarca=${idmarca}&nombre=${nombre}`;
 console.log(url);

    return this.http.get(url,this.headers);
  }


  crear(item : Expedientes)
  {
      console.log('creando');
      console.log(item);
      
      return this.http.post(`${ base_url }/ExpedientesSQL/`,item,this.headers);
  }

  modificar(item : Expedientes)
  {
      console.log('modificar');
      console.log(item);
      
      const {id } =item;

    var respuesta =this.http.put(`${ base_url }/ExpedientesSQL/${id}`,item,this.headers) 
    console.log(respuesta);
    return respuesta;
  }

  eliminar(item : Expedientes)
  {
    const url = `${ base_url }/ExpedientesSQL/${item.id}`;
    console.log(url);
    return this.http.delete(url,this.headers);
  }

}

