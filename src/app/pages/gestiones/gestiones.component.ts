import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { map, pipe } from 'rxjs';
import { Expedientes } from 'src/app/models/expedientes';
import { Gestiones } from 'src/app/models/gestiones';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { GestionesService } from 'src/app/services/gestiones.service';

import { ModalFormularioService } from 'src/app/services/modalFormulario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestiones',
  templateUrl: './gestiones.component.html',
  styleUrls: []
})
export class GestionesComponent {

  public Titulo:string="Gestiones  ";
  public SubTitulo:string="gestiones registradas  ";


  public gestionesI: Gestiones[] =[];
  public expedienteI : Expedientes[]=[];

  public PAis =  { _id: "", nombre:"", codpais:""};


  public total: number= 0;
// | undefined

    public desde : number=0;
    public limite  : number=5;
    public cargando : boolean=true;
    public paginaActual : number=1;
    public paginasTotales : number=0;

    Formulario!: FormGroup;


    
  constructor(private gestionesService: GestionesService, 
    private busquedasService : BusquedasService,
    private modalFormularioServices:ModalFormularioService, 
    public fb : FormBuilder)
  {

  }

  ngOnInit(): void 
  {
  this.cargar();
  //this.modalFormularioServices

////////////////////////////////////////
                  //    PARA MODAL  - NUEVO - MODIFICAR
                  ////////////////////////////////////////
                  this.Formulario = this.fb.group({
                    empresa: new FormControl(''),
                    expediente: new FormControl(''),
                    paisrad: new FormControl(''),
                    clase: new FormControl(''),
                    tipoproc: new FormControl(''),
                    fechact: new FormControl(''),
                    sitermino: new FormControl(''),
                    vence: new FormControl(''),
                    codactua: new FormControl(''),
                    tipogest: new FormControl(''),
                   
                     otro: new FormControl(''),
                    uid: new FormControl(''),
                  })

                 

  }


  cargar()
  {
  this.cargando =true;
   this.gestionesService.cargar(this.desde,this.limite )
                .subscribe ( ({total,gestiones})=> {
                  this.total =total,
              console.log(gestiones);

                  this.gestionesI=gestiones;
                  //this.PAis=this.gestionesI.pais;
                  this.cargando =false;
                  this.paginasTotales= Math.round(this.total/this.limite);
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
      else if (this.desde >= this.total)
      {
      this.desde =antiguo_valor;
      }
      else{
      this.cargar();
      }
  }

  buscar(termino : string )
    {

    if(termino.length===0){
    //  console.log(this.TiposDetalleTEMP);
    // this.TiposDetalle= this.TiposDetalleTEMP;
    this.cargar();
    return;
    }


    console.log(termino);
    this.busquedasService.buscar('gestiones', termino)
    .subscribe(resp=>{
        console.log(resp);
        this.gestionesI=resp;
    });
    }

    eliminarItem (dPaisciudad : Gestiones)
    {
      Swal.fire({
        title: '¿Borrar gestion?',
        text: ` esta a punto de borrar a la gestion  ${ dPaisciudad.expediente } `,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Borrarlo!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.gestionesService.eliminar(dPaisciudad)
                              .subscribe(resp =>
                                {
                                  this.cargar();
                                  Swal.fire(
                                    'Borrado!',
                                    `La gestion del expediente ${ dPaisciudad.expediente } fue eliminada con exito.`,
                                    'success'
                                  );
  
                                }
                            );
        }
      })
  
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
/*
    public paisyciudad:Iciudadesypaises={espais:false,
      codciudad:"",
      codpais:"",
      nombre:"",
      otro:""
    };
*/
/*
    espais : boolean=false;
 
    Lespais :Ioptions[]=[
      {id:'1',nombre:'Si'},
      {id:'0',nombre:'No'},
    ];
*/
    campos: any[] = [
      { tipo: 'hidden', etiqueta: 'uid',placeholder: '', icon: 'ti-world', nombreControl: 'uid', validaciones: [],dato:"" },

      { tipo: 'text', etiqueta: 'Expediente',placeholder: 'digite Expediente', icon: 'ti-world', nombreControl: 'expediente', validaciones: [],dato:""},
      { tipo: 'text', etiqueta: 'Pais',placeholder: 'Digite pais radicacion', icon: 'ti-direction-alt', nombreControl: 'paisrad',dato:""},
      { tipo: 'text', etiqueta: 'Clase',placeholder: 'Digite Clase', icon: 'ti-location-arrow', nombreControl: 'clase',dato:""},
      { tipo: 'text', etiqueta: 'Tipoproc',placeholder: 'Digite tipoproc ', icon: 'ti-pencil-alt2', nombreControl: 'tipoproc',dato:""},
      { tipo: 'text', etiqueta: 'Fechact',placeholder: 'Digite Conson', icon: ' ti-marker-alt', nombreControl: 'fechact',dato:""},
  
      { tipo: 'text', etiqueta: 'Termino',placeholder: 'Digite si termino ', icon: ' ti-marker-alt', nombreControl: 'sitermino',dato:""},
  
      { tipo: 'text', etiqueta: 'Vence',placeholder: 'Digite vence', icon: ' ti-marker-alt', nombreControl: 'vence',dato:""},
      { tipo: 'text', etiqueta: 'Codactua',placeholder: 'Digite codactua', icon: ' ti-marker-alt', nombreControl: 'codactua',dato:""},
      { tipo: 'text', etiqueta: 'Tipogest',placeholder: 'Digite ', icon: ' ti-marker-alt', nombreControl: 'tipogest',dato:""},
      // Puedes añadir más campos aquí
    ];
      
   // Titulo: string="Paises y Ciudades";
   // SubTitulo: string="ingrese los datos de paises y/o ciudades";

    abrirCrear(){
        //console.log(this.modalFormularioServices.ocultarModal);
        this._Crear=true;
        this.SubTitulo="Crear Gestion";
        this.abrirModal();
    }

    abrirModificar(Dpaisciudad:Gestiones){
      this._Crear=false;
      let tipo : number=1;
    // this.marcasI = Dpaisciudad;

      //this._Uid = Dpaisciudad.uid;
      console.log(Dpaisciudad.uid);
/*
      this.paisyciudad.uid=Dpaisciudad.uid;
      if(this.paisyciudad.espais==true)
            tipo=1;
         else
            tipo=0;

*/
   
      this.Formulario = this.fb.group({
        empresa: Dpaisciudad.empresa,
        expediente: Dpaisciudad.expediente,
        paisrad: Dpaisciudad.expediente.pais,
        clase: Dpaisciudad.expediente.clase,
        tipoproc: Dpaisciudad.tipoproceso,
        fechact: Dpaisciudad.fechact,
        sitermino: Dpaisciudad.sitermino,
        vence: Dpaisciudad.vence,
      //  codactua: Dpaisciudad.actuacion,
        tipogest: Dpaisciudad.tipogestion,
         otro: Dpaisciudad.otro,
         
      })



      this.SubTitulo="Modificar Marcas";
      
      console.log(this.gestionesI);
      
      this.abrirModal();
  }
    salvarModal(){

//         //const espais = this.Formulario.get('espais').value
//         let espais:boolean=false;
//         let ciudadPais: Iciudadesypaises = this.Formulario.value;
        
 
//         let ciudadfinal : paisesyciudades =new paisesyciudades(
//                                 ciudadPais.espais,ciudadPais.codpais,ciudadPais.codciudad,
//                                 ciudadPais.nombre, new Date(),ciudadPais.otro,'1','0');
       
   
//         if(this._Crear === true)
//         {
//           //crear un elemento nuevo
        
//           this.paisesYCiudadesService.crearPaisesyCiudades(ciudadfinal)
//           .subscribe(resp =>
//             {
            
//               Swal.fire(
//                 'Crear!',
//                 `El Pais / Ciudad ${ ciudadfinal.nombre } fue creado con exito.`,
//                 'success'
//               );

//             }
              
              
//             );
          

//         }
//         else
//         {
//           //modificar un elemento
//           ciudadfinal.uid= ciudadPais.uid;
// //          console.log('ciudadfinal');
 
//           Swal.fire({
//             title: 'Modificar Pais / Ciudad?',
//             text: ` esta a punto de Modificar a ${ ciudadfinal.nombre } `,
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#3085d6',
//             cancelButtonColor: '#d33',
//             confirmButtonText: 'Si, Modificarlo!'
//           }).then((result) => {
//             if (result.isConfirmed) {
            
//               this.paisesYCiudadesService.actualizarPaisesyCiudades(ciudadfinal)
//               .subscribe(resp =>
//                 {
                
//                   Swal.fire(
//                     'Modificar!',
//                     `El Pais / Ciudad ${ ciudadfinal.nombre } fue Modificado con exito.`,
//                     'success'
//                   );
    
//                 }                
//               );
//             }
//           })


       

//         }
 
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
      this.Formulario.reset();
    

    }
  ///////////////////////////////////////
  //    FIN MODAL
  //////////////////////////////////////



    



}
