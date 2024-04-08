import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { tareas } from '../models/tareas.model';
import { RespuestaBackend } from '../interfaces/RespuestaBackend.interface';


const base_url =environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class tareasService {

  
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

  cargar(desde: number =0,cuantos: number =10,   idexpediente : number = 0 , idgestion: number = 0 , resumen : number=0, fechai : string='', fechaf :string='')
  {
    const url = `${ base_url }/tareasSQL?desde=${desde}&elementos=${cuantos}&idexpediente=${idexpediente }&idgestion=${idgestion }&resumen=${resumen }&fechai=${fechai}&fechaf=${fechaf}`;
   
    console.log ( url);
   
    var respuesta = this.http.get(url,this.headers);
    console.log(respuesta);
    return respuesta;
  }

  crear(item : tareas)
  {
      console.log('creando');
      console.log(item);
      
      return this.http.post<RespuestaBackend>(`${ base_url }/tareasSQL/`,item,this.headers);
  }

  modificar(item : tareas)
  {
      console.log('modificar');
      console.log(item);
      
      const {id } =item;

    var respuesta =this.http.put<RespuestaBackend>(`${ base_url }/tareasSQL/${id}`,item,this.headers) 
    console.log(respuesta);
    return respuesta;
  }

  eliminar(item : tareas)
  {
    const url = `${ base_url }/tareasSQL/${item.id}`;
    console.log(url);
    return this.http.delete(url,this.headers);
  }

}
