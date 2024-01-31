import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment.development';

import { Usuario } from '../models/usuario.model';
//import { Empresa } from '../models/empresas.model';

import { tp_tiposdetalle } from '../models/tptiposdetalle.model';


const base_url =environment.base_url;

@Injectable({
  providedIn: 'root'
})


export class BusquedasService {

  constructor(private http:HttpClient) { }

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


  private transformarUsuarios( resultados: any[] ): Usuario[] {
    return  resultados;
    /*
    return resultados.map({
      empresa =>new Empresa(user.empresa);  
      user => new Usuario(user.nombre, user.email, empresa,'', user.img, user.google, user.role, user.uid )  ;
    
    }
      );
      */
  }

  private transformarTiposdetalle( resultados: any[] ): tp_tiposdetalle[] {

    return  resultados;
    
    /*resultados.map(
      tptiposdetalle => new tp_tiposdetalle(tptiposdetalle.tipo, tptiposdetalle.email, tptiposdetalle.nombre, tptiposdetalle.uid )  
    );
    */
  }


                             // case 'expedientes_marcas':
  buscar(tipo:'usuarios'| 'tp_tipos' | 'tp_tiposdetalle' | 'tp_paisesyciudades' | 'denomi' | 'personas' | 'gestiones'  | 'expedientes' | 'expedientes_marcas', 
          termino: string="",
          desde: number =0,
          cuantos: number =5){
    const url = `${ base_url }/todo/coleccion/${ tipo }/${ termino }`; //usuarios?desde=${desde}&elementos=${cuantos}`;
    console.log(url);
    return this.http.get<any[]>(url,this.headers  )
                    .pipe(
                        map ((resp : any) =>
                          {
                            switch ( tipo ) {
                            case 'usuarios':
                              //return this.transformarUsuarios( resp.resultados )
                              return resp.resultados; 
                            case 'denomi':
                              return resp.resultados; 
                            case 'personas':
                              return resp.resultados; 
                            case 'gestiones':
                              return resp.resultados;                              
                            case 'expedientes':
                              return resp.resultados; 
                              case 'expedientes_marcas':
                                return resp.resultados; 
                              case 'tp_tiposdetalle':
                              return resp.resultados; 
                            case 'tp_paisesyciudades':
                              return resp.resultados; 
                            default:
                              return [];
                            }
                          } )
                    );
  
  }
 
}
