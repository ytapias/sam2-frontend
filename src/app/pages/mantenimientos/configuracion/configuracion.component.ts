import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';


import { tiposdetalle } from 'src/app/models/tiposdetalle.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { TptiposdetalleService } from 'src/app/services/tptiposdetalle.service';
import { TptiposService } from 'src/app/services/tptipos.service';
import { tp_tipos } from 'src/app/models/tptipos.model';

interface RespuestaBackend {
  ok: boolean;
  resultado: {
    mensaje: string;
    nuevoID: number;
    total: number;
    // Otras propiedades que puedas tener en resultado
  };
  msg: string;
}

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: []
})




export class ConfiguracionComponent implements OnInit {

  public totalTipos:number = 0;

  public TiposDetalle: tiposdetalle[]=[];
  public TiposDetalleALL: tiposdetalle[]=[];

  public Tipo: tp_tipos[]=[];

  
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


  constructor(private tiposdetService: TptiposdetalleService,
              private tiposService: TptiposService,
              private busquedasService: BusquedasService)
  {
    
  }

  ngOnInit(): void {
    this.cargarTiposDetalle();
     this.tiposService.cargarTpTipo()
                      .subscribe((resp:any) =>
                        {
                          this.Tipo = resp['tp_tipos'];
                         }
                    );

  }
 


  range(start: number, end: number, step: number): number[] {
    const result = [];
    result.push(5);
    for (let i = start; i <= end; i += step) {
      result.push(i);
    }
    result.push(200);
    return result;
  }

  cambiarLimite() {
    // Lógica que deseas ejecutar cuando cambia el valor del select
    // Llama a la función adicional aquí si es necesario
    this.cargarTiposDetalle(); 

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
      this.cargarTiposDetalle(); 
      this.Logs="";
      
  }

  cambiarTipo2(tipow :any){
 
      console.log(tipow);
       
   }

  cargarTiposDetalle() {

    this.cargando = true;

    this.tiposdetService.cargar(this.desde,this.limite,this.filtro,this.busquedaNombre )
    .subscribe ( (res1:any) => 
    {
        this.TiposDetalle= res1['tiposdetalle'];
        this.totalTipos=res1.total;
        this.paginasTotales= Math.round(this.totalTipos/this.limite);
        this.paginaActual=  this.desde+1;

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
      this.cargarTiposDetalle();
    }

    this.cargando = false;

    this.Logs="Cambiando pagina "+ this.desde;
  }




  buscar(termino : string )
  {
      if(termino.length===0){
       
        this.busquedaNombre="";
        this.cargarTiposDetalle();
       
        return;
      }
      this.busquedaNombre=termino;
      this.cargarTiposDetalle();

      this.Logs="Buscando "+ this.busquedaNombre;
 
  }

  eliminarTiposdetalle (tptiposdetalle2: tiposdetalle)
  {
    //console.log(tptiposdetalle2);
    Swal.fire({
      title: '¿Borrar Tipos Detalles?',
      text: ` esta a punto de borrar a ${ tptiposdetalle2.codigo} ${ tptiposdetalle2.nombre } `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tiposdetService.eliminar(tptiposdetalle2)
                            .subscribe(resp =>
                              {
                                this.Logs = JSON.stringify(resp);
                                this.cargarTiposDetalle();
                                Swal.fire(
                                  'Borrado!',
                                  `El tipo ${ tptiposdetalle2.codigo} ${ tptiposdetalle2.nombre } fue eliminado con exito.`,
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
    const datosCSV = this.convertirAFormatoCSV(this.TiposDetalle);
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
    const datosExcel = this.convertirAFormatoExcel(this.TiposDetalle);
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datosExcel);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Datos');
    XLSX.writeFile(wb, 'datos.xlsx');
  }


   async  exportarAExcelTodo() {
    try {
      // Llamar a la función asíncrona cargar
    var result= await this.tiposdetService.cargar(1,-1,0,"")
      .subscribe ( (res1:any) => 
      {
          this.TiposDetalleALL= res1['tiposdetalle'];
          // Continuar con la generación de Excel
          const datosExcel =  this.convertirAFormatoExcel( this.TiposDetalleALL);
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
      Tipo: dato.tipo,
      Codigo: dato.codigo,
      Nombre: dato.nombre,
      Otro: dato.otro,
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

   public camposEditar : tiposdetalle=new tiposdetalle('','','',1,'',0,0,'','');
      
    Titulo: string="Configuracion";
    SubTitulo: string="ingrese los datos de Configuracion";

    abrirCrear(){
        //console.log(this.modalFormularioServices.ocultarModal);
        this._Crear=true;
        this.SubTitulo="Crear";
        
        this.camposEditar =new tiposdetalle('','','',1,'',0,0,'','');
        
        this.abrirModal();
    }

    abrirModificar(dtiposdetalle:tiposdetalle){
      this._Crear=false;

      this.SubTitulo="Modificar";

      this.camposEditar = dtiposdetalle;
      this.opcionSeleccionada2 = this.camposEditar.idtipo;
      this.abrirModal();
    }
    salvarModal()
    {
      
      if(this.opcionSeleccionada2>0)
      {
        this.camposEditar.idtipo = this.opcionSeleccionada2 ; 
      }
      else{
        this.camposEditar.idtipo = 1;
      }
      
     // console.log( this.camposEditar);
     //console.log( this.camposEditar);

        if(this._Crear === true)
        {
          this.tiposdetService.crear(this.camposEditar)
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
          this.tiposdetService.modificar(this.camposEditar)
          .subscribe(resp =>
            {
              this.Logs = JSON.stringify(resp);
              //var variable: RespuestaBackend = resp;
              
       //       console.log(resp);
              Swal.fire(
                'Modificar!',
                `El item  ${ this.camposEditar.nombre }   fue modificado  con exito.`,
                'success'
              );

            });

 
      

        }

       // console.log(ciudadPais);
        
      
      
       //this.cargarTiposDetalle();
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