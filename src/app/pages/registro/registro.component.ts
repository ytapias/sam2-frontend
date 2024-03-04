import { Component, HostListener,ElementRef, ViewChild } from '@angular/core';

import { Expedientes } from 'src/app/models/expedientes';
import { ExpedientesService } from 'src/app/services/expedientes.service';
import { Gestiones } from 'src/app/models/gestiones';
import { Marcas } from 'src/app/models/denomi.model';
import { GestionesService } from 'src/app/services/gestiones.service';

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
public APoderado =  { _id: "", nombre:"", identificacion:""};
public AGente =  { _id: "", nombre:"", identificacion:""};
public EStado =  { _id: "", nombre:"", codigo:""};


  public fecha: Date = new Date();

  public expediente2: Expedientes =new Expedientes(0,"","",0,"",0,0,"",0,"",0,"",0,"",0,"",0,"","",0,"",this.fecha,"","",this.fecha,"",this.fecha,this.fecha,
  "","","","","",this.fecha,0,this.fecha,"","","",this.fecha,"",this.fecha,"",this.fecha,0,0,"",0,0,"",this.fecha,"",0,"",0);

public elementos :number = 12;

  constructor(     
    private expedientesService: ExpedientesService, 
    private gestionesService :GestionesService){
      this.buscar(""); 

  }
 


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
    this.elementos = 50;
    if(termino !="")
    { 
      this.elementos=-1;

    }

        await this.expedientesService.cargar(1,this.elementos,0,termino )
        .subscribe ( (res1:any) => 
        {
            this.expedientesI= res1['resultado'];
         //   this.total=res1.total;
          //  this.paginasTotales= Math.round(this.total/this.limite);
           // this.paginaActual=  this.desde+1;
    
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

     //this.cargarGestion(this.expediente2.expediente);


    //  this.cerrarModalBuscar();

      //this.cargando =false;
}


//click en la tabla 

  filaClickeada(item:  Expedientes)
  {
    this.expediente2=item;


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
        }
        break;
      case 'ArrowUp':
        if (this.indiceFilaSeleccionada > 0) {
          this.indiceFilaSeleccionada--;
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

}
