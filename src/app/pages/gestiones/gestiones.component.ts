import { Component } from '@angular/core';
import { Gestiones2 } from 'src/app/models/gestiones2';
import { paisesyciudades } from 'src/app/models/paisesyciudades.model';
import { TppaisesyciudadesService } from 'src/app/services/tppaisesyciudades.service';
import { tiposdetalle } from 'src/app/models/tiposdetalle.model';
import { Gestiones2Service } from 'src/app/services/gestiones2.service';
import { TptiposdetalleService } from 'src/app/services/tptiposdetalle.service';

import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { tareas } from 'src/app/models/tareas.model';
import { tareasService } from 'src/app/services/tareas.service';
import { PersonasService } from 'src/app/services/personas.service';
import { Personas } from 'src/app/models/personas.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gestiones',
  templateUrl: './gestiones.component.html',
  styleUrls: []
})
export class GestionesComponent {


  get Empresa():number{
    let idempresa=  localStorage.getItem('emp') || '';
    return parseInt(idempresa);
  } 


  public totalTipos:number = 0;

  public Items: Gestiones2[]=[];
  public ItemsALL: Gestiones2[]=[];

  public TiposActuacion: tiposdetalle[]=[];
  public TiposProceso: tiposdetalle[]=[];
  public TipoEstado: tiposdetalle[]=[];
  public ClaseActuacion: tiposdetalle[]=[];
  public paises: paisesyciudades[]=[];

  public Paralegales: Personas[]=[];


  public TipoEstadoTramite: tiposdetalle[]=[];

  public total:number = 0;

  public Tipo: number=0;
  
  Fechavencimiento: Date= new Date();
  Fechaactuacion: Date= new Date();
  
  public busqueda = 1
  
 
  public desde : number=0;
  public paginaActual : number=0;
  public paginasTotales : number=0;
  public limite  : number=5;
  public cargando : boolean=true;
  public filtro : number=0;
  public busquedaNombre : string="";
  Logs : string="";

  public fechavence2 :Date =new Date();
  public fechavence3 : string=this.fechavence2.toISOString().split('T')[0];
  
  seccionMinimizada: boolean = false;
   opCodActua: string="";
  opTiposProcesos: string="";
   TipoEstadoSeleccionado: number=0; 
  idpaisseleccionado: number=0;  
  opParalegal:number=0;
  TipoEstadoTramiteSelecctionado: number=0;  
  opClaseActua: string="";
  
  
  
  textoBuscar : string='';

  constructor(private servicio: Gestiones2Service,
              private tiposdetService: TptiposdetalleService,
              private paisesyciudadesService: TppaisesyciudadesService,
              private tareasService: tareasService,
              private personasService: PersonasService,
              private route: ActivatedRoute)
  {
    
  }
  gestionID: number =0;

  ngOnInit(): void {

   


    this.route.params.subscribe(params => {
      const gestion = params['gestion'];
      if (gestion) {
        // Si hay un 'gestion' en la URL, cargar la gestión específica
        this.gestionID = +gestion;
//        this.busquedaNombre =gestion;

      } else {
        // Si no hay 'gestion' en la URL, cargar la vista genérica de gestiones
        this.gestionID = 0;  // o alguna lógica por defecto
      }
      console.log('Gestion seleccionada:', this.gestionID);
    });

    this.cargar();
    this.cargarClase();
    this.cargarTipoEstado();
    this.cargarTipoProceso();
    this.cargarTipoActuacion();
    this.cargarPais();

    this.cargarEstadoTramite();
    this.cargarParalegal();


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

  cambiarbusqueda() {
    this.cargar(); 
  }



  toggleMinimizar() {
    this.seccionMinimizada = !this.seccionMinimizada;
  }
 

  cambiarTipo2(tipow :any){
 
      console.log(tipow);
       
   }

  cargar() {

    this.cargando = true;
          
      if (this.gestionID>0)
      {
 
        this.servicio.cargar(this.desde,this.limite,0,'','','',0,this.gestionID)
          .subscribe ( (res1:any) => 
          {
          // console.log( res1['resultado']);
              this.Items= res1['resultado'];
              this.totalTipos=res1.total;
              this.paginasTotales= Math.round(this.totalTipos/this.limite);
              this.paginaActual=  this.desde+1;

              this.cargando = false;
          });
      } 
      else if(this.busqueda == 1)
      {
        //console.log("1");
        
        this.servicio.cargar(this.desde,this.limite,this.filtro,this.busquedaNombre )
          .subscribe ( (res1:any) => 
          {
          // console.log( res1['resultado']);
              this.Items= res1['resultado'];
              this.totalTipos=res1.total;
              this.paginasTotales= Math.round(this.totalTipos/this.limite);
              this.paginaActual=  this.desde+1;

              this.cargando = false;
          });
      }
      else if(this.busqueda == 2)
      {
        console.log("2");
      

        this.servicio.cargar(this.desde,this.limite,this.filtro,"-99",this.fechavence3,this.fechavence3,1)
          .subscribe ( (res1:any) => 
          {
            console.log( res1['resultado']);
              this.Items= res1['resultado'];
              this.totalTipos=res1.total;
              this.paginasTotales= Math.round(this.totalTipos/this.limite);
              this.paginaActual=  this.desde+1;

              this.cargando = false;
          });
      }

  }
  

  cargarTipoEstado() {

    this.cargando = true;

    this.tiposdetService.cargar(0,-2,1,"" )
    .subscribe ( (res1:any) => 
    {
    // console.log(res1);
        this.TipoEstado= res1['tiposdetalle'];
      
        this.cargando = false;
    });


  }

  cargarEstadoTramite() {

    this.cargando = true;

    this.tiposdetService.cargar(0,-2,8,"" )
    .subscribe ( (res1:any) => 
    {
      //console.log(res1);
      this.TipoEstadoTramite= res1['tiposdetalle'];
      
       this.cargando = false;
    });


  }

  cargarParalegal()
  {
    this.cargando = true;

    this.personasService.cargar(0,100,240,'')
    .subscribe ( (res1:any) => 
    {
   //  console.log(res1);
        this.Paralegales= res1['resultado'];
        this.cargando = false;
    });

  }


  
  cargarClase() {

    this.cargando = true;

    this.tiposdetService.cargar(0,-2,10,"" )
    .subscribe ( (res1:any) => 
    {
     console.log(res1);
        this.ClaseActuacion= res1['tiposdetalle'];
      
        this.cargando = false;
    });


  }

  cargarTipoActuacion() {

    this.cargando = true;

    this.tiposdetService.cargar(0,-2,10,"" )
    .subscribe ( (res1:any) => 
    {
     console.log(res1);
        this.TiposActuacion= res1['tiposdetalle'];
      
        this.cargando = false;
    });


  }

  cargarTipoProceso() {

    this.cargando = true;

    this.tiposdetService.cargar(0,-2,3,"" )
    .subscribe ( (res1:any) => 
    {
     console.log(res1);
        this.TiposProceso= res1['tiposdetalle'];
      
        this.cargando = false;
    });


  }

  cargarPais() {
 
    this.cargando = true;

    this.paisesyciudadesService.cargar(0,-2,225,"" )
    .subscribe ( (res1:any) => 
    {
        //console.log(res1);
        this.paises= res1['resultado'];
      
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

  fechaVenceGestion: Date | null = null;
  fechaActuacion: Date | null = null;


 

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

  eliminarTiposdetalle (tptiposdetalle2: Gestiones2)
  {
    //console.log(tptiposdetalle2);
    Swal.fire({
      title: '¿Borrar Gestiones?',
      text: ` esta a punto de borrar a ${ tptiposdetalle2.id } `,
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
                                  `El tipo   ${ tptiposdetalle2.id } fue eliminado con exito.`,
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
    link.setAttribute('download', 'Gestiones.csv');
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
    XLSX.utils.book_append_sheet(wb, ws, 'Gestiones');
    XLSX.writeFile(wb, 'Gestiones.xlsx');
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
          XLSX.utils.book_append_sheet(wb, ws, 'Gestiones');
          XLSX.writeFile(wb, 'GestionesAll.xlsx');
      });
     

    } catch (error) {
      console.error('Error al exportar a Excel:', error);
      // Manejar el error según tus necesidades
    }
   
  }


   convertirAFormatoExcel(datos: any[]): any[] {
    // Asegúrate de que tus datos estén en un formato aceptable por la librería XLSX
    return datos.map(dato => ({
      Expediente: dato.expediente,
      NmroInterno: dato.nrointerno,
      Marca: dato.marca,
      Gestion: dato.gestion,
      Pendiente: dato.pendiente,
      Pais: dato.pais,
      Clase: dato.clase,
      TipoProceso: dato.tipoproc,
      FechaAct: dato.fechaactuacion ? new Date(dato.fechaactuacion).toISOString().split('T')[0] : '',
      TipoAct: dato.TipoAct, 
      FechaVencimiento: dato.vence ? new Date(dato.vence).toISOString().split('T')[0] : '',
      Paralegal: dato.paralegal,
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

  public camposEditar : Gestiones2=new Gestiones2(0,0,0,'',0,'','',0,'','','',new Date(),'','','',new Date(),'',0,'',0,'',0,'');
      
  Titulo: string="Gestiones";
  SubTitulo: string="ingrese los datos de Gestion";

  abrirCrear(){
        //console.log(this.modalFormularioServices.ocultarModal);
        this._Crear=true;
        this.SubTitulo="Crear";
        
        this.camposEditar =new Gestiones2(0,0,0,'',0,'','',0,'','','',new Date(),'','','',new Date(),'',0,'',0,'',0,'');
        
        this.abrirModal();
    }



    onChangeEstadoTramite(event: any): void {
      // Acciones adicionales que deseas realizar
      this.camposEditar.gestion= this.buscartextoporId(  this.TiposActuacion  ,this.TipoEstadoTramiteSelecctionado);
  
    console.log("aqui");
  
      
    }

       
    buscartextoporId(lista: tiposdetalle[], id: number): string  {
      const item = lista.find(element => element.id === id);
      return item ? item.nombre : '';
  }

    buscarIdPorCodigo(lista: tiposdetalle[], codigo: string): number  {
      const item = lista.find(element => element.codigo === codigo);
      return item ? item.id : 0;
  }

  
  abrirModificar(dtiposdetalle: Gestiones2) 
  {
    this._Crear = false;
    this.SubTitulo = "Modificar";
    this.camposEditar = { ...dtiposdetalle }; // Clonar el objeto para evitar efectos colaterales
  
    // console.log(dtiposdetalle);
    // console.log("Actuación:", typeof dtiposdetalle.fechaactuacion, dtiposdetalle.fechaactuacion);
    // console.log("Vence:", typeof dtiposdetalle.vence, dtiposdetalle.vence);
    this.camposEditar.fechaactuacion = dtiposdetalle.fechaactuacion ? new Date(dtiposdetalle.fechaactuacion) : null;
    this.camposEditar.vence = dtiposdetalle.vence ? new Date(dtiposdetalle.vence) : null;
    this.idpaisseleccionado = dtiposdetalle.idpais;
    this.TipoEstadoSeleccionado = dtiposdetalle.idestado;
    this.TipoEstadoTramiteSelecctionado = dtiposdetalle.tipogest;
    this.opParalegal = dtiposdetalle.idparalegal;
    this.opCodActua = dtiposdetalle.codactua;
    this.opTiposProcesos = dtiposdetalle.tipoproc;
    this.opClaseActua = dtiposdetalle.clase;
  
    this.abrirModal();
  }
  

  actualizarFechaActuacion(event: any) {
    const valor = event.target.value;
    this.camposEditar.fechaactuacion = valor ? new Date(valor) : null;
  }
  actualizarFechaVence(event: any) {
    const valor = event.target.value;
    this.camposEditar.vence = valor ? new Date(valor) : null;
  }


  salvarModal()
  {

      if(this._Crear === true)
      {

        
        let  nueva    : Gestiones2 = new Gestiones2(0,this.Empresa,0,this.camposEditar.expediente,0,'','',this.idpaisseleccionado,'',this.camposEditar.clase,this.opTiposProcesos,
        this.fechaActuacion, this.opCodActua, this.camposEditar.gestion, this.camposEditar.sitermino,
        this.fechaVenceGestion, this.camposEditar.pendiente,this.TipoEstadoTramiteSelecctionado, this.camposEditar.um,this.TipoEstadoSeleccionado,'',this.opParalegal,'');
        
        console.log(nueva);
        console.log(this.camposEditar.fechaactuacion);

        this.servicio.crear(nueva)
        .subscribe(resp =>
          {
            this.Logs = JSON.stringify(resp);
            
            console.log(resp);
            Swal.fire(
              'Crear!',
              `El item  ${ this.camposEditar.id } fue creado con exito.`,
              'success'
            );

          });
        

      }
      else
      {
        this.camposEditar.vence= this.fechaVenceGestion;
        this.camposEditar.fechaactuacion=this.fechaActuacion;
        this.camposEditar.idestado= this.TipoEstadoSeleccionado;

        this.camposEditar.idparalegal= this.opParalegal;
        this.camposEditar.tipoproc= this.opTiposProcesos;
        this.camposEditar.codactua= this.opCodActua;
        this.camposEditar.idpais= this.idpaisseleccionado;
        this.camposEditar.tipogest= this.TipoEstadoTramiteSelecctionado;
        this.servicio.modificar(this.camposEditar)
        .subscribe(resp =>
          {
            this.Logs = JSON.stringify(resp);
            //var variable: RespuestaBackend = resp;
            
            console.log(resp);
            Swal.fire(
              'Modificar!',
              `El item  ${ this.camposEditar.id }   fue modificado  con exito.`,
              'success'
            );

          });

          this.cargar();
    

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

///////////////////////////////////////
  //     MODAL  TAREA
  ////////////////////////////////////// 

  private _ocultarModalTarea: boolean = true;
  public camposEditarTarea : tareas=new tareas(0,0,'','','',new Date(),0,'',0,0,0,0,'','');


  get ocultarModalTarea(){
    return this._ocultarModalTarea;
  }

  abrirModalTarea(Gestiondetalle:Gestiones2){
    
    this.camposEditarTarea =new tareas(0,0,'','','',new Date(),1,'',Gestiondetalle.id,Gestiondetalle.idexpediente,0,0,'','');

    this._ocultarModalTarea=false;
    
  }

  cerrarModalTarea(){
    this._ocultarModalTarea=true;
   
  

  }

  fechaVenceTarea:Date=new Date();

  cambiarFechavence(tipow :any)
  {
    console.log("TIPO---------------");
    console.log(tipow);
    this.fechaVenceTarea= tipow;
  }

  cambiarFechavence2(tipow :any)
  {
    console.log("FECHA VENCE---------------");
    console.log(tipow);
    this.fechavence2= tipow;
    this.fechavence3= tipow;
  
    this.cargar();
    
  }



  salvarModalTarea()
  {

    if (this.editarTareas===0)
    {
      //crear nueva tarea
      let  nueva    : tareas =  new tareas(0,this.Empresa,'','',this.camposEditarTarea.tarea,this.fechaVenceTarea,1,'',this.camposEditarTarea.idgestion,this.camposEditarTarea.idexpediente,0,0,'','');

        console.log(nueva);
        console.log("nueva");
        console.log(this.fechaVenceTarea);

        this.tareasService.crear(nueva)
          .subscribe(resp =>
          {
            this.Logs = JSON.stringify(resp);
            
            console.log(resp);
            Swal.fire(
              'Crear!',
              `El item  ${this.camposEditarTarea.tarea} fue creado con exito.`,
              'success'
            );

          });
      
    }
    else
    {
      //modificar tarea
      let  nueva    : tareas =  new tareas(this.camposEditarTarea.id,this.camposEditarTarea.idempresa,'','',this.camposEditarTarea.tarea,this.fechaVenceTarea,this.camposEditarTarea.idestado,'',this.camposEditarTarea.idgestion,this.camposEditarTarea.idexpediente,0,0,'','');

      console.log(nueva);
      console.log("Editar");
      console.log(this.fechaVenceTarea);

      this.tareasService.modificar(nueva)
        .subscribe(resp =>
        {
          this.Logs = JSON.stringify(resp);
          
          console.log(resp);
          Swal.fire(
            'Modificar!',
            `El item  ${this.camposEditarTarea.tarea} fue modificada con exito.`,
            'success'
          );

        });
    

    }
    this.cargar();
    this.cerrarModalTarea();

    
  }

  ///////////////////////////////////////
  //    FIN MODAL
  ////////////////////////////////////// 



///////////////////////////////////////
  //     MODAL  TAREA
  ////////////////////////////////////// 

  private _ocultarModalTarea2: boolean = true;
  public camposEditarTarea2 : tareas=new tareas(0,0,'','','',new Date(),0,'',0,0,0,0,'','');


  get ocultarModalTarea2(){
    return this._ocultarModalTarea2;
  }

  abrirModalTarea2(Gestiondetalle:Gestiones2){
    
    let idexpediente = Gestiondetalle.idexpediente;
    let idgestion = Gestiondetalle.id;

    this.cargarTarea(idexpediente,idgestion );

    this.camposEditarTarea =new tareas(0,0,'','','',new Date(),1,'',Gestiondetalle.id,Gestiondetalle.idexpediente,0,0,'','');

    this._ocultarModalTarea2=false;
    
  }

  cerrarModalTarea2(){
    this._ocultarModalTarea2=true;
   
  

  }

  public ItemsTareas: tareas[]=[];
  public editarTareas:number=0;


  cargarTarea(idexpediente :number=0,idgestion :number=0) {

    // this.cargando = true;

    this.tareasService.cargar(this.desde,this.limite,idexpediente ,idgestion )
    .subscribe ( (res1:any) => 
    {
        this.ItemsTareas= res1['resultado'];
        // this.totalTipos=res1.total;
        // this.paginasTotales= Math.round(this.totalTipos/this.limite);
        // this.paginaActual=  this.desde+1;

        // this.cargando = false;
    });


  }

  abrirModificarTarea(nitem2:tareas)
  {
    this._ocultarModalTarea2=true;
    this.camposEditarTarea =new tareas(nitem2.id,nitem2.idempresa,'','',nitem2.tarea,nitem2.fechavence,nitem2.idestado,nitem2.estado,nitem2.idgestion,nitem2.idexpediente,0,0,'','');
    this.editarTareas=1;
    this._ocultarModalTarea=false;
    
  }


  ///////////////////////////////////////
  //    FIN MODAL
  ////////////////////////////////////// 



  
}
