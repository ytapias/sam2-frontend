import { Injectable } from '@angular/core';
import { comparacion } from '../models/comparar';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

const base_url =environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CompararService {

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


  comparar(item: comparacion)
  {
   // const url = `${ base_url }/compararSQL?cadena1=${cadena1}&cadena2=${cadena2}`;
  //  return this.http.get(url,this.headers);

    return this.http.post(`${ base_url }/compararSQL/`,item,this.headers);

  }


  
  cargar(desde: number =0,cuantos: number =10, espais :Number = 0, nombre :string="")
  {
    const url = `${ base_url }/compararSQL`;
    return this.http.get(url,this.headers);
  }


  // crear(item : Empresas)
  // {
  //     console.log('creando');
  //     console.log(item);
      
  //     return this.http.post(`${ base_url }/EmpresasSQL/`,item,this.headers);
  // }

  // modificar(item : Empresas)
  // {
  //     console.log('modificar');
  //     console.log(item);
      
  //     const {id } =item;

  //   var respuesta =this.http.put(`${ base_url }/EmpresasSQL/${id}`,item,this.headers) 
  //   console.log(respuesta);
  //   return respuesta;
  // }

  // eliminar(item : Empresas)
  // {
  //   const url = `${ base_url }/EmpresasSQL/${item.id}`;
  //   console.log(url);
  //   return this.http.delete(url,this.headers);
  // }

}
