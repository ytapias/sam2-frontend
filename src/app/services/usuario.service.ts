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
    this.usuario=  new Usuario(0,0,"","","","",0,"",0,0,"","",0,"");
 
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

  get id():number {
    return this.usuario.id || 0;
  }
  

  validarToken() : Observable<boolean>
  {
 //   console.log("valida token");
    

   // console.log(this.token);
    return this.http.get(`${ base_url }/login/renew`, 
                {
                    headers:
                    {
                      'x-token':this.token
                    }

                } ).pipe(
                  tap((resp: any)=>{
                //    console.log('------------>>> ffsss22');
                    const {nom, emp,token} =resp.decode;
               //           console.log("re new  99 ");
                 //         console.log(token);
                          const token1=resp.token;
                          const login1=resp.nom;
                          localStorage.setItem('token',token1); 
                          localStorage.setItem('nom',nom); 
                          localStorage.setItem('login1',login1); 

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
  

  
  login(formData : LoginForm)
  {
      //console.log('login usuario');
      return this.http.post(`${ base_url }/login`,formData)
                  .pipe(
                    tap( (resp:any) =>{
                          const {nom, emp,token} =resp.decode;
                   //       console.log("resp.token 99 ");
                     //     console.log(resp);
                          const token1=resp.token;
                          const login1=resp.nom;        
                       //   console.log(token1);
                          localStorage.setItem('token',token1); 
                          localStorage.setItem('nom',nom); 
                          localStorage.setItem('login1',login1); 

                          localStorage.setItem('emp',emp); 
                    })
                  );

  }

  


/*
  cargar(desde: number =0,cuantos: number =5)
  {
  
      const url = `${ base_url }/usuarios?desde=${desde}&elementos=${cuantos}`;
      return this.http.get<{usuarios:Usuario[],total: number}>(url,this.headers  );
                      //.pipe(                        delay(5000));
  }*/

  cargar(desde: number =0,cuantos: number =10, espais :Number = 0, nombre :string="")
  {
    const url = `${ base_url }/usuariosSQL?desde=${desde}&elementos=${cuantos}&espais=${espais}&nombre=${nombre}`;
    return this.http.get<{usuarios:Usuario[],total: number}>(url,this.headers  );
  }
/*
  crearUsuario(formData : RegisterForm)
  {
      //console.log('creando usuario');
      return this.http.post(`${ base_url }/usuariosSQL`,formData)
                      .pipe(
                        tap( (resp:any) =>{
                              localStorage.setItem('token',resp.token) 

                        })
                      );
  }
*/
  
  crear(item : Usuario)
  {
      //console.log('creando');
      //console.log(item);
      
    return   this.http.post(`${ base_url }/usuariosSQL/`,item,this.headers);
//      this.cargar();

  }

    eliminar(usuario : Usuario)
    {
      const url = `${ base_url }/usuariosSQL/${usuario.id}`;
     
      //console.log(url);
      return this.http.delete(url,this.headers);
   //   this.cargar();
    }

    modificar(item : Usuario)
    {
        //console.log('modificar');
       // console.log(item);
        
        const {id } =item;
  
      var respuesta =this.http.put(`${ base_url }/usuariosSQL/${id}`,item,this.headers) 
      //console.log(respuesta);
      return respuesta;
    }

/*
   parseJwt (token : any) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  };
*/
}
