import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Administracion } from 'src/app/models/administracion.model';
import { Expedientes } from 'src/app/models/expedientes';
import { Gestiones2 } from 'src/app/models/gestiones2';
import { AdministracionService } from 'src/app/services/administracion.service';
import { Gestiones2Service } from 'src/app/services/gestiones2.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['dashboard.component.css'],
})
export class DashboardComponent {
  public Items: Administracion=new Administracion(0,"",0,"",0,0,0,0);
  public ItemsALL: Administracion[]=[new Administracion(0,"",0,"",0,0,0,0)];
  public TareasAll: Gestiones2[]=[];

  public Tareasresumen =[ { estado: 'activo', cantidad: 1 },
                            { estado: 'inactivo', cantidad: 3 }];
  
  public labels1: string []=["Activo", "Terminado"];

  public datasets1: number[]=  [
    4, 1 
  ];
    
  marcas :number=0;
  Expedientes:number=0;
  gestiones :number=0;
  gacetas:number=0;
 
  
  ngOnInit(): void {
    this.cargar();
    
  }

  constructor(private servicio: AdministracionService,
              private servicioTareas: Gestiones2Service,private router: Router)
  {
    this.cargarTareasGrafica();
    this.cargarTareas();
  }

  
  cargar() {

    this.Items.idempresa=0;
    this.Items.tipo="dashboardgeneral";
  
    this.servicio.dashboard(this.Items)
    .subscribe ( (res1:any) => 
    {
        //console.log(res1);
        this.ItemsALL= res1['resultado'];
        this.labels1= res1['resultado'].estado;
        this.labels1= res1['resultado'].cantidad;

     //   console.log(this.ItemsALL);

  
    });

  //  console.log(this.Items);
  }
  
  
  cargarTareasGrafica() {

    
  
    this.servicioTareas.cargar(0,0,0,'','','',0)
    .subscribe ( (res1:any) => 
    {
        //console.log(res1);
        this.Tareasresumen= res1['resultado'];

     //   console.log(this.ItemsALL);

  
    });

  //  console.log(this.Items);
  }

  cargarTareas() 
  {

    let Fechaf = new Date();
    Fechaf.setDate(Fechaf.getDate() +10);
    let Fechai = new Date(Fechaf);
    Fechai.setDate(Fechai.getDate() - 30);

    let fechais=this.formatDate(Fechai);
    let fechafs=this.formatDate(Fechaf);

    this.servicioTareas.cargar(0,0,0,'-99',fechais,fechafs,0)
    .subscribe ( (res1:any) => 
    {
        //console.log(res1);
        this.TareasAll= res1['resultado'];

        console.log(this.ItemsALL);

  
    });

  //  console.log(this.Items);
  }




  irAGestion(id: number) {
    // Navegar a la URL con el parámetro de la gestión seleccionada
    this.router.navigate(['/dashboard/gestiones', id]);
  }


  // Función para formatear la fecha en "año-mes-día"
  formatDate(date: Date): string 
  {
    // Obtener el año, mes y día de la fecha
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Agregar cero inicial y obtener los dos últimos caracteres
    const day = ('0' + date.getDate()).slice(-2); // Agregar cero inicial y obtener los dos últimos caracteres

    // Formatear la fecha en el formato "año-mes-día"
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  isFechaVencida(fechaVencimiento: Date): boolean {
    const fechaHoy = new Date(); // Obtener la fecha actual

// console.log ( fechaVencimiento < fechaHoy);
// console.log (fechaVencimiento );
//   console.log (fechaHoy );

    return fechaVencimiento < fechaHoy; // Comparar la fecha de vencimiento con la fecha actual
  }


//   getRowClass(vence: Date): string {
//     const hoy = new Date();
//     const fechaVence = new Date(vence);
//     const diferenciaDias = Math.floor((fechaVence.getTime() - hoy.getTime()) / (1000 * 3600 * 24));
    
//   //  console.log("diferenciaDias");
// //console.log(diferenciaDias);

//     if (diferenciaDias > 0 ) {
//       return 'semaforo-verde'; 
//     } else if (diferenciaDias <= -1 && diferenciaDias >= -7) {
//       return 'semaforo-amarillo';
//     } else {
//       return 'semaforo-rojo';
//     }
//   }

getRowClass(fecha: Date | null): string {
  if (!fecha) return ''; // Sin clase si no hay fecha

  const hoy = new Date();
  const fechaComparar = new Date(fecha);

  return fechaComparar < hoy ? 'bg-danger text-white' : ''; // Aplica estilos si está vencido
}


}
