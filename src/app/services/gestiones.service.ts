import { Injectable } from '@angular/core';

import { Gestiones } from '../models/gestiones';
import { Empresas } from '../models/empresas.model';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

const base_url =environment.base_url + "/gestiones";


@Injectable({
  providedIn: 'root'
})
export class GestionesService {

  public gestiones: Gestiones []=[];


  constructor(private http: HttpClient) { 


    }


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

  get uid():string {
    return "0";//this.marcas.uid || '';
  }

   
  crear(formData : Gestiones)
  {
      //console.log('creando empresas');
      return this.http.post(`${ base_url }`,formData)
                      .pipe(
                        tap( (resp:any) =>{
                              localStorage.setItem('token',resp.token) 
                        })
                      );
  }
  
  
  
  cargar(desde: number =0,cuantos: number =5)
  {
    /*
      console.log('login empresas');
      console.log(desde);
      console.log(cuantos);
*/

      const url = `${ base_url }?desde=${desde}&elementos=${cuantos}`;
      return   this.http.get(url,this.headers  )
      .pipe(
        map ((resp : any) =>
          {
            console.log("resp.resultados");
            console.log(resp);
            total:resp.total;
            return resp; 

          }
        ));
      /*
            return this.http.get<{gestiones:Gestiones[],total: number}>(url,this.headers  );


      console.log(url);
      return this.http.get(url,this.headers  )
      .pipe(
        map ((resp : any) =>
          {
            console.log("resp.resultados");
            console.log(resp);
            console.log(resp.denomi);
            marcasT:resp.denomi;
            total:resp.total;
            return resp; 

          }
        ));
               */
  }

    eliminar(gestiones : Gestiones)
    {
      const url = `${ base_url }/${gestiones.uid}`;
      return this.http.delete(url,this.headers);
    }


    actualizar( data: Gestiones  ) {
      /*
          data = {
            ...data,
            role: this.empresas.role
          }
      */
          return this.http.put(`${ base_url }/${ data.uid }`, data, this.headers );
      
        }


}
