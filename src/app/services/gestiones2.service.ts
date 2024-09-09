import { Injectable } from '@angular/core';
import { Gestiones2 } from '../models/gestiones2';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';



const base_url =environment.base_url ;



@Injectable({
  providedIn: 'root'
})
export class Gestiones2Service {

  public gestiones: Gestiones2 []=[];

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


  cargar(desde: number =0,cuantos: number =10, idexpediente :Number = 0, nombre :string="" , fechainicio :string="",fechavence :string="",todas:Number=0  )
  {
console.log (nombre);
console.log (fechainicio);


    const url = `${ base_url }/GestionesSQL2?desde=${desde}&elementos=${cuantos}&idexpediente=${idexpediente}&expediente=${nombre}&fechainicio=${fechainicio}&fechavence=${fechavence}&todas=${todas}`; //&fechavence=${fecha2}
 console.log(url);

    return this.http.get(url,this.headers);
  }


  crear(item : Gestiones2)
  {
      console.log('creando');
      console.log(item);
      
      return this.http.post(`${ base_url }/GestionesSQL2/`,item,this.headers);
  }

  modificar(item : Gestiones2)
  {
      console.log('modificar');
      console.log(item);
      
      const {id } =item;

    var respuesta =this.http.put(`${ base_url }/GestionesSQL2/${id}`,item,this.headers) 
    console.log(respuesta);
    return respuesta;
  }

  eliminar(item : Gestiones2)
  {
    const url = `${ base_url }/GestionesSQL2/${item.id}`;
    console.log(url);
    return this.http.delete(url,this.headers);
  }

}

