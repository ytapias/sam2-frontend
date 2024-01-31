import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Personas } from '../models/personas';

const base_url =environment.base_url ;


@Injectable({
  providedIn: 'root'
})
export class PersonasService {

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


  cargar(desde: number =0,cuantos: number =10, espais :Number = 0, nombre :string="")
  {
    const url = `${ base_url }/PersonasSQL?desde=${desde}&elementos=${cuantos}&idtipopersona=${espais}&nombre=${nombre}`;
  //  console.log(url);

    return this.http.get(url,this.headers);
  }


  crear(item : Personas)
  {
      console.log('creando');
      console.log(item);
      
      return this.http.post(`${ base_url }/PersonasSQL/`,item,this.headers);
  }

  modificar(item : Personas)
  {
      console.log('modificar');
      console.log(item);
      
      const {id } =item;

    var respuesta =this.http.put(`${ base_url }/PersonasSQL/${id}`,item,this.headers) 
    console.log(respuesta);
    return respuesta;
  }

  eliminar(item : Personas)
  {
    const url = `${ base_url }/PersonasSQL/${item.id}`;
    console.log(url);
    return this.http.delete(url,this.headers);
  }

}

