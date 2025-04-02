import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment.development';

import {  tiposdetalle } from '../models/tiposdetalle.model';
 

const base_url =environment.base_url;

@Injectable({
  providedIn: 'root'
})




export class TptiposdetalleService {

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
  public tiposdetalle:tiposdetalle[]=[];


  cargar(desde: number =0,cuantos: number =10, idtipos :Number = 0, nombre :string="")
  {
    const url = `${ base_url }/tiposdetalleSQL?desde=${desde}&elementos=${cuantos}&idtipos=${idtipos}&nombre=${nombre}`;

    console.log(url);
    
    return this.http.get(url,this.headers);
  }


  crear(ptiposdetalle : tiposdetalle)
  {
      console.log('creando');
      console.log(ptiposdetalle);
      
      return this.http.post(`${ base_url }/tiposdetalleSQL/`,ptiposdetalle,this.headers);
  }

  modificar(ptiposdetalle : tiposdetalle)
  {
      console.log('modificar');
      console.log(ptiposdetalle);
      
      const {id } =ptiposdetalle;

    var respuesta =this.http.put(`${ base_url }/tiposdetalleSQL/${id}`,ptiposdetalle,this.headers) 
    console.log(respuesta);
    return respuesta;
  }

  eliminar(tptiposdetalle : tiposdetalle)
  {
    const url = `${ base_url }/tiposdetalleSQL/${tptiposdetalle.id}`;
    console.log(url);
    return this.http.delete(url,this.headers);
  }



  /*

      //console.log('creando empresas');
      return this.http.post(`${ base_url }`,formData)
                      .pipe(
                        tap( (resp:any) =>{
                              localStorage.setItem('token',resp.token) 
                        })
                      );
  */


}
