import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Iusuarios } from 'src/app/interfaces/iusuarios';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: []
})



export class UsuariosComponent implements OnInit {

    public totalUsuarios:number = 0;
  
    public usuarios: Usuario[]=[];
    public desde : number=0;
    public limite  : number=5;
    public cargando : boolean=true;
    public paginaActual : number=1;
    public paginasTotales : number=0;


    constructor(private usuarioService: UsuarioService, 
                private busquedasService : BusquedasService)
    {
  
    }
    ngOnInit(): void {
      this.cargarUsuario();

    }

    cargarUsuario()
    {
      this.cargando =true;
      this.usuarioService.cargarUsuarios(this.desde,this.limite )
                            .subscribe ( ({total,usuarios})=> {
                              this.totalUsuarios=total,
                              this.usuarios=usuarios;
                              this.cargando =false;
                              this.paginasTotales= Math.round(this.totalUsuarios/this.limite);
                              this.paginaActual=  Math.round((this.desde/this.limite)+1);
                  
                            })
     

    }
  

    cambiarPagina(valor: number)
    {
      let antiguo_valor = this.desde;
      this.desde +=(valor*this.limite);

     
      if(this.desde<0)
      {
        this.desde=0;
      }
      else if (this.desde >= this.totalUsuarios)
      {
          this.desde =antiguo_valor;
      }
      else{
        this.cargarUsuario();
      }
    }

    buscar(termino : string )
    {

      if(termino.length===0){
        //  console.log(this.TiposDetalleTEMP);
         // this.TiposDetalle= this.TiposDetalleTEMP;
         this.cargarUsuario();
          return;
        }

        
      console.log(termino);
      this.busquedasService.buscar('usuarios', termino)
          .subscribe(resp=>{
              console.log(resp);
              this.usuarios=resp;
          });
    }

    eliminarUsuario (usuario : Usuario)
    {
      Swal.fire({
        title: '¿Borrar Usuario?',
        text: ` esta a punto de borrar a ${ usuario.nombre } `,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Borrarlo!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.usuarioService.eliminarUsuario(usuario)
                              .subscribe(resp =>
                                {
                                  this.cargarUsuario();
                                  Swal.fire(
                                    'Borrado!',
                                    `El usuario ${ usuario.nombre } fue eliminado con exito.`,
                                    'success'
                                  );

                                }
                                  
                                  
                                );
          
 
        }
      })

    }

    cambiarRole( usuario : Usuario )
    {
      this.usuarioService.actualizarPerfil( usuario )
      .subscribe( resp => {
        console.log(resp); 
      })
    }

    abrirCrear(){
      //console.log(this.modalFormularioServices.ocultarModal);
      
  }


  }
