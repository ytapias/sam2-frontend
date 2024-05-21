import { Component, OnInit } from '@angular/core';
import { tiposdetalle } from 'src/app/models/tiposdetalle.model';
import { Usuario } from 'src/app/models/usuario.model';
import { TptiposdetalleService } from 'src/app/services/tptiposdetalle.service';
import { UsuarioService } from 'src/app/services/usuario.service';

import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: []
})




export class UsuariosComponent implements OnInit {

  public totalTipos:number = 0;

  public usuario: Usuario;

  public Items: Usuario[]=[];
  public ItemsALL: Usuario[]=[];

  public TipoUsuario: tiposdetalle[]=[];//=new tiposdetalle("","","",0,"",0,0,"");
  public TipoEstado: tiposdetalle[]=[];
  public TipoIdentificacion: tiposdetalle[]=[];
 
  
  TipoUsuarioSeleccionado: number=223; 
  opcionSeleccionada2: number=0; 
  TipoEstadoSeleccionado: number=223; 
  textoBuscar : string='';
  TipoIdentificacionSeleccionado: number=223;



  // public res1 : any;
 
  public desde : number=0;
  public paginaActual : number=0;
  public paginasTotales : number=0;
  public limite  : number=5;
  public cargando : boolean=true;
  public filtro : number=0;
  public busquedaNombre : string="";
  Logs : string="";



  seccionMinimizada: boolean = false;


  constructor(private servicio: UsuarioService,
    private servicioTiposDetalle: TptiposdetalleService)
  {
    this.usuario = servicio.usuario;

  }

  ngOnInit(): void {
    this.cargar();
    this.cargarTipoUsuario(); 
    this.cargarTipoEstado(); 
    this.cargarTipoIdentificacion(); 

  }
 


  range(start: number, end: number, step: number): number[] {
    const result = [];
    result.push(5);
    for (let i = start; i <= end; i += step) {
      result.push(i);
    }
    result.push(150);
    return result;
  }

  cambiarLimite() {
    // Lógica que deseas ejecutar cuando cambia el valor del select
    // Llama a la función adicional aquí si es necesario
    this.cargar(); 

  }


  toggleMinimizar() {
    this.seccionMinimizada = !this.seccionMinimizada;
  }


  cambiarTipoUsuario(tipow :any){
 
  //  console.log(tipow);
 
      this.TipoUsuarioSeleccionado=tipow;
     
     
      this.Logs="Selecionar tipo usuario";
      
  }


  /*
  cambiarTipo2(tipow :any){
 
      console.log(tipow);
       
   }
*/
  cargar() {

    this.cargando = true;

    this.servicio.cargar(this.desde,this.limite,this.filtro,this.busquedaNombre )
    .subscribe ( (res1:any) => 
    {
    //  console.log(res1['resultado']);
        this.Items= res1['resultado'];
        this.totalTipos=res1.total;
        this.paginasTotales= Math.round(this.totalTipos/this.limite);
        this.paginaActual=  this.desde+1;

        this.cargando = false;
    });


  }
  
  cargarTipoUsuario() {

    this.cargando = true;

    this.servicioTiposDetalle.cargar(0,-2,19,"" )
    .subscribe ( (res1:any) => 
    {
     console.log(res1);
        this.TipoUsuario= res1['tiposdetalle'];
      
        this.cargando = false;
    });


  }

  cargarTipoEstado() {

    this.cargando = true;

    this.servicioTiposDetalle.cargar(0,-2,1,"" )
    .subscribe ( (res1:any) => 
    {
     console.log(res1);
        this.TipoEstado= res1['tiposdetalle'];
      
        this.cargando = false;
    });


  }
  cargarTipoIdentificacion() {

    this.cargando = true;

    this.servicioTiposDetalle.cargar(0,-2,2,"" )
    .subscribe ( (res1:any) => 
    {
     console.log(res1);
        this.TipoIdentificacion= res1['tiposdetalle'];
      
        this.cargando = false;
    });


  }
  
  cambiarPagina(valor: number)
  {
    let antiguo_valor = this.desde;
    this.desde +=valor;
   
    this.cargando = true;

   //console.log(this.desde +">=" + this.paginasTotales)
    if(this.desde<0)
    {
      this.desde=0;
    }
    else if (this.desde >= (this.paginasTotales))
    {
        this.desde =antiguo_valor;
    }
    else{
      this.cargar();
    }

    this.cargando = false;

    this.Logs="Cambiando pagina "+ this.desde;
  }




  buscar(termino : string )
  {
      if(termino.length===0){
       
        this.busquedaNombre="";
        this.cargar();
       
        return;
      }
      this.busquedaNombre=termino;
      this.cargar();

      this.Logs="Buscando "+ this.busquedaNombre;
 
  }

  eliminar (item: Usuario)
  {
    if (this.usuario.id=== item.id)
    {
      console.log("mismo usuario");
    }

return;
    console.log("Eliminar");
     console.log(item);
    Swal.fire({
      title: '¿Borrar usuario?',
      text: ` esta a punto de borrar a ${ item.login } `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicio.eliminar(item)
                            .subscribe(resp =>
                              {
                                this.Logs = JSON.stringify(resp);
                                this.cargar();
                                Swal.fire(
                                  'Borrado!',
                                  `El usuario   ${ item.login } fue eliminado con exito.`,
                                  'success'
                                );

                              });
        

      }
    })
    this.cargar();

  }
  //////////////////////////////////////////
  // DESCARGAR 
  //////////////////////////////////////////


  descargarCSV() {
    const datosCSV = this.convertirAFormatoCSV(this.Items);
    const blob = new Blob([datosCSV], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Usuarios.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  convertirAFormatoCSV(datos: any[]): string {
    const encabezados = Object.keys(datos[0]).join(',');
    const filas = datos.map(dato => Object.values(dato).join(',')).join('\n');
    return `${encabezados}\n${filas}`;
  }

  exportarAExcel() {
    const datosExcel = this.convertirAFormatoExcel(this.Items);
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datosExcel);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Usuarios');
    XLSX.writeFile(wb, 'Usuarios.xlsx');
  }


   async  exportarAExcelTodo() {
    try {
      // Llamar a la función asíncrona cargar
    var result= await this.servicio.cargar(1,-1,0,"")
      .subscribe ( (res1:any) => 
      {
          this.ItemsALL= res1['resultado'];
          // Continuar con la generación de Excel
          const datosExcel =  this.convertirAFormatoExcel( this.ItemsALL);
          const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datosExcel);
          const wb: XLSX.WorkBook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, 'Usuarios');
          XLSX.writeFile(wb, 'Usuarios.xlsx');
      });
     

    } catch (error) {
      console.error('Error al exportar a Excel:', error);
      // Manejar el error según tus necesidades
    }
   
  }


   convertirAFormatoExcel(datos: any[]): any[] {
    // Asegúrate de que tus datos estén en un formato aceptable por la librería XLSX
    return datos.map(dato => ({
      Login: dato.login,
      Email: dato.email,
      Idrole: dato.idrole,
      Role: dato.role,
      Idpersona: dato.idpersona,
      Nombre: dato.nombre,
      Idtipoidentificacion: dato.idtipoidentificacion,
      Identificacion: dato.identificacion,
      IdEstado: dato.idestado,
      Estado: dato.estado,
      Id: dato.id
    }));

  
  }

  
  //////////////////////////////////////////
  // MODAL 
  //////////////////////////////////////////

  /*
  paises :string[]=['colombia','venezuela'];
  campos2: any[] = [
    { tipo: 'text', etiqueta: 'Nombre',placeholder: 'escriba el Nombre', icon: 'ti-user', nombreControl: 'nombre', validaciones: [Validators.required] },
    { tipo: 'email', etiqueta: 'Email',placeholder: 'escriba el Email ', icon: 'ti-email', nombreControl: 'email', validaciones: [Validators.required, Validators.email] },
    { tipo: 'select', etiqueta: 'Activo', placeholder: 'seleccione', icon: 'ti-tag',nombreControl: 'Activo', validaciones: [] ,dato:this.paises},
    { tipo: 'date', etiqueta: 'Fecha Inicio', placeholder: 'fecha', icon: 'ti-tag',nombreControl: 'Date', validaciones: [] ,dato:'2024-01-10'},
    { tipo: 'radio', etiqueta: 'Radio', placeholder: 'radio 1', icon: 'ti-tag',nombreControl: 'Radio', validaciones: [] ,dato:this.paises},
    { tipo: 'multilinea', etiqueta: 'Texto', placeholder: 'texto 1', icon: 'ti-tag',nombreControl: 'Texto', validaciones: [] ,dato:"I am trying to get it to take multiple lines of input. The width and height make the box to be bigger, but the user can enter text all (s)he wants yet it fills one line only    "},

    // Puedes añadir más campos aquí
  ];

  Los iconos
  https://coderthemes.com/uplon/layouts/vertical/icons-themify.html?
  */
 
  private _ocultarModal: boolean = true;

  private _Crear: boolean = true;
  private _Uid: string = "";

   public camposEditar : Usuario=new Usuario(0,0,"","","","",0,"",0,0,"","",0,"","");
      
    Titulo: string="Usuarios";
    SubTitulo: string="ingrese los datos de Usuarios";

    abrirCrear(){
        //console.log(this.modalFormularioServices.ocultarModal);
        this._Crear=true;
        this.SubTitulo="Crear";
        
        this.camposEditar =new Usuario(0,0,"","","","",0,"",0,0,"","",0,"","");
        this.TipoEstadoSeleccionado=1;
        this.TipoUsuarioSeleccionado=223;
        this.TipoIdentificacionSeleccionado=203;
        this.abrirModal();
    }


    abrirModificar(dtiposdetalle:Usuario){
      this._Crear=false;

      this.SubTitulo="Modificar";

      this.camposEditar = dtiposdetalle;
   //console.log(this.camposEditar.idrole);
      this.TipoUsuarioSeleccionado = this.camposEditar.idrole;
      
      this.TipoIdentificacionSeleccionado= this.camposEditar.idtipoidentificacion;
      this.TipoEstadoSeleccionado=1;
      //this.TipoUsuarioSeleccionado=223;

     // console.log(this.camposEditar);

     // console.log(this.camposEditar.idrole );

      this.abrirModal();
    }

    salvarModal()
    {
      this.camposEditar.idestado=this.TipoEstadoSeleccionado;
      this.camposEditar.idtipoidentificacion=this.TipoIdentificacionSeleccionado;
      this.camposEditar.idrole=this.TipoUsuarioSeleccionado;
      this.camposEditar.idpersona=0;
        if(this._Crear === true)
        {
           // console.log( this.camposEditar);
          this.camposEditar.password=this.camposEditar.identificacion;

          this.servicio.crear(this.camposEditar)
          .subscribe(resp =>
            {
              this.Logs = JSON.stringify(resp);
              
              console.log(resp);
              Swal.fire(
                'Crear!',
                `El item  ${ this.camposEditar.nombre } fue creado con exito. recuerde el password inicial es el numero de documento`,
                'success'
              );
              this.cargar();   
            });
          
 
        }
        else
        {
          this.servicio.modificar(this.camposEditar)
          .subscribe(resp =>
            {
              this.Logs = JSON.stringify(resp);
              //var variable: RespuestaBackend = resp;
              
              console.log(resp);
              Swal.fire(
                'Modificar!',
                `El item  ${ this.camposEditar.nombre }   fue modificado  con exito.`,
                'success'
              );
              this.cargar();   
            });

        }

          
        this.cerrarModal();
    }

    get ocultarModal(){
      return this._ocultarModal;
    }

    abrirModal(){
      this._ocultarModal=false;

    }

    cerrarModal(){
      this._ocultarModal=true;
     
    

    }
 

  ///////////////////////////////////////
  //    FIN MODAL
  ////////////////////////////////////// 

  public _ocultarModal2: boolean = true;

  public psw1: string = "";
  public psw2: string = "";
  
  CambioClave(dtiposdetalle:Usuario){
    
    this.SubTitulo="Cambio Password ";
    
    console.log("enter");

    this.camposEditar = dtiposdetalle;

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
            this.Logs = JSON.stringify(resp);
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
