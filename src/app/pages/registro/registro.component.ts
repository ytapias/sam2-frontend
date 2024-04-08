import { Component, HostListener,ElementRef, ViewChild } from '@angular/core';

import { Expedientes } from 'src/app/models/expedientes';
import { ExpedientesService } from 'src/app/services/expedientes.service';
import { Gestiones } from 'src/app/models/gestiones';
import { Marcas } from 'src/app/models/denomi.model';
import { GestionesService } from 'src/app/services/gestiones.service';
 import { formatDate } from '@angular/common';
import { TptiposdetalleService } from 'src/app/services/tptiposdetalle.service';
import { tiposdetalle } from 'src/app/models/tiposdetalle.model';
import { paisesyciudades } from 'src/app/models/paisesyciudades.model';
import { TppaisesyciudadesService } from 'src/app/services/tppaisesyciudades.service';
import { tareasService } from 'src/app/services/tareas.service';
import { tareas } from 'src/app/models/tareas.model';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: []
})
export class RegistroComponent {

  public Titulo:string="Expedientes  ";
  public SubTitulo:string="Expedientes registrados  ";

  public expedientesI: Expedientes[] =[];
  public marcasI: Marcas[] =[];

  public gestionesI: Gestiones[] =[];

  

 // public empresa: Empresas  =new Empresas("","");
 public EMpresa =  { _id: "", nombre:""};
 public PAis =  { _id: "", nombre:"", codpais:""};
 public MArca =  { _id: "", marca:""};

 public TIpo =  { _id: "", nombre:"", codigo:""};
 public PErsona =  { _id: "", nombre:"", identificacion:""};

public TIpoProceso =  { _id: "", nombre:"", codigo:""};
public TIpoMarca =  { _id: "", nombre:"", codigo:""};
public APoderado =  { _id: "", nombre:"", apellido:"", identificacion:"",direccion:""};
public AGente =  { _id: "", nombre:"", identificacion:"",direccion:""};
public Solicitante =  { _id: "", nombre:"",apellido:"",  identificacion:"",direccion:""};

public EStado =  { _id: "", nombre:"", codigo:""};


  public fecha: Date = new Date();

  public expediente2: Expedientes =new Expedientes(0,"","",0,"",0,0,"",0,"",0,"",0,"",0,"",0,"",0,"","",0,"",this.fecha,"","",this.fecha,"",this.fecha,this.fecha,
  "","","","","",this.fecha,0,this.fecha,"","","",this.fecha,"",this.fecha,"",this.fecha,0,0,"",0,0,"",this.fecha,"",0,"",0);

public elementos :number = 12;



public TiposActuacion: tiposdetalle[]=[];
public TiposProceso: tiposdetalle[]=[];
public TipoEstado: tiposdetalle[]=[];
public ClaseActuacion: tiposdetalle[]=[];
public paises: paisesyciudades[]=[];

opcionSeleccionada2: number=0; 
  opcionSeleccionada3: number=0; 
  opcionSeleccionada4: number=0; 
  TipoEstadoSeleccionado: number=1; 
  idpaisseleccionado: number=0;  

  
  get Empresa():number{
    let idempresa=  localStorage.getItem('emp') || '';
    return parseInt(idempresa);
  } 

  constructor(     
    private expedientesService: ExpedientesService, 
    private tiposdetService: TptiposdetalleService,
    private gestionesService :GestionesService,
    private paisesyciudadesService: TppaisesyciudadesService,
    private servicio: GestionesService,
    private tareasService: tareasService){
      this.buscar( this.busqueda); 

      this.cargarTipoEstado();
      this.cargarTipoProceso();
      this.cargarTipoActuacion();
      this.cargarPais();
    //  this.cargarGestion() ;

  }

  ////////////////////
  //minimizar
  seccionMinimizada: boolean = true;

  toggleMinimizar() {
    this.seccionMinimizada = !this.seccionMinimizada;
  }

  //FIN minimizar
  ////////////////////
  public Items1: Gestiones[]=[];

  
  cargarGestion(idexpediente : number=0) {

    this.cargando = true;

    this.servicio.cargar(this.desde,this.limite,idexpediente,"" )
    .subscribe ( (res1:any) => 
    {
        this.Items1= res1['resultado'];
        
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

  busqueda : string = "";
  async buscar(termino : string )
  {
    //if( this.cargando ==false)
    //{
      //  this.cargando =true;
       // if(termino.length===0){
          //  console.log(this.TiposDetalleTEMP);
          // this.TiposDetalle= this.TiposDetalleTEMP;
          //      this.cargar();
     //     return;
   //       }
 //        console.log(termino);
          
    // if(termino.length>0)
     // {
    if(this.busqueda!=termino)
        this.busqueda= termino;
    
    this.elementos = 50;
    if(termino !="")
    { 
      this.elementos=-1;

    }

        await this.expedientesService.cargar(this.desde,this.elementos,0,this.busqueda )
        .subscribe ( (res1:any) => 
        {
            this.expedientesI= res1['resultado'];
            this.total=res1.total;
            this.paginasTotales= Math.round(this.total/this.limite);
            this.paginaActual=  this.desde+1;
    
            //this.cargando = false;
        });
        /*
            this.busquedasService.buscar('expedientes', termino)
            .subscribe(resp=>{
                console.log(resp);
                this.expedientesI=resp;
            });
  
            */
           // this.cargando =false;
      //}
      
  
   // }
       
      
   // this.abrirModalBuscar();
  }

  abrir(expediente:Expedientes)
    {
     // this.cargando =true;
      this.expediente2.expediente= expediente.expediente;
      this.expediente2.tipoproceso= expediente.tipoproceso;
      this.expediente2.idtipoproceso= expediente.idtipoproceso;


      this.expediente2.idpais= expediente.idpais;
      this.expediente2.pais= expediente.pais;
      this.expediente2.clase= expediente.clase;
      this.expediente2.resolucion= expediente.resolucion;
      this.expediente2.tiporesolucion= expediente.tiporesolucion;
      this.expediente2.marca= expediente.marca;
      this.expediente2.idmarca= expediente.idmarca;
      this.expediente2.idapoderado= expediente.idapoderado;

      this.expediente2.apoderado= expediente.apoderado;

      this.expediente2.fechaconb=  expediente.fechaconb;
      this.expediente2.fechapb=  expediente.fechapb;
      this.expediente2.fechapub=  expediente.fechapub;
      this.expediente2.fecharesb=  expediente.fecharesb;
      this.expediente2.fechainac=  expediente.fechainac;
      this.expediente2.fecharesb=  expediente.fechapri;

      this.expediente2.vencimb=  expediente.vencimb;
      this.expediente2.certif=  expediente.certif;

      this.expediente2.gaceta=  expediente.gaceta;
      this.expediente2.resolucion=  expediente.resolucion;
      this.expediente2.tipoprod=  expediente.tipoprod;
      this.expediente2.tiporesolucion=  expediente.tiporesolucion;



      //this.MArca = expediente.marca;
     // this.EMpresa = expediente.empresa;
     //this.PAis = expediente.pais ;

    //  this.TIpoProceso =  expediente.idtipoproceso;
   //   this.TIpoMarca =  expediente.tipomarca;
      //this.APoderado =  expediente.codapoderado;
     // this.AGente =  expediente.codagente ;

     // this.EStado =  expediente.estado ;


      if(this.APoderado == null ||this.APoderado  == undefined )
      {
        this.APoderado =  { _id: "", nombre:"",apellido:"",  identificacion:"" ,direccion:""};
      }
      
      if(this.Solicitante == null ||this.Solicitante  == undefined )
      {
        this.Solicitante =  { _id: "", nombre:"", apellido:"", identificacion:"" ,direccion:""};
      }
      if(this.AGente == null ||this.AGente  == undefined )
      {
        this.AGente =  { _id: "", nombre:"", identificacion:"",direccion:""};
      }

      if(this.PAis == null ||this.PAis  == undefined )
      {
        this.PAis =  { _id: "", nombre:"", codpais:""};
      }

      if(this.MArca == null ||this.MArca  == undefined )
      {
        this.MArca =  { _id: "", marca:"" };
      }

      if(this.TIpo == null ||this.TIpo  == undefined )
      {
        this.TIpo =  { _id: "", nombre:"" ,codigo:"" };
      }

      if(this.PErsona == null ||this.PErsona  == undefined )
      {
        this.PErsona =  { _id: "", nombre:"" ,identificacion:"" };
      }

      if(this.TIpoProceso == null ||this.TIpoProceso  == undefined )
      {
        this.TIpoProceso =  { _id: "", nombre:"" ,codigo:"" };
      }

      if(this.TIpoMarca == null ||this.TIpoMarca  == undefined )
      {
        this.TIpoMarca =  { _id: "", nombre:"" ,codigo:"" };
      }

      console.log("entre a abrir item");



     //this.cargarGestion(this.expediente2.expediente);


    //  this.cerrarModalBuscar();

      //this.cargando =false;
}


//click en la tabla 

  filaClickeada(item:  Expedientes)
  {
    this.expediente2=item;
    this.cargarGestion(item.id);

  }


//manejar tabla por teclado 

indiceFilaSeleccionada: number = -1; // Empezamos con -1, que indica que ninguna fila está seleccionada
  @ViewChild('table')
  tabla!: ElementRef; // Utiliza ViewChild para acceder a la tabla


manejarTeclado(event: KeyboardEvent) {
    if (!this.tabla || !this.tabla.nativeElement) return;

    const filas = this.tabla.nativeElement.querySelectorAll('tbody tr');
    
    if (!filas.length) return;

    switch (event.key) {
      case 'ArrowDown':
        if (this.indiceFilaSeleccionada < filas.length - 1) {
          this.indiceFilaSeleccionada++;
          console.log("arriba");
        }
        break;
      case 'ArrowUp':
        if (this.indiceFilaSeleccionada > 0) {
          this.indiceFilaSeleccionada--;
          console.log("abajo");
        }
        break;
    }

    this.resaltarFila(filas);
  }

  resaltarFila(filas: NodeListOf<Element>) {
    // Elimina la clase 'selected' de todas las filas
    filas.forEach(fila => fila.classList.remove('selected'));

    // Agrega la clase 'selected' a la fila actualmente seleccionada
    if (this.indiceFilaSeleccionada >= 0 && this.indiceFilaSeleccionada < filas.length) {
      filas[this.indiceFilaSeleccionada].classList.add('selected');
      filas[this.indiceFilaSeleccionada].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }


  //menu contextual

  
    mostrarMenuContextual(event: MouseEvent): void {
      event.preventDefault();
      this.menuPosicion = { x: event.clientX, y: event.clientY };
      this.menuVisible = true;
    }


    menuVisible: boolean = false;
    menuPosicion = { x: 0, y: 0 };
    
    @HostListener('document:click')
    ocultarMenu(): void {
      this.menuVisible = false;
    }
  
    editar(): void {
      // Lógica para editar
      this.ocultarMenu();
    }
  
    crearGestion(): void {
      // Lógica para crear gestión
      this.ocultarMenu();
    }

    
    public total : number=0;
    public desde : number=0;
    public paginaActual : number=0;
    public paginasTotales : number=0;
    public limite  : number=5;
    public cargando : boolean=true;
    public filtro : number=0;
  
  cambiarPagina(valor: number)
  {
    let antiguo_valor = this.desde;
    /*
    if(valor =0)
    {
      this.desde=1;
    }
    else if(valor = 99)
    {
      this.desde=this.paginasTotales-1;
    }
    else{
    
    }
    */
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
      this.buscar( this.busqueda);
    }

    this.cargando = false;

    //this.Logs="Cambiando pagina "+ this.desde;
  }


  abrirUrl(): void {
    window.open('https://sipi.sic.gov.co/sipi/Extra/IP/TM/Qbe.aspx?sid=638452362591870433', '_blank');
  }

   public camposEditar2 : Gestiones=new Gestiones(0,0,0,0,0,'',0,'',0,0,'',new Date(),0,'',new Date(),'','',0,'');


    //////////////////////////////////////////
  // MODAL 
  //////////////////////////////////////////

  private _ocultarModal: boolean = true;
  private _ocultarModalgestionP: boolean = true;

  private _ocultarModalgestion: boolean = true;
  private _Crear: boolean = true;
  private _Uid: string = "";

   public camposEditar : Expedientes=new Expedientes(0,"","",0,"",0,0,"",0,"",0,"",0,"",0,"",0,"",0,"","",0,"",this.fecha,"","",this.fecha,"",this.fecha,this.fecha,
   "","","","","",this.fecha,0,this.fecha,"","","",this.fecha,"",this.fecha,"",this.fecha,0,0,"",0,0,"",this.fecha,"",0,"",0);
 
      
    
    abrirCrear(){
        //console.log(this.modalFormularioServices.ocultarModal);
        this._Crear=true;
        this.SubTitulo="Crear";
        
        this.camposEditar =new Expedientes(0,"","",0,"",0,0,"",0,"",0,"",0,"",0,"",0,"",0,"","",0,"",this.fecha,"","",this.fecha,"",this.fecha,this.fecha,
        "","","","","",this.fecha,0,this.fecha,"","","",this.fecha,"",this.fecha,"",this.fecha,0,0,"",0,0,"",this.fecha,"",0,"",0);
      
        this.abrirModal();
    }

    abrirModificar(dtiposdetalle:Expedientes){
      this._Crear=false;

      this.SubTitulo="Modificar";

      this.camposEditar = dtiposdetalle;
      // this.opcionSeleccionada2 = this.camposEditar.idtipopersona;
      // this.opcionSeleccionada3 = this.camposEditar.idtipoidentificacion;
      // this.opcionSeleccionada4 = this.camposEditar.idciudad;

      this.abrirModal();
    }
    salvarModal()
    {
      
      // if(this.opcionSeleccionada2>0)
      // {
      //   this.camposEditar.id = this.opcionSeleccionada2 ; 
      // }
      // else{
      //   this.camposEditar.id = 1;
      // }
      
      // console.log( this.camposEditar);


      //   if(this._Crear === true)
      //   {
      //     this.personasService.crear(this.camposEditar)
      //       .subscribe({
      //         next: (resp: RespuestaBackend) => {
      //             this.Logs = JSON.stringify(resp);
      //             console.log(resp);

      //             // Comprobamos si 'resp' tiene la propiedad 'resultado' y luego 'nuevoID'
      //             if (resp && resp.resultado && resp.resultado.nuevoID > 0) {
      //                 // Si nuevoID es mayor que 0, manejar como éxito
      //                 Swal.fire(
      //                   'Crear!',
      //                   `El item  ${ this.camposEditar.nombre } fue creado con exito.`,
      //                   'success'
      //                 );
      //             } else {
      //                 // Manejar los casos en los que nuevoID no es mayor que 0
      //                 let mensajeError = 'Ocurrió un error desconocido.';
      //                 if (resp && resp.resultado) {
      //                     mensajeError = resp.resultado.mensaje || mensajeError;
      //                 }
      //                 Swal.fire(
      //                     'Crear',
      //                     mensajeError,
      //                     'error'
      //                 );
      //             }
      //         },
      //         error: (errorResp) => {
      //             // Manejo de errores de la petición
      //             console.error('Error en la petición:', errorResp);
      //             Swal.fire(
      //                 'Error en la Petición',
      //                 'Ocurrió un error al realizar la petición al servidor.',
      //                 'error'
      //             );
      //         }
      //     });
 
      //   }
      //   else
      //   {
                
      //     this.personasService.modificar(this.camposEditar)
      //     .subscribe({
      //         next: (resp: RespuestaBackend) => {
      //             this.Logs = JSON.stringify(resp);
      //             console.log(resp);

      //             // Comprobamos si 'resp' tiene la propiedad 'resultado' y luego 'nuevoID'
      //             if (resp && resp.resultado && resp.resultado.nuevoID > 0) {
      //                 // Si nuevoID es mayor que 0, manejar como éxito
      //                 Swal.fire(
      //                     'Modificar',
      //                     `El item fue modificado con éxito. ID Nuevo: ${resp.resultado.nuevoID}`,
      //                     'success'
      //                 );
      //             } else {
      //                 // Manejar los casos en los que nuevoID no es mayor que 0
      //                 let mensajeError = 'Ocurrió un error desconocido.';
      //                 if (resp && resp.resultado) {
      //                     mensajeError = resp.resultado.mensaje || mensajeError;
      //                 }
      //                 Swal.fire(
      //                     'Modificar',
      //                     mensajeError,
      //                     'error'
      //                 );
      //             }
      //         },
      //         error: (errorResp) => {
      //             // Manejo de errores de la petición
      //             console.error('Error en la petición:', errorResp);
      //             Swal.fire(
      //                 'Error en la Petición',
      //                 'Ocurrió un error al realizar la petición al servidor.',
      //                 'error'
      //             );
      //         }
      //     });
 
      

      //   }

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


    miVariable: string | undefined; // Esta es la variable que llenarás con el texto pegado

    onPaste(event: ClipboardEvent) {
      // Usa el objeto ClipboardEvent para acceder al texto pegado
      if (event.clipboardData) {
        const pastedText = event.clipboardData.getData('text');
        this.miVariable = pastedText;



        let variable :string ="";
        let Operacion = 0;


        
        const lineas = this.miVariable.split('\n');
        lineas.forEach(linea => {


          try
          {


              // Buscar y procesar "Referencia del solicitante"
              if (linea.includes('Referencia del solicitante')) {
              this.camposEditar.agente = linea.split('\t')[1].trim();
              }

              //------------------------------------
              //------------------------------------
              // Buscar y procesar "Estado"
              if (linea.includes('Estado')) {
              // Asumiendo que "Fecha de radicación" siempre sigue a "Estado"
              this.camposEditar.tiposolicitud= linea.split('Tipo de solicitud')[1].split('Fecha de orden de publicación')[0].trim();
              }

              // if (linea.includes('Fecha de orden de publicación')) {
              //   // Asumiendo que "Fecha de radicación" siempre sigue a "Estado"
              //   variable= linea.split('Fecha de orden de publicación')[1].split('\t')[1].trim();
              //   console.log(variable);
              //   console.log( this.procesarFecha(variable));

              //   if(variable !== null)
              //   {
              //     this.camposEditar.fechapub= this.procesarFecha(variable);
              //   }
              //   variable ="";
              // }

              //------------------------------------
              //------------------------------------
              // Buscar y procesar "Estado"
              if (linea.includes('Estado')) {
              // Asumiendo que "Fecha de radicación" siempre sigue a "Estado"
              this.camposEditar.tipoestadotramite= linea.split('Estado')[1].split('Fecha de radicación')[0].trim();
              }

              if (linea.includes('Fecha de radicación')) {
              // Asumiendo que "Fecha de radicación" siempre sigue a "Estado"
              variable= linea.split('Fecha de radicación')[1].split('\t')[1].trim();
              console.log(variable);
              console.log( this.procesarFecha(variable));

              if(variable !== null)
              {
              this.camposEditar.fechapb= this.procesarFecha(variable);
              let [dia, mes, anno] = variable.split(' ');

              // console.log("año");
              // console.log(anno);
              // console.log(variable);

              this.camposEditar.anno=parseInt(anno);
              }
              variable ="";
              }
              //------------------------------------
              //------------------------------------


              //------------------------------------
              //------------------------------------
              // Buscar y procesar "Estado"
              if (linea.includes('Tipo de solicitud')) {
              // Asumiendo que "Fecha de radicación" siempre sigue a "Estado"
              this.camposEditar.tiposolicitud= linea.split('Tipo de solicitud')[1].split('Fecha de orden de publicación')[0].trim();
              }

              if (linea.includes('Fecha de orden de publicación')) {
              // Asumiendo que "Fecha de radicación" siempre sigue a "Estado"
              variable= linea.split('Fecha de orden de publicación')[1].split('\t')[1].trim();
              console.log(variable);
              console.log( this.procesarFecha(variable));

              if(variable !== null)
              {
              this.camposEditar.fechapub= this.procesarFecha(variable);
              }
              variable ="";
              }
              //------------------------------------
              //------------------------------------
              //this.Solicitante =  { _id: "", nombre:"", identificacion:"" ,direccion:""};
              //------------------------------------
              //------------------------------------
              // Buscar y procesar "Estado"

              if(Operacion==11)
              {
              let [identificacion1,otro2,Nombres1, Apellidos1,Direccion,otro] = linea.split('\t');
              Direccion = Direccion.replace('Dirección Física', '');
              Direccion = Direccion.replace(' : ', '');
              Direccion = Direccion.replace('\r', '');
              Operacion=0;

              // console.log("DIRECCION");

              // console.log(identificacion1);
              // console.log(Nombres1);
              // console.log(Apellidos1);
              // console.log(Direccion);
              // console.log(otro);
              this.APoderado.identificacion= identificacion1;
              this.APoderado.nombre= Nombres1;
              this.APoderado.apellido= Apellidos1;
              this.APoderado.direccion= Direccion;
              this.camposEditar.apoderado= Nombres1 +' ' +Apellidos1;
              console.log(this.APoderado);
              }

              if(linea.includes('Apoderado')){
              Operacion= 1;
              }

              if (linea.includes('Número de identificación') && Operacion== 1 ) {
              // Asumiendo que "Fecha de radicación" siempre sigue a "Estado"
              Operacion= 11;
              }


              // if (linea.includes('Número de identificación') && Operacion== 1 ) {
              //   // Asumiendo que "Fecha de radicación" siempre sigue a "Estado"
              //   this.camposEditar.tiposolicitud= linea.split('Tipo de solicitud')[1].split('Fecha de orden de publicación')[0].trim();
              // }



              //------------------------------------
              //------------------------------------

              //------------------------------------
              //------------------------------------
              // Buscar y procesar "Estado"

              if(Operacion==22)
              {
              let [identificacion2,otro2,Nombres2, Direccion2,otro] = linea.split('\t');

              // console.log(identificacion2);
              // console.log(otro2);
              // console.log(Nombres2);

              // console.log(Direccion2);
              // console.log(otro);



              Direccion2 = Direccion2.replace('Dirección Física', '');
              Direccion2 = Direccion2.replace(' : ', '');
              Direccion2 = Direccion2.replace('\r', '');
              Operacion=0;


              this.Solicitante.identificacion= identificacion2;
              this.Solicitante.nombre= Nombres2;
              this.Solicitante.apellido= "";
              this.Solicitante.direccion= Direccion2;
              this.camposEditar.solicitante=  this.Solicitante.nombre;

              console.log(this.Solicitante);
              }

              if(linea.includes('Solicitante')){
              Operacion= 2;
              }

              if (linea.includes('Número de identificación') && Operacion== 2 ) {
              // Asumiendo que "Fecha de radicación" siempre sigue a "Estado"
              Operacion= 22;
              }




              //------------------------------------
              //------------------------------------


              //------------------------------------
              //------------------------------------
              // Clase

              if(Operacion==33)
              {
              let [clase,descripcion] = linea.split('\t');


              this.camposEditar.clase=  clase;
              Operacion=0;
              }

              if(linea.includes('Descripción de productos y/o servicios')){
              Operacion= 3;
              }

              if (linea.includes('Clase(s)') && Operacion== 3 ) {
              // Asumiendo que "Fecha de radicación" siempre sigue a "Estado"
              Operacion=33;
              }




              //------------------------------------
              //------------------------------------

              //------------------------------------
              //------------------------------------
              // PAis

              if(Operacion==44)
              {
              let [pais,fechaprioridad,numeroprioridad,clase1,reinvindicaciones] = linea.split('\t');

              this.camposEditar.pais=  pais;
              // console.log("fechaprioridad");
              // console.log(fechaprioridad);
              // console.log(pais);
              // console.log(numeroprioridad);
              // console.log(clase1);
              // console.log(reinvindicaciones);


              this.camposEditar.fechapri=  this.procesarFecha(fechaprioridad);
              Operacion=0;
              }

              if(linea.includes('País') && linea.includes('Fecha de prioridad') ){
              Operacion= 44;
              }





              //------------------------------------
              //------------------------------------



              if (linea.includes('Versión de la Clasificación de Niza')) {
              // Asumiendo que "Fecha de radicación" siempre sigue a "Estado"
              this.camposEditar.vcniza=  parseInt(linea.split('Versión de la Clasificación de Niza')[1].split('\t')[1].trim());
              }


              if (linea.includes('Tipo de Signo Distintivo')) {
              // Asumiendo que "Fecha de radicación" siempre sigue a "Estado"
              let tipoSIgno= linea.split('Tipo de Signo Distintivo')[1].split('\t')[1].trim();
              }

              if (linea.includes('Denominación del Signo')) {
              // Asumiendo que "Fecha de radicación" siempre sigue a "Estado"
              this.camposEditar.marca= linea.split('Denominación del Signo')[1].split('\t')[1].trim();
              }


              if (linea.includes('Naturaleza')) {
              // Asumiendo que "Fecha de radicación" siempre sigue a "Estado"
              let naturaleza=  linea.split('Naturaleza')[1].split('\t')[1].trim();
              }


              if (linea.includes('Número de la gaceta')) {
              // Asumiendo que "Fecha de radicación" siempre sigue a "Estado"
              this.camposEditar.gaceta= linea.split('Número de la gaceta')[1].split('Fecha de publicación')[0].trim();
              }




          
          
          
          }catch(error)
          {
            console.log("error");
            console.log(error);

          }




          // ... procesar otras líneas según sea necesario
        });

       // console.log(this.miVariable);
      

      } else {
        // Manejar la situación cuando clipboardData es null, si es necesario
      }
    }

  procesarFecha(fechaTexto: string): Date  {
      // Define el tipo de objeto con un índice de tipo string
      const meses: { [key: string]: string } = {
        ene: '01', feb: '02', mar: '03', abr: '04', may: '05', jun: '06',
        jul: '07', ago: '08', sep: '09', oct: '10', nov: '11', dic: '12'
      };

      // Dividir la fecha en sus componentes
      const componentes = fechaTexto.split(' '); 
      let fecharesp :Date;
    //  console.log(componentes);

      if (componentes.length === 3) {
        let [dia, mesTexto, año] = componentes;
        mesTexto = mesTexto.replace('.', ''); // Elimina el punto del mes

        // Convierte el mes a número y verifica que sea válido
        const mes = meses[mesTexto.toLowerCase()];
        if (!mes) {
          console.error('Mes no válido:', mesTexto);
          return   new Date();
        }
//console.log(mes);

        // Reorganiza la fecha en un formato que JavaScript pueda entender
        const fechaFormateada = `${año} ${mes} ${dia.padStart(2, '0')}`;
       
        // Crear el objeto Date
         fecharesp = new Date(fechaFormateada);

        //  const df = moment(fecharesp,"DD/MM/YYYY"); 

        //  const locale ='en-US';
        //  const format='yyyy-MM-dd';

        //    console.log("this.formatearFecha(fechaFormateada)");
        //    console.log(formatDate(fecharesp,format,locale));

           

          return   fecharesp ;

       



      } else {
        console.error('Formato de fecha no válido:', fechaTexto);
        return   new Date();  }
  }

  

    
  ///////////////////////////////////////
  //    FIN MODAL
  ////////////////////////////////////// 







  

  /////////////////////////////////////////
  //   mODAL 2
  /////////////////////////////////////////


  get ocultarModalgestionP(){
    return this._ocultarModalgestionP;
  }

   public TituloBoton : string="Gestiones";

  abrirGestiones(){


    this._ocultarModalgestionP=!this._ocultarModalgestionP;

    console.log(this.TituloBoton);
    if ( this.TituloBoton =="Gestiones")
    {
      this.TituloBoton ="Expedientes";
    }
    else{
      this.TituloBoton ="Gestiones";
    }
  }

   /////////////////////////////////////////
  //   mODAL 2
  /////////////////////////////////////////


  get ocultarModalgestion(){
    return this._ocultarModalgestion;
  }

  abrirModalGestion(){
    this._ocultarModalgestion=false;

  }

  cerrarModalGestion(){
    this._ocultarModalgestion=true;
   
  

  }


///////////////////////////////////////
  //     MODAL  TAREA
  ////////////////////////////////////// 

  private _ocultarModalTarea: boolean = true;
  public camposEditarTarea : tareas=new tareas(0,0,'','','',new Date(),0,'',0,0,0,0,'','');


  get ocultarModalTarea(){
    return this._ocultarModalTarea;
  }

  abrirModalTarea(Gestiondetalle:Gestiones){
    
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

      this.tareasService.modificar(nueva)
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

  abrirModalTarea2(Gestiondetalle:Gestiones){
    
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
