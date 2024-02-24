import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { Empresas } from 'src/app/models/empresas.model';
import { tiposdetalle } from 'src/app/models/tiposdetalle.model';
import { EmpresasService } from 'src/app/services/empresas.service';
import { TptiposdetalleService } from 'src/app/services/tptiposdetalle.service';

import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-empresaso',
  templateUrl: './empresas.component.html',
  styles: [
  ]
})
export class EmpresasComponent {
  
  public totalTipos:number = 0;

  public Items: Empresas[]=[];
  public ItemsALL: Empresas[]=[];


  public TipoEmpresa: tiposdetalle[]=[];//=new tiposdetalle("","","",0,"",0,0,"");
  public TipoEstado: tiposdetalle[]=[];
  public TipoIdentificacion: tiposdetalle[]=[];
 

  TipoEmpresaSeleccionado: number=192; 
 
  TipoEstadoSeleccionado: number=1; 
 
  TipoIdentificacionSeleccionado: number=198;
  
  public Tipo: number=0;

  
 // public TiposDetalleTEMP: tiposdetalle[]=[];

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


  constructor(private servicio: EmpresasService, private servicioTiposDetalle: TptiposdetalleService)
  {
    
  }

  ngOnInit(): void {
    this.cargar();

    this.cargarTipoEmpresa(); 
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

  opcionSeleccionada: number=0; 
  opcionSeleccionada2: number=0; 

  textoBuscar : string='';

  cambiarTipo(tipow :any){
 
   // console.log(tipow);
      this.desde =0;
      this.filtro =this.opcionSeleccionada;
      this.textoBuscar ='';
      this.busquedaNombre='';
      this.cargar(); 
      this.Logs="";
      
  }

  cambiarTipo2(tipow :any){
 
      console.log(tipow);
       
   }

  cargar() {

    this.cargando = true;

    this.servicio.cargar(this.desde,this.limite,this.filtro,this.busquedaNombre )
    .subscribe ( (res1:any) => 
    {
        this.Items= res1['resultado'];
        this.totalTipos=res1.total;
        this.paginasTotales= Math.round(this.totalTipos/this.limite);
        this.paginaActual=  this.desde+1;

        this.cargando = false;
    });


  }
  
  cargarTipoEmpresa() {

    this.cargando = true;

    this.servicioTiposDetalle.cargar(0,-2,12,"" )
    .subscribe ( (res1:any) => 
    {
     console.log(res1);
        this.TipoEmpresa= res1['tiposdetalle'];
      
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

  eliminarTiposdetalle (tptiposdetalle2: Empresas)
  {
    //console.log(tptiposdetalle2);
    Swal.fire({
      title: '¿Borrar Tipos Detalles?',
      text: ` esta a punto de borrar a ${ tptiposdetalle2.nombre } `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicio.eliminar(tptiposdetalle2)
                            .subscribe(resp =>
                              {
                                this.Logs = JSON.stringify(resp);
                                this.cargar();
                                Swal.fire(
                                  'Borrado!',
                                  `El tipo   ${ tptiposdetalle2.nombre } fue eliminado con exito.`,
                                  'success'
                                );

                              });
        

      }
    })

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
    link.setAttribute('download', 'datos.csv');
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
    XLSX.utils.book_append_sheet(wb, ws, 'Datos');
    XLSX.writeFile(wb, 'datos.xlsx');
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
          XLSX.utils.book_append_sheet(wb, ws, 'Datos');
          XLSX.writeFile(wb, 'datos.xlsx');
      });
     

    } catch (error) {
      console.error('Error al exportar a Excel:', error);
      // Manejar el error según tus necesidades
    }
   
  }


   convertirAFormatoExcel(datos: any[]): any[] {
    // Asegúrate de que tus datos estén en un formato aceptable por la librería XLSX
    return datos.map(dato => ({
      idtipoempresa: dato.idtipoempresa,
      tipoempresa: dato.tipoempresa,
      Idtipoidentificacion: dato.idtipoidentificacion,
      Identificacion: dato.identificacion,
      Dv: dato.dv,
      Nombre: dato.nombre,
      Telefono1: dato.telefono1,
      Telefono2: dato.telefono2,
      Celular: dato.celular,
      IdPais: dato.idpais,
      Pais: dato.pais,
      IdCiudad: dato.idciudad,
      Ciudad: dato.ciudad,
      Direccion: dato.direccion,
      Correo: dato.correo,
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

   public camposEditar : Empresas=new Empresas(0,0,'','',0,0,0,0,'','','','','','',0,'',0,'',0,'');
      
    Titulo: string="Configuracion";
    SubTitulo: string="ingrese los datos de Configuracion";

    abrirCrear(){
        //console.log(this.modalFormularioServices.ocultarModal);
        this._Crear=true;
        this.SubTitulo="Crear";
        
        this.camposEditar =new Empresas(0,0,'','',0,0,0,0,'','','','','','',0,'',0,'',0,'');
        
        this.abrirModal();
    }

    abrirModificar(dtiposdetalle:Empresas){
      this._Crear=false;

      this.SubTitulo="Modificar";

      this.camposEditar = dtiposdetalle;
   //   this.opcionSeleccionada2 = this.camposEditar.espais;
      
    //  console.log(this.camposEditar);

      //console.log(this.opcionSeleccionada2 );

      this.abrirModal();
    }
    salvarModal()
    {
 /*     
      if(this.opcionSeleccionada2>0)
      {
        this.camposEditar.espais = this.opcionSeleccionada2 ; 
      }
      else{
        this.camposEditar.espais = 0;
      }
      
      console.log( this.camposEditar);

*/
        if(this._Crear === true)
        {
          this.servicio.crear(this.camposEditar)
          .subscribe(resp =>
            {
              this.Logs = JSON.stringify(resp);
              
              console.log(resp);
              Swal.fire(
                'Crear!',
                `El item  ${ this.camposEditar.nombre } fue creado con exito.`,
                'success'
              );

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

            });

 
      

        }

       // console.log(ciudadPais);
        
      
      
        
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



}
