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


  public usuario: Usuario;

LEER :string = localStorage.getItem('intentos')||'';
EMPRESA :string ='';
    // Leer el nombre
    uid : number = parseInt(this.LEER,0)|| 0;
   nombre = localStorage.getItem('nom')|| "";
  // Leer el login
   login = localStorage.getItem('login')||"";

  // Leer el email
   email = localStorage.getItem('email')||"";

  // Leer el emp
   emp = localStorage.getItem('emp');

   public camposEditar : Usuario=new Usuario(this.uid,0,"",this.login,"",this.email,0,"",0,0,"",this.nombre,1,"","");
      
    Titulo: string="Usuarios";
    SubTitulo: string="ingrese los datos de Usuarios";

    constructor(private servicio: UsuarioService,
     )
    {
      this.usuario = servicio.usuario;
      
    }

    
  ngOnInit(): void {


    this.cargar();
  
  }

//   cargar(){
//     // cargar(desde: number =0,cuantos: number =10, espais :Number = 0, nombre :string="",uid: number=0)
//     // {
//     //   const url = `${ base_url }/usuariosSQL?desde=${desde}&elementos=${cuantos}&espais=${espais}&nombre=${nombre}`;
//     //   return this.http.get<{usuarios:Usuario[],total: number}>(url,this.headers  );
//     // }


    
// }

cargar() {

  

  this.servicio.cargar(0,1,0,"",this.uid )
  .subscribe ( (res1:any) => 
  {
    this.EMPRESA =res1['resultado'].empresa;
  //  console.log(res1['resultado']);
      // this.Items= res1['resultado'];
      // this.totalTipos=res1.total;
      // this.paginasTotales= Math.round(this.totalTipos/this.limite);
      // this.paginaActual=  this.desde+1;

   });


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
        
      this.camposEditar.nombre= this.nombre;
        this.camposEditar.id=this.uid;  
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
