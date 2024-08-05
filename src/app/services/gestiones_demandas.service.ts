import { Injectable } from '@angular/core';

import { Gestiones_Demandas } from '../models/gestiones_demandas';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';


const base_url =environment.base_url ;


@Injectable({
  providedIn: 'root'
})

export class GestionesDemandasService {
  public Demandas: Gestiones_Demandas []=[];

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


  cargar(coddeman :Number = 0,desde: number =0,cuantos: number =10)
  {
    console.log(coddeman);

    const url = `${ base_url }/gestionesdemandasSQL?desde=${desde}&elementos=${cuantos}&coddeman=${coddeman}`;
    console.log(url);

    return this.http.get(url,this.headers);
  }


  crear(item : Gestiones_Demandas)
  {
      console.log('creando');
      console.log(item);
      
      return this.http.post(`${ base_url }/gestionesdemandasSQL/`,item,this.headers);
  }

  modificar(item : Gestiones_Demandas)
  {
      console.log('modificar');
      console.log(item);
      
      const {id } =item;

    var respuesta =this.http.put(`${ base_url }/gestionesdemandasSQL/${id}`,item,this.headers) 
    console.log(respuesta);
    return respuesta;
  }

  eliminar(item : Gestiones_Demandas)
  {
    const url = `${ base_url }/gestionesdemandasSQL/${item.id}`;
    console.log(url);
    return this.http.delete(url,this.headers);
  }

}

