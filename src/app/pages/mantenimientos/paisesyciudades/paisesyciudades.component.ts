import { Component } from '@angular/core';
import { paisesyciudades } from 'src/app/models/paisesyciudades.model';

import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

 import { TppaisesyciudadesService } from 'src/app/services/tppaisesyciudades.service';
import { TptiposdetalleService } from 'src/app/services/tptiposdetalle.service';
import { tiposdetalle } from 'src/app/models/tiposdetalle.model';
import { RespuestaBackend } from 'src/app/interfaces/RespuestaBackend.interface';
 

@Component({
  selector: 'app-paisesyciudades',
  templateUrl: './paisesyciudades.component.html',
  styleUrls: []
})
export class PaisesyciudadesComponent {

  public totalTipos:number = 0;

  public Items: paisesyciudades[]=[];
  public ItemsALL: paisesyciudades[]=[];
  public TipoPais: tiposdetalle[]=[];
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

  Titulo: string="Paises y Ciudades";
  SubTitulo: string="ingrese los datos de Paises";


  seccionMinimizada: boolean = false;


  constructor(private servicio: TppaisesyciudadesService, private servicioTiposDetalle: TptiposdetalleService)
  {
    
  }

  ngOnInit(): void {
    this.cargar();
    this.cargarTipoPais();
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
 
    //console.log(tipow);
      this.desde =0;
      this.filtro =this.opcionSeleccionada;
      this.textoBuscar ='';
      this.busquedaNombre='';
      this.cargar(); 
      this.Logs="";
      
  }

  cambiarTipo2(tipow :any){
 
    //  console.log(tipow);
       
   }

  cargar() {

    this.cargando = true;
//console.log(this.filtro);
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
  
  
  cargarTipoPais() {

    this.cargando = true;

    this.servicioTiposDetalle.cargar(0,-2,20,"" )
    .subscribe ( (res1:any) => 
    {
   //  console.log(res1);
        this.TipoPais= res1['tiposdetalle'];
      
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

  eliminarTiposdetalle (tptiposdetalle2: paisesyciudades)
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
    link.setAttribute('download', 'paisesyciudades.csv');
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
    XLSX.utils.book_append_sheet(wb, ws, 'Paisesyciudades');
    XLSX.writeFile(wb, 'paisesyciudades.xlsx');
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
          XLSX.utils.book_append_sheet(wb, ws, 'Paisesyciudades');
          XLSX.writeFile(wb, 'paisesyciudadesAll.xlsx');
      });
     

    } catch (error) {
      console.error('Error al exportar a Excel:', error);
      // Manejar el error según tus necesidades
    }
   
  }


   convertirAFormatoExcel(datos: any[]): any[] {
    // Asegúrate de que tus datos estén en un formato aceptable por la librería XLSX
    return datos.map(dato => ({
      tipopais: dato.tipopais,
      CodPais: dato.codpais,
      CodCiudad: dato.codciudad,
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

   public camposEditar : paisesyciudades=new paisesyciudades(0,'','',0,'',new Date(),'',1,'',1);
      
 

    abrirCrear(){
        //console.log(this.modalFormularioServices.ocultarModal);
        this._Crear=true;
        this.SubTitulo="Crear";
        
        this.camposEditar =new paisesyciudades(0,'','',0,'',new Date(),'',1,'',1);
        
        this.abrirModal();
    }

    abrirModificar(dtiposdetalle:paisesyciudades){
      this._Crear=false;

      this.SubTitulo="Modificar";

      this.camposEditar = dtiposdetalle;

      
      this.opcionSeleccionada2= dtiposdetalle.idtipopais;
     

   //   console.log(this.opcionSeleccionada2 );


     
     // console.log(this.camposEditar);

    //  console.log(this.opcionSeleccionada2 );
      this.abrirModal();
    }


    salvarModal()
    {
      
      if(this.opcionSeleccionada2>0)
      {
        this.camposEditar.idtipopais = this.opcionSeleccionada2 ; 
      }
      else{
        this.camposEditar.idtipopais = 0;
      }
      
     // console.log( this.camposEditar);


        if(this._Crear === true)
        {
          this.servicio.crear(this.camposEditar)
          .subscribe({
            next: (resp: RespuestaBackend) => {
                this.Logs = JSON.stringify(resp);
               // console.log(resp);

                // Comprobamos si 'resp' tiene la propiedad 'resultado' y luego 'nuevoID'
                if (resp && resp.resultado && resp.resultado.nuevoID > 0) {
                    // Si nuevoID es mayor que 0, manejar como éxito
                    Swal.fire(
                      'Crear!',
                      `El item  ${ this.camposEditar.nombre } fue creado con exito.`,
                      'success'
                    );
                } else {
                    // Manejar los casos en los que nuevoID no es mayor que 0
                    let mensajeError = 'Ocurrió un error desconocido.';
                    if (resp && resp.resultado) {
                        mensajeError = resp.resultado.mensaje || mensajeError;
                    }
                    Swal.fire(
                        'Error',
                        mensajeError,
                        'error'
                    );
                }
            },
            error: (errorResp) => {
                // Manejo de errores de la petición
                console.error('Error en la petición:', errorResp);
                Swal.fire(
                    'Error en la Petición',
                    'Ocurrió un error al realizar la petición al servidor.',
                    'error'
                );
            }
        });
          
 
        }
        else
        {
          this.servicio.modificar(this.camposEditar)
          .subscribe({
            next: (resp: RespuestaBackend) => {
                this.Logs = JSON.stringify(resp);
              //  console.log(resp);

                // Comprobamos si 'resp' tiene la propiedad 'resultado' y luego 'nuevoID'
                if (resp && resp.resultado && resp.resultado.nuevoID > 0) {
                    // Si nuevoID es mayor que 0, manejar como éxito
                    Swal.fire(
                        'Éxito',
                        `El item fue modificado con éxito. ID Nuevo: ${resp.resultado.nuevoID}`,
                        'success'
                    );
                } else {
                    // Manejar los casos en los que nuevoID no es mayor que 0
                    let mensajeError = 'Ocurrió un error desconocido.';
                    if (resp && resp.resultado) {
                        mensajeError = resp.resultado.mensaje || mensajeError;
                    }
                    Swal.fire(
                        'Error',
                        mensajeError,
                        'error'
                    );
                }
            },
            error: (errorResp) => {
                // Manejo de errores de la petición
                console.error('Error en la petición:', errorResp);
                Swal.fire(
                    'Error en la Petición',
                    'Ocurrió un error al realizar la petición al servidor.',
                    'error'
                );
            }
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
