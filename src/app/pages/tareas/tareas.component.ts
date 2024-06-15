import { Component } from '@angular/core';
import { tareas } from 'src/app/models/tareas.model';
import { tiposdetalle } from 'src/app/models/tiposdetalle.model';
import { tareasService } from 'src/app/services/tareas.service';
import { TptiposdetalleService } from 'src/app/services/tptiposdetalle.service';


import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: []
})
export class TareasComponent {

  public TareasAll: tareas[]=[];
  public TareasAllXLS: tareas[]=[];
  public TipoEstado: tiposdetalle[]=[];

  public totalTipos:number = 0;
  public desde : number=0;
  public paginaActual : number=0;
  public paginasTotales : number=0;
  public limite  : number=5;
  public cargando : boolean=true;
  public filtro : number=0;
  public busquedaNombre : string="";
  Logs : string="";
  textoBuscar : string='';
  seccionMinimizada: boolean = false;
  TipoEstadoSeleccionado: number=1; 


  
  get Empresa():number{
    let idempresa=  localStorage.getItem('emp') || '';
    return parseInt(idempresa);
  } 

  constructor(private servicio: tareasService,    
              private tiposdetService: TptiposdetalleService  )
  {
    this.cargarTipoEstado();

  }

  
  ngOnInit(): void {
    this.cargarTareas();
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
    this.cargarTareas(); 

  }


  toggleMinimizar() {
    this.seccionMinimizada = !this.seccionMinimizada;
  }


  cargarTareas() {

    this.cargando = true;

    this.servicio.cargar(this.desde,this.limite,0,0)
    .subscribe ( (res1:any) => 
    {
        this.TareasAll= res1['resultado'];
        this.totalTipos=res1.total;
        this.paginasTotales= Math.round(this.totalTipos/this.limite);
        this.paginaActual=  this.desde+1;

        this.cargando = false;
    });


  }
  cargarTipoEstado() {

    this.cargando = true;

    this.tiposdetService.cargar(0,-2,1,"" )
    .subscribe ( (res1:any) => 
    {
     console.log(res1);
        this.TipoEstado= res1['tiposdetalle'];
      
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
      this.cargarTareas();
    }

    this.cargando = false;

    this.Logs="Cambiando pagina "+ this.desde;
  }


  buscar(termino : string )
  {
      if(termino.length===0){
       
        this.busquedaNombre="";
        this.cargarTareas();
       
        return;
      }
      this.busquedaNombre=termino;
      this.cargarTareas();

      this.Logs="Buscando "+ this.busquedaNombre;
 
  }


  //////////////////////////////////////////
  // DESCARGAR 
  //////////////////////////////////////////


  descargarCSV() {
    const datosCSV = this.convertirAFormatoCSV(this.TareasAllXLS);
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
    const datosExcel = this.convertirAFormatoExcel(this.TareasAllXLS);
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datosExcel);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Datos');
    XLSX.writeFile(wb, 'datos.xlsx');
  }


   async  exportarAExcelTodo() {
    try {
      // Llamar a la función asíncrona cargar
    var result= await this.servicio.cargar(1,-1,0,0)
      .subscribe ( (res1:any) => 
      {
          this.TareasAllXLS= res1['resultado'];
          // Continuar con la generación de Excel
          const datosExcel =  this.convertirAFormatoExcel( this.TareasAllXLS);
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
      IdExpediente:dato.idexpediente,
      Expediente: dato.expediente,
      IdGestion: dato.idgestion,
      IdMarca: dato.idmarca,
      Marca: dato.marca,
      TipoProceso: dato.tipoproceso,
      Tarea: dato.tarea,
      FechaVencimiento: dato.fechavence,
      Estado: dato.estado,
      Id: dato.id
    }));

  
  }

  
///////////////////////////////////////
  //     MODAL  TAREA
  ////////////////////////////////////// 

  private _ocultarModalTarea: boolean = true;
  public camposEditarTarea : tareas=new tareas(0,0,'','','',new Date(),0,'',0,0,0,0,'','');


  get ocultarModalTarea(){
    return this._ocultarModalTarea;
  }

  abrirModalTarea(Gestiondetalle:tareas){
    
    this.camposEditarTarea =new tareas(0,0,'','','',new Date(),1,'',Gestiondetalle.idgestion,Gestiondetalle.idexpediente,0,0,'','');

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


  salvarModalTarea()
  {

    if (this.editarTareas===0)
    {
      //crear nueva tarea
      let  nueva    : tareas =  new tareas(0,this.Empresa,'','',this.camposEditarTarea.tarea,this.fechaVenceTarea,1,'',this.camposEditarTarea.idgestion,this.camposEditarTarea.idexpediente,0,0,'','');

        console.log(nueva);
        console.log("nueva");
        console.log(this.fechaVenceTarea);

        this.servicio.crear(nueva)
          .subscribe(resp =>
          {
 //           this.Logs = JSON.stringify(resp);
            
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

      this.servicio.modificar(nueva)
        .subscribe(resp =>
        {
     //     this.Logs = JSON.stringify(resp);
          
          console.log(resp);
          Swal.fire(
            'Modificar!',
            `El item  ${this.camposEditarTarea.tarea} fue modificada con exito.`,
            'success'
          );

        });
    

    }
    this.cargarTareas();
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

  abrirModalTarea2(Gestiondetalle:tareas){
    
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

    this.servicio.cargar(this.desde,this.limite,idexpediente ,idgestion )
    .subscribe ( (res1:any) => 
    {
        this.ItemsTareas= res1['resultado'];
        this.TipoEstadoSeleccionado=  res1['resultado'].idestado;
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
