import { Component } from '@angular/core';
import { Personas } from 'src/app/models/personas.model';
import { PersonasService } from 'src/app/services/personas.service';


import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';


import { tiposdetalle } from 'src/app/models/tiposdetalle.model';
import { TptiposdetalleService } from 'src/app/services/tptiposdetalle.service';
import { paisesyciudades } from 'src/app/models/paisesyciudades.model';
import { TppaisesyciudadesService } from 'src/app/services/tppaisesyciudades.service';

 import { RespuestaBackend } from 'src/app/interfaces/RespuestaBackend.interface'; // Ajusta la ruta según sea necesario



@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: []
})

export class PersonasComponent {


  
  get Empresa():number{
    let idempresa=  localStorage.getItem('emp') || '';
    return parseInt(idempresa);
  } 


  public total:number = 0;

  public TiposDetalle: tiposdetalle[]=[];
  public TiposIdentificacion: tiposdetalle[]=[];
  public Ciudades: paisesyciudades[]=[];


  
  public PersonasALL: Personas[]=[];
  public personasDB: Personas[]=[];

  
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
          private personasService: PersonasService,
          private paisesyciudadesServise: TppaisesyciudadesService)
  {
    
  }

  ngOnInit(): void {
    this.cargar();
     this.tiposdetService.cargar(1,-2,13,"")  //cargar tipos de personas
                      .subscribe((resp:any) =>
                        {
                          this.TiposDetalle = resp['tiposdetalle'];
                          console.log(this.TiposDetalle);
                         }
                    );
      this.tiposdetService.cargar(1,-2,2,"")  //cargar tipos de personas
                    .subscribe((resp:any) =>
                      {
                        this.TiposIdentificacion = resp['tiposdetalle'];
                        console.log(this.TiposIdentificacion);
                       }
                  );
      this.paisesyciudadesServise.cargar(1,-2,0,"")  //cargar tipos de personas
                  .subscribe((resp:any) =>
                    {
                      this.Ciudades = resp['resultado'];
                     }
                );
                  
                    

  }
 


  range(start: number, end: number, step: number): number[] {
    const result = [];
    result.push(5);
    for (let i = start; i <= end; i += step) {
      result.push(i);
    }
    result.push(100);
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
  opTipoPersona: number=0; 
  opIdIdentificacion: number=0; 
  opIdCiudad: number=0; 


  textoBuscar : string='';

  cambiarTipo(tipow :any){
 
   // console.log(tipow);
      this.desde =0;
      this.filtro =this.opcionSeleccionada;
      
      console.log (this.filtro);
      
      this.textoBuscar ='';
      this.busquedaNombre='';
      this.cargar(); 
      this.Logs="";
      
  }

  cambiarTipo2(tipow2 :any){
    //TIPO PERSONA
    this.opTipoPersona= tipow2

    console.log (tipow2);
    console.log (this.opTipoPersona);
   }

   cambiarTipo3(tipow :any){
    //TIPO IDENTIFICACION
    this.opIdIdentificacion= tipow
   }
   
   cambiarTipo4(tipow :any){
    //TIPO IDENTIFICACION
    this.opIdCiudad= tipow
   }

  cargar() {

    this.cargando = true;

    this.personasService.cargar(this.desde,this.limite,this.filtro,this.busquedaNombre )
    .subscribe ( (res1:any) => 
    {
        this.personasDB= res1['resultado'];
        this.total=res1.total;
        this.paginasTotales= Math.round(this.total/this.limite);
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

  eliminarTiposdetalle (tptiposdetalle2: Personas)
  {
    //console.log(tptiposdetalle2);
    Swal.fire({
      title: '¿Borrar?',
      text: ` esta a punto de borrar a ${ tptiposdetalle2.identificacion} ${ tptiposdetalle2.nombre } `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.personasService.eliminar(tptiposdetalle2)
                            .subscribe(resp =>
                              {
                                this.Logs = JSON.stringify(resp);
                                this.cargar();
                                Swal.fire(
                                  'Borrado!',
                                  `El tipo ${ tptiposdetalle2.identificacion} ${ tptiposdetalle2.nombre } fue eliminado con exito.`,
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
    const datosCSV = this.convertirAFormatoCSV(this.personasDB);
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
    const datosExcel = this.convertirAFormatoExcel(this.personasDB);
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datosExcel);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Personas');
    XLSX.writeFile(wb, 'personas.xlsx');
  }


   async  exportarAExcelTodo() {
    try {
      // Llamar a la función asíncrona cargar
    var result= await this.personasService.cargar(1,-1,0,"")
      .subscribe ( (res1:any) => 
      {
          this.PersonasALL= res1['resultado'];
          // Continuar con la generación de Excel
          const datosExcel =  this.convertirAFormatoExcel( this.PersonasALL);
          const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datosExcel);
          const wb: XLSX.WorkBook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, 'Personas');
          XLSX.writeFile(wb, 'personas.xlsx');
      });
     

    } catch (error) {
      console.error('Error al exportar a Excel:', error);
      // Manejar el error según tus necesidades
    }
   
  }


   convertirAFormatoExcel(datos: any[]): any[] 
   {
      // Asegúrate de que tus datos estén en un formato aceptable por la librería XLSX
      return datos.map(dato => ({
        IdTipoPersona: dato.idtipopersona,
        TipoPersona: dato.tipopersona,
        IdtipoIdentificacion: dato.idtipoidentificacion,
        Identificacion: dato.identificacion,
        Nombre: dato.nombre,
        Nombres: dato.nombres,
        Apellidos: dato.apellidos,
        Idciudad: dato.idciudad,
        Ciudad: dato.ciudad,
        Direccion: dato.direccion,
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

   public camposEditar : Personas=new Personas(0,0,"",0,0,"",0,0,"","","","",0,"","",0,"");
      
    Titulo: string="Configuracion";
    SubTitulo: string="ingrese los datos de Configuracion";

    abrirCrear(){
        //console.log(this.modalFormularioServices.ocultarModal);
        this._Crear=true;
        this.SubTitulo="Crear";
        
        this.camposEditar =new Personas(0,0,"",0,0,"",0,0,"","","","",0,"","",0,"");
        
        this.abrirModal();
    }

    abrirModificar(dtiposdetalle:Personas){
      this._Crear=false;

      this.SubTitulo="Modificar";

      this.camposEditar = dtiposdetalle;
      this.opTipoPersona = this.camposEditar.idtipopersona;
      this.opIdIdentificacion = this.camposEditar.idtipoidentificacion;
      this.opIdCiudad = this.camposEditar.idciudad;

      this.abrirModal();
    }
 
 
    salvarModal()
    {
      
     // console.log(this.opcionSeleccionada2);

      // if(this.opcionSeleccionada2>0)
      // {
      //   this.camposEditar.id = this.opcionSeleccionada2 ; 
      // }
      // else{
      //   this.camposEditar.id = 1;
      // }
      


      this.camposEditar.idempresa = this.Empresa;
      this.camposEditar.idtipopersona = this.opTipoPersona;
      this.camposEditar.idtipoidentificacion =this.opIdIdentificacion;
      this.camposEditar.idciudad =this.opIdCiudad;

      console.log("Personas");
      console.log( this.camposEditar);

        if(this._Crear === true)
        {
          this.personasService.crear(this.camposEditar)
            .subscribe({
              next: (resp: RespuestaBackend) => {
                  this.Logs = JSON.stringify(resp);
                  console.log(resp);

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
                          'Crear',
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
                
          this.personasService.modificar(this.camposEditar)
          .subscribe({
              next: (resp: RespuestaBackend) => {
                  this.Logs = JSON.stringify(resp);
                  console.log(resp);

                  // Comprobamos si 'resp' tiene la propiedad 'resultado' y luego 'nuevoID'
                  if (resp && resp.resultado && resp.resultado.nuevoID > 0) {
                      // Si nuevoID es mayor que 0, manejar como éxito
                      Swal.fire(
                          'Modificar',
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
                          'Modificar',
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