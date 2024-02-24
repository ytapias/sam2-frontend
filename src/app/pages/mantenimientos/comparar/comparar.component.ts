import { Component } from '@angular/core';

import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-comparar',
  templateUrl: './comparar.component.html',
  styleUrls: []
})
export class CompararComponent {
  public totalTipos:number = 0;
 
  public total:number = 0;

  public Tipo: number=0;

  public cadena1:string= "";

  public cadena2:string = "";

  
  Fechavencimiento: Date= new Date();
  Fechaactuacion: Date= new Date();
  
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


  constructor()
  {
    
  }

  ngOnInit(): void {
   

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

   


  toggleMinimizar() {
    this.seccionMinimizada = !this.seccionMinimizada;
  }


  Comparar(){
    
  }

}
