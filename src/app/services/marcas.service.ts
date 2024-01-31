import { Injectable } from '@angular/core';
import { Marcas } from '../models/denomi.model';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

const base_url =environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class MarcasService {


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
    const url = `${ base_url }/MarcasSQL?desde=${desde}&elementos=${cuantos}&nombre=${nombre}`;
    return this.http.get(url,this.headers);
  }

  crear(item : Marcas)
  {
      console.log('creando');
      console.log(item);
      
      return this.http.post(`${ base_url }/MarcasSQL/`,item,this.headers);
  }

  modificar(item : Marcas)
  {
      console.log('modificar');
      console.log(item);
      
      const {id } =item;

    var respuesta =this.http.put(`${ base_url }/MarcasSQL/${id}`,item,this.headers) 
    console.log(respuesta);
    return respuesta;
  }

  eliminar(item : Marcas)
  {
    const url = `${ base_url }/MarcasSQL/${item.id}`;
    console.log(url);
    return this.http.delete(url,this.headers);
  }

}
