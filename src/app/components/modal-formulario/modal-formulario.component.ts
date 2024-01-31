import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl,FormGroup,Validators} from '@angular/forms';
import { Iciudadesypaises } from 'src/app/interfaces/iciudadesypaises';
import { Iempresas } from 'src/app/interfaces/iempresas';
import { Ioptions } from 'src/app/interfaces/ioption';
import { Empresas } from 'src/app/models/empresas.model';
import { paisesyciudades } from 'src/app/models/paisesyciudades.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalFormularioService } from 'src/app/services/modalFormulario.service';


@Component({
  selector: 'app-modal-formulario',
  templateUrl: './modal-formulario.component.html',
  styleUrls: [],
})

export class ModalFormularioComponent implements OnInit{
 

  constructor(public modalImacenService: ModalFormularioService,private busquedasService : BusquedasService,
    public fb : FormBuilder )
  {
    
  }
  
  ngOnInit(): void {
   
     ////////////////////////////////////////
                    //    PARA MODAL  - NUEVO - MODIFICAR
                    ////////////////////////////////////////
                    this.Formulario = this.fb.group({
                      nombre: new FormControl(''),
                      identificacion: new FormControl(''),
                      dv: new FormControl(''),
                      telefono1: new FormControl(''),
                      telefono2: new FormControl(''),
                      celular: new FormControl(''),
                      direccion: new FormControl(''),
                      tipo: new FormControl(''),
                      ciudad: new FormControl(''),
                      correo: new FormControl(''),
                      otro: new FormControl(''),
                      uid: new FormControl(''),
                    })

    //this.opcionesModal(titulo);

     
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
 
  Formulario!: FormGroup;

  private _ocultarModal: boolean = true;
  private _Crear: boolean = true;
  private _Uid: string = "";

  public Items : Iempresas | Iciudadesypaises | undefined;

    public IEmpresa:Iempresas={
    identificacion: 0,
    dv: 0,
    nombre: "",
    
    telefono1: "",
    telefono2: "",
    celular: "",
    otro: "",

    direccion: "",
    correo: "",
    idestado: "",
    _id: "",
    uid: "",
    tipo: { _id: "",
    nombre:""},
    ciudad: { _id: "",
    nombre:""},
    };
 

    public ICudadPais:Iciudadesypaises={espais:false,
      codciudad:"",
      codpais:"",
      nombre:"",
      otro:""
    };

    

    campos: any[] = [
      { tipo: 'hidden', etiqueta: 'uid',placeholder: 'Es un pais o una ciudad', icon: 'ti-world', nombreControl: 'uid', validaciones: [],dato:"" },
    ]
    empresasARR: any[] = [
      { tipo: 'hidden', etiqueta: 'uid',placeholder: 'Es un pais o una ciudad', icon: 'ti-world', nombreControl: 'uid', validaciones: [],dato:"" },
      { tipo: 'text', etiqueta: 'Identificacion',placeholder: 'Digite identificacion', icon: 'ti-direction-alt', nombreControl: 'identificacion',dato:""},
      { tipo: 'text', etiqueta: 'Dv',placeholder: 'Digite el Dv', icon: 'ti-direction-alt', nombreControl: 'dv',dato:""},
      { tipo: 'text', etiqueta: 'Nombre',placeholder: 'Digite Nombre ciudad', icon: 'ti-pencil-alt2', nombreControl: 'nombre',dato:""},
      { tipo: 'text', etiqueta: 'Telefono 1',placeholder: 'Digite telefono 1', icon: 'ti-direction-alt', nombreControl: 'telefono1',dato:""},
      { tipo: 'text', etiqueta: 'Telefono 2',placeholder: 'Digite telefono 2', icon: 'ti-direction-alt', nombreControl: 'telefono2',dato:""},
      { tipo: 'text', etiqueta: 'Celular',placeholder: 'Digite celular', icon: 'ti-direction-alt', nombreControl: 'celular',dato:""},
      { tipo: 'text', etiqueta: 'Direccion',placeholder: 'Digite direccion', icon: 'ti-direction-alt', nombreControl: 'direccion',dato:""},
      { tipo: 'text', etiqueta: 'Correo',placeholder: 'Digite correo', icon: 'ti-direction-alt', nombreControl: 'correo',dato:""},
      { tipo: 'select', etiqueta: 'Tipo',placeholder: 'Tipo', icon: 'ti-world', nombreControl: 'tipo', validaciones: [],dato:""},
      { tipo: 'select', etiqueta: 'Ciudad',placeholder: 'Ciudad', icon: 'ti-world', nombreControl: 'ciudad', validaciones: [],dato:""},

      // Puedes añadir más campos aquí
    ];
      


    espais : boolean=false;
    Lespais :Ioptions[]=[
      {id:'1',nombre:'Si'},
      {id:'0',nombre:'No'},
    ];

    paisesyciudadesARR: any[] = [
      { tipo: 'hidden', etiqueta: 'uid',placeholder: '', icon: 'ti-world', nombreControl: 'uid', validaciones: [],dato:"" },

      { tipo: 'select', etiqueta: 'Es Pais',placeholder: 'Es un pais o una ciudad', icon: 'ti-world', nombreControl: 'espais', validaciones: [],dato:this.Lespais },
      { tipo: 'text', etiqueta: 'Codigo Pais',placeholder: 'Digite codigo pais', icon: 'ti-direction-alt', nombreControl: 'codpais',dato:""},
      { tipo: 'text', etiqueta: 'Codigo Ciudad',placeholder: 'Digite codigo ciudad', icon: 'ti-location-arrow', nombreControl: 'codciudad',dato:""},
      { tipo: 'text', etiqueta: 'Nombre',placeholder: 'Digite Nombre ciudad', icon: 'ti-pencil-alt2', nombreControl: 'nombre',dato:""},
      { tipo: 'text', etiqueta: 'Detalle',placeholder: 'Digite detalle ciudad', icon: ' ti-marker-alt', nombreControl: 'otro',dato:""},
  
      // Puedes añadir más campos aquí
    ];

    Titulo: string="Empresas";
    SubTitulo: string="ingrese los datos de empresas";

    abrirCrear(titulo: string){
        //console.log(this.modalFormularioServices.ocultarModal);
        this._Crear=true;
        
        this.opcionesModal(titulo);

        this.SubTitulo="Crear Empresas";
        this.abrirModal();
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

    opcionesModal(titulo: string)
    {
        switch(titulo)
        {
          case 'empresas':
            {
                this.campos=this.empresasARR;
                this.Titulo="Empresas";
                this.SubTitulo="ingrese los datos de empresas";
                
                this.Items =this.IEmpresa;

                this.Formulario = this.fb.group({
                  nombre: new FormControl(''),
                  identificacion: new FormControl(''),
                  dv: new FormControl(''),
                  telefono1: new FormControl(''),
                  telefono2: new FormControl(''),
                  celular: new FormControl(''),
                  direccion: new FormControl(''),
                  tipo: new FormControl(''),
                  ciudad: new FormControl(''),
                  correo: new FormControl(''),
                  otro: new FormControl(''),
                  uid: new FormControl(''),
                })

                break;
            }
            case 'paisesyciudades':
            {
              this.campos=this.paisesyciudadesARR;
              this.Titulo="Paises y Ciudades";
              this.SubTitulo="ingrese los datos de paises y/o ciudades";
              
              this.Items =this.ICudadPais;
              
              this.Formulario = this.fb.group({
                espais: new FormControl(''),
                codciudad: new FormControl(''),
                codpais: new FormControl(''),
                nombre: new FormControl(''),
                otro: new FormControl(''),
                uid: new FormControl(''),
              })

              break;
            }

        }

    }

    opcionesModalModificar(titulo: string,DItemActual:any)
    {
        switch(titulo)
        {
          case 'empresas':
            {
              this.SubTitulo="Modificar Empresas";
              
              this.Formulario = this.fb.group({
                nombre:DItemActual.nombre,
                identificacion: DItemActual.identificacion,
                dv: DItemActual.dv,
                telefono1: DItemActual.telefono1,
                telefono2: DItemActual.telefono2,
                celular: DItemActual.celular,
                correo: DItemActual.correo,
                otro: DItemActual.otro,
                direccion: DItemActual.direccion,
                tipo: DItemActual.tipo,
                ciudad: DItemActual.ciudad,
                uid:DItemActual.uid,
              })
                break;
            }
            case 'paisesyciudades':
            {
              let tipo : number=1;

              if(DItemActual.espais==true)
                  tipo=1;
              else
                  tipo=0;

            
            
              this.Formulario = this.fb.group({
                espais:tipo,
                codciudad: DItemActual.codciudad,
                codpais: DItemActual.codpais,
                nombre: DItemActual.nombre,
                otro: DItemActual.otro,
                uid:DItemActual.uid,
              })
                

              break;
            }

        }

    }





    abrirModificar(titulo: string,DItemActual:Empresas | paisesyciudades){
 /*
      this._Crear=false;
      let tipo : number=1;
      this.Items = DItemActual;

      //this._Uid = Dpaisciudad.uid;
      console.log(DItemActual.uid);

      this.Items.uid=DItemActual.uid;

      this.opcionesModalModificar(titulo,DItemActual);
   
*/
      
      console.log(this.Items);
      
      this.abrirModal();
  }



    salvarModal(){

        //const espais = this.Formulario.get('espais').value
        //let espais:boolean=false;
        let ciudadPais: Iempresas = this.Formulario.value;
        
 /*
        let ciudadfinal : Empresas =new this.empresas(
                                ciudadPais.nombre, ciudadPais.identificacion,ciudadPais.dv,
                                ciudadPais.telefono1,ciudadPais.telefono2,ciudadPais.celular,
                                ciudadPais.direccion,ciudadPais.tipo,ciudadPais.ciudad,
                                ciudadPais.otro,'1','0');
       
   
        if(this._Crear === true)
        {
          //crear un elemento nuevo
        
          this.paisesYCiudadesService.crearPaisesyCiudades(ciudadfinal)
          .subscribe(resp =>
            {
            
              Swal.fire(
                'Crear!',
                `El Pais / Ciudad ${ ciudadfinal.nombre } fue creado con exito.`,
                'success'
              );

            }
              
              
            );
          

        }
        else
        {
          //modificar un elemento
          ciudadfinal.uid= ciudadPais.uid;
//          console.log('ciudadfinal');
 
          Swal.fire({
            title: 'Modificar Pais / Ciudad?',
            text: ` esta a punto de Modificar a ${ ciudadfinal.nombre } `,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Modificarlo!'
          }).then((result) => {
            if (result.isConfirmed) {
            
              this.paisesYCiudadesService.actualizarPaisesyCiudades(ciudadfinal)
              .subscribe(resp =>
                {
                
                  Swal.fire(
                    'Modificar!',
                    `El Pais / Ciudad ${ ciudadfinal.nombre } fue Modificado con exito.`,
                    'success'
                  );
    
                }                
              );
            }
          })


       

        }
 */
        console.log(ciudadPais);
        
        this.cerrarModal();
      }

  
  ///////////////////////////////////////
  //    FIN MODAL
  //////////////////////////////////////

}
