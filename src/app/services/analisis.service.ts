import { Injectable } from '@angular/core';

 import { Analisis} from '../models/analisis.model';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { gacetas } from '../models/gacetas.model';

const base_url =environment.base_url;


@Injectable({
  providedIn: 'root'
})

export class AnalisisService {

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


  cargar(desde: number =0,cuantos: number =10, gaceta :Number = 0)
  {
    const url = `${ base_url }/analisisSQL?desde=${desde}&elementos=${cuantos}&gaceta=${gaceta}`;
    return this.http.get(url,this.headers);
  }


  analisis(gaceta : gacetas)
  {
      console.log('lanzando');
      console.log(gaceta);
      
      return this.http.post(`${ base_url }/analisisSQL/`,gaceta,this.headers);
  }

  // modificar(item : Analisis)
  // {
  //     console.log('modificar');
  //     console.log(item);
      
  //     const {id } =item;

  //   var respuesta =this.http.put(`${ base_url }/EmpresasSQL/${id}`,item,this.headers) 
  //   console.log(respuesta);
  //   return respuesta;
  // }

  // eliminar(item : Analisis)
  // {
  //   const url = `${ base_url }/EmpresasSQL/${item.id}`;
  //   console.log(url);
  //   return this.http.delete(url,this.headers);
  // }

}
