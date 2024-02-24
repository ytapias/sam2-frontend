import { Component } from '@angular/core';
import { comparacion } from 'src/app/models/comparar';
import { CompararService } from 'src/app/services/comparar.service';

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

  public Items: comparacion[]=[];
  public ItemsALL: comparacion[]=[];

  Items2 :comparacion = new comparacion('','',0,0,0,0,'',0,0,0,0,'','');

  
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


  constructor(private servicio: CompararService,)
  {
    
  }

  ngOnInit(): void {
    this.cargar() ;

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



  cambiarLimite() {
    // Lógica que deseas ejecutar cuando cambia el valor del select
    // Llama a la función adicional aquí si es necesario
    this.cargar(); 

  }


  Comparar(){
    
    this.Items2.cadena1=this.cadena1;
    this.Items2.cadena2=this.cadena2;

    this.servicio.comparar(this.Items2 )
    .subscribe ( (res1:any) => 
    {
      this.cargar();
    });



  }

  cargar() {

    this.cargando = true;

    this.servicio.cargar(0,0,0,"" )
    .subscribe ( (res1:any) => 
    {
      console.log(res1);
        this.Items= res1['resultado'];
        this.totalTipos=res1.total;
        this.paginasTotales= Math.round(this.totalTipos/this.limite);
        this.paginaActual=  this.desde+1;

        this.cargando = false;
    });

    console.log(this.Items);
  }
  

  buscar()
  {
      
 
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



//////////////////////////////////////////
  // DESCARGAR 
  //////////////////////////////////////////


  descargarCSV() {
    const datosCSV = this.convertirAFormatoCSV(this.Items);
    const blob = new Blob([datosCSV], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'comparacion.csv');
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
    XLSX.utils.book_append_sheet(wb, ws, 'Datos');
    XLSX.writeFile(wb, 'comparacion.xlsx');
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
          XLSX.utils.book_append_sheet(wb, ws, 'Datos');
          XLSX.writeFile(wb, 'comparacion.xlsx');
      });
     

    } catch (error) {
      console.error('Error al exportar a Excel:', error);
      // Manejar el error según tus necesidades
    }
   
  }


   convertirAFormatoExcel(datos: any[]): any[] {
    // Asegúrate de que tus datos estén en un formato aceptable por la librería XLSX
    return datos.map(dato => ({
      cadena1: dato.cadena1,
      cadena2: dato.cadena2,
      iteracion: dato.iteracion,
      contiene: dato.contiene,
      contienevocales: dato.contienevocales,
      contieneconsonantes: dato.contieneconsonantes,
      metodo: dato.metodo,
      levenshtein: dato.levenshtein,
      hamming: dato.hamming,
      jaccard: dato.jaccard,
      sorensenDice: dato.sorensen,
      resultadocontenido: dato.resultadocontenido,
      resultadosimilares: dato.resultadosimilares,
  
    }));
/*
[]
      ,[]
      ,[]
      ,[]
      ,[]
      ,[]
      ,[]
      ,[]
      ,[]
      ,[]
      ,[]
      ,[]
      ,[]
*/
  }

}
