import { Component } from '@angular/core';
import { ClipboardService  } from 'ngx-clipboard';
 import { Expedientes } from 'src/app/models/expedientes';
import { ExpedientesService } from 'src/app/services/expedientes.service';
import { Gestiones } from 'src/app/models/gestiones';
import { Marcas } from 'src/app/models/denomi.model';
import { GestionesService } from 'src/app/services/gestiones.service';

//import { Empresas } from 'src/app/interfaces/iempresas';
 //import { Empresas } from 'src/app/models/empresas.model';


@Component({
  selector: 'app-principalform',
  templateUrl: './principalform.component.html',
  styleUrls: []
})


export class PrincipalformComponent {


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
public APoderado =  { _id: "", nombre:"", identificacion:""};
public AGente =  { _id: "", nombre:"", identificacion:""};
public EStado =  { _id: "", nombre:"", codigo:""};


  public fecha: Date = new Date();

  public expediente2: Expedientes =new Expedientes(0,"","",0,"",0,0,"",0,"",0,"",0,"",0,"",0,"","",0,"",this.fecha,"","",this.fecha,"",this.fecha,this.fecha,
  "","","","","",this.fecha,0,this.fecha,"","","",this.fecha,"",this.fecha,"",this.fecha,0,0,"",0,0,"",this.fecha,"",0,"",0);



  public desde : number=0;
  public limite  : number=5;
  public cargando : boolean=true;
  public paginaActual : number=1;
  public paginasTotales : number=0;
  public total: number= 0;



  constructor(    private clipboardApi: ClipboardService,
    private expedientesService: ExpedientesService, 
    private gestionesService :GestionesService){
      this.cargando =false;

  }
 

  private _ocultarModalGestion: boolean = true;

  AgregarGestion(expediente : Expedientes)
  {

    this._ocultarModalGestion =false;


  }

//++++++++++++++++++++++++++++++++++++
//   MODAL BUSQUEDA
//++++++++++++++++++++++++++++++++++++
   
private _ocultarModalBuscar: boolean = true;
private _Seleccionar: boolean = true;

  get ocultarModalBuscar(){
   // console.log (this._ocultarModalBuscar);
    return this._ocultarModalBuscar;
  }

  abrirModalBuscar(){
    //this.cargar();
    this._ocultarModalBuscar=false;
  }

  /*
  cargar()
  {
  //this.cargando =true;
  
                this.cargando = true;

                this.expedientesService.cargar(this.desde,this.limite,0,"")
                .subscribe ( (res1:any) => 
                {
                    this.expedientesI= res1['resultado'];
                    this.total=res1.total;
                    this.paginasTotales= Math.round(this.total/this.limite);
                    this.paginaActual=  this.desde+1;
            
                    this.cargando = false;
                });

                
                this._ocultarModalBuscar=true;
    //this.cargando =false;

  }
*/
abrir(expediente:Expedientes)
    {
      this.cargando =true;
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
        this.APoderado =  { _id: "", nombre:"", identificacion:""};
      }
      if(this.AGente == null ||this.AGente  == undefined )
      {
        this.AGente =  { _id: "", nombre:"", identificacion:""};
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

     this.cargarGestion(this.expediente2.expediente);


      this.cerrarModalBuscar();

      this.cargando =false;
}

  async buscar(termino : string )
{
  if( this.cargando ==false)
  {
      this.cargando =true;
      if(termino.length===0){
        //  console.log(this.TiposDetalleTEMP);
        // this.TiposDetalle= this.TiposDetalleTEMP;
        //      this.cargar();
        return;
        }
       console.log(termino);
        
    if(termino.length>0)
    {
  

      await this.expedientesService.cargar(this.desde,20,0,termino )
      .subscribe ( (res1:any) => 
      {
          this.expedientesI= res1['resultado'];
          this.total=res1.total;
          this.paginasTotales= Math.round(this.total/this.limite);
          this.paginaActual=  this.desde+1;
  
          this.cargando = false;
      });
      /*
          this.busquedasService.buscar('expedientes', termino)
          .subscribe(resp=>{
              console.log(resp);
              this.expedientesI=resp;
          });

          */
          this.cargando =false;
    }
    

  }
     
    
  this.abrirModalBuscar();
}
/*
buscarExpedientexMarca(termino : string )
{
  if( this.cargando ==false)
  {
      this.cargando =true;
    console.log(termino);
      
    this.cargarGestion(termino);
    
      this.cargando =false;
    

  }
     
    
  this.abrirModalBuscar();
}
*/
cargarGestion(termino : number)
{
  this.gestionesService.cargar(0,5,termino,"" )
  .subscribe ( (res1:any) => 
  {
      console.log(res1);
      this.gestionesI= res1['resultado'];
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
    this.cargarGestion(this.expediente2.expediente);
  }

  this.cargando = false;

  //this.Logs="Cambiando pagina "+ this.desde;
}


  
 

  cerrarModalBuscar(){
    this._ocultarModalBuscar=true;
  
  }

  abrirBuscar(){
    //console.log(this.modalFormularioServices.ocultarModal);
    //this._Crear=true;
    //this.SubTitulo="Crear Gestion";
    this.abrirModalBuscar();
}


  seleccionarModalBuscar(){

  }
///////////////////////////////////////
//    FIN MODAL
//////////////////////////////////////

//////////////////////////////////////
///  MODAL 2
//////////////////////////////////////


private _ocultarModal2: boolean = true;


get ocultarModal2(){
  return this._ocultarModal2;
}

cerrarModal2()
{
  this._ocultarModal2= true;

}





/////////////////////////////////////////

}

