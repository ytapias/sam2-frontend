import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap,delay,map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';

import Swal from 'sweetalert2';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { Usuario } from '../models/usuario.model';
import { Observable, of } from 'rxjs';

//const jwt = require('jsonwebtoken');
const base_url =environment.base_url;

@Injectable({
  providedIn: 'root'
})
/*
interface cargarUsuariosI{
  total:Number;
  usuarios:Usuario[];
}
*/

export class UsuarioService {


  public usuario: Usuario ;


  constructor(private http: HttpClient) { 
/*
    let empresa = new Usuario.empresa("","","");*/
    this.usuario=  new Usuario( "", "" );;
 
  }

  get token():string{
    return localStorage.getItem('token') || '';
  }

  public getemp():string{
    return localStorage.getItem('emp') || '';
  }

  public getemail():string{
    return localStorage.getItem('email') || '';
  }
  
  public getnom():string{
    return localStorage.getItem('nom') || '';
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
    return this.usuario.uid || '';
  }
  

  validarToken() : Observable<boolean>
  {
    return this.http.get(`${ base_url }/login/renew`, 
                {
                    headers:
                    {
                      'x-token':this.token
                    }

                } ).pipe(
                  tap((resp: any)=>{
                   // console.log('ffsss22');
                    localStorage.setItem('token',resp.token) ;
                    const {nom, emp} =resp.decode;
                    localStorage.setItem('nom',nom); 
                    localStorage.setItem('emp',emp); 
                  
                  }),
                  map( resp =>   true
                  ),
                  catchError(error => of(false) )
                );
  }


  logout(){
    localStorage.removeItem('token');
  }
  
  crearUsuario(formData : RegisterForm)
  {
      //console.log('creando usuario');
      return this.http.post(`${ base_url }/usuarios`,formData)
                      .pipe(
                        tap( (resp:any) =>{
                              localStorage.setItem('token',resp.token) 

                        })
                      );
  }
  
  login(formData : LoginForm)
  {
      //console.log('login usuario');
      return this.http.post(`${ base_url }/login`,formData)
                  .pipe(
                    tap( (resp:any) =>{
                          localStorage.setItem('token',resp.token); 
                          const {nom, emp} =resp.decode;
                          localStorage.setItem('nom',nom); 
                          localStorage.setItem('emp',emp); 
                    })
                  );

  }

  



  cargarUsuarios(desde: number =0,cuantos: number =5)
  {
    /*
      console.log('login usuario');
      console.log(desde);
      console.log(cuantos);
*/

      const url = `${ base_url }/usuarios?desde=${desde}&elementos=${cuantos}`;
      return this.http.get<{usuarios:Usuario[],total: number}>(url,this.headers  );
                      //.pipe(                        delay(5000));
  }

    eliminarUsuario(usuario : Usuario)
    {
      const url = `${ base_url }/usuarios/${usuario.uid}`;
      return this.http.delete(url,this.headers);
    }


  actualizarPerfil( data: Usuario  ) {
/*
    data = {
      ...data,
      role: this.usuario.role
    }
*/
    return this.http.put(`${ base_url }/usuarios/${ data.uid }`, data, this.headers );

  }

/*
   parseJwt (token : any) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  };
*/
}
