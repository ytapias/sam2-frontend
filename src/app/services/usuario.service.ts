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
    this.usuario=  new Usuario(0,0,"","","","",0,"",0,0,"","",0,"","");
 
  }


    // Obtiene el rol del usuario
    get role(): number {
      return this.usuario.idrole || 0;
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

                      // console.log("renew TOKEN");
                      // console.log(resp);

                    localStorage.setItem('token',resp.token); 
                      
                      // console.log(resp);
                      
                      const{
                        idempresa, empresa, login, password, email, idrole, role, idpersona, idtipoidentificacion, 
                        identificacion, nombre, idestado, estado,   id} = resp.usuarioDB[0][0]
    
    
                          this.usuario = new Usuario(id,idempresa,empresa,login,''
                                                    ,email,idrole,role,idpersona,idtipoidentificacion,identificacion
                                                    ,nombre,idestado,estado,'');

                  
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
   console.log('login usuario');

   console.log(formData);
      return this.http.post(`${ base_url }/login`,formData)
                  .pipe(
                    tap( (resp:any) =>{
                      console.log(" resp.token");    
                      console.log( resp.token);


                           localStorage.setItem('token',resp.token); 
                          localStorage.setItem('nom',resp.decode.nom); 
                          localStorage.setItem('login',resp.login);
                          localStorage.setItem('intentos',resp.decode.uid); 

                          localStorage.setItem('email',resp.decode.email); 
                          localStorage.setItem('emp',resp.decode.emp); 
                    })
                  );

  }

  
 

  cargar(desde: number =0,cuantos: number =10, espais :Number = 0, nombre :string="",uid: number=0)
  {
    const url = `${ base_url }/usuariosSQL?desde=${desde}&elementos=${cuantos}&espais=${espais}&nombre=${nombre}`;
    return this.http.get<{usuarios:Usuario[],total: number}>(url,this.headers  );
  }
 
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
        console.log('modificar');
        console.log(item);
        
        const {id } =item;
  
      var respuesta =this.http.put(`${ base_url }/usuariosSQL/${id}`,item,this.headers) 
      //console.log(respuesta);
      return respuesta;
    }

    modificarpassword(item : Usuario)
    {
        //console.log('modificar');
       console.log(item);
        
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
