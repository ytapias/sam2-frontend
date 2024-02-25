import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: []
})
export class MyprofileComponent {



    // Leer el nombre
    uid = localStorage.getItem('uid')|| 0;
   nombre = localStorage.getItem('nom')|| "";
  // Leer el login
   login = localStorage.getItem('login')||"";

  // Leer el email
   email = localStorage.getItem('email')||"";

  // Leer el emp
   emp = localStorage.getItem('emp');

   public camposEditar : Usuario=new Usuario(0,0,"","","","",0,"",0,0,"","",0,"","");
      
    Titulo: string="Usuarios";
    SubTitulo: string="ingrese los datos de Usuarios";

    constructor(private servicio: UsuarioService,
     )
    {
      
    }

    
    


   public _ocultarModal2: boolean = true;

   public psw1: string = "";
   public psw2: string = "";
   
   CambioClave(){
     
     this.SubTitulo="Cambio Password ";
  /*   
     console.log("enter");
 
     
     
     
      this.camposEditar.id = parseInt(this.uid, 10);
    
     this.camposEditar.nombre = localStorage.getItem('nom');
  // Leer el login
   login = localStorage.getItem('login');

  // Leer el email
   email = localStorage.getItem('email');

  // Leer el emp
   emp = localStorage.getItem('emp');

     this.camposEditar = dtiposdetalle;
 */
     this.abrirModal2();
     
   }
 
   get ocultarModal2(){
     return this._ocultarModal2;
   }
 
   cerrarModal2(){
     this._ocultarModal2=true;
    
   
 
   }
   abrirModal2(){
     this._ocultarModal2=false;
 
   }
 
   salvarModal2()
   {
     if(this.psw1 ===this.psw2)
    {
         this.camposEditar.nuevopassword = this.psw1;
         
         this.servicio.modificarpassword(this.camposEditar)
         .subscribe(resp =>
           {
            // this.Logs = JSON.stringify(resp);
             //var variable: RespuestaBackend = resp;
             
             console.log(resp);
             Swal.fire(
                 'Modificar!',
               `El Password fue modificado  con exito.`,
               'success'
             );
           });
 
       }
       else
       {
 
         Swal.fire({
           title: 'Error',
           text: ` Las contraseñas no son iguales? `,
           icon: 'warning',
         }
           
         );
 
         
 
       }
 
         
       this.cerrarModal2();
   }


}
