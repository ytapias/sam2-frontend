import { Component } from '@angular/core';
import { CargarService } from 'src/app/services/cargar.service';


import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-cargar',
  templateUrl: './cargar.component.html',
  styleUrls: []
})
export class CargarComponent {
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


  constructor(private servicio: CargarService)
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


  onFileChange(ev: any) {
    let workBook: XLSX.WorkBook | null = null;
    let jsonData: any = null;
    const reader = new FileReader();
    const file = ev.target.files[0];

    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial: any, name: any) => {
        const sheet = workBook!.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      const dataString = JSON.stringify(jsonData);
      this.uploadData(dataString); // función para enviar al backend
    };

    reader.readAsBinaryString(file);
  }

  uploadData(data: string) 
  {
    // Servicio HTTP para enviar los datos al backend
  //  console.log (data);
  this.servicio.cargar("gacetas",data )
  .subscribe(resp =>
    {
      this.Logs = JSON.stringify(resp);
//this.cargar();
      Swal.fire(
        'Cargado!',
        `El cargue   fue Exitoso .`,
        'success'
      );

    });
  }
}
