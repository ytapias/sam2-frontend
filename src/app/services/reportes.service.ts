import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';


const base_url =environment.base_url ;


@Injectable({
  providedIn: 'root'
})
export class ReportesService {

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

     // Obtener la lista de reportes
   getReportes() {
    // return this.http.get(`${base_url}/reportes`);
    const url = `${ base_url }/reportes`;
    return this.http.get(url,this.headers);
  }

  // Obtener los datos de un reporte seleccionado
  getReporteData(id: number, filtros: any) {
//    return this.http.get(`${base_url}/reportes/${id}`);
    const url = `${ base_url }/reportes/${id}`;
    return this.http.post(url,filtros, this.headers);
  }

  getReporteFilter(id: number, filtros: any) {
    const url = `${base_url}/tiposdetalleSQL/filtros`;
    return this.http.post(url, { idtipos: id, ...filtros }, this.headers);
}


}
