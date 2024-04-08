import { Component } from '@angular/core';
import { Administracion } from 'src/app/models/administracion.model';
import { Expedientes } from 'src/app/models/expedientes';
import { tareas } from 'src/app/models/tareas.model';
import { AdministracionService } from 'src/app/services/administracion.service';
import { tareasService } from 'src/app/services/tareas.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['dashboard.component.css'],
})
export class DashboardComponent {
  public Items: Administracion=new Administracion(0,"",0,"",0,0,0,0);
  public ItemsALL: Administracion[]=[new Administracion(0,"",0,"",0,0,0,0)];
  public TareasAll: tareas[]=[];

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
              private servicioTareas: tareasService,)
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

    
  
    this.servicioTareas.cargar(0,0,0,0,1)
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

    let Fechai = new Date();
    let Fechaf = new Date(Fechai);
    Fechaf.setDate(Fechai.getDate() + 30);

    let fechais=this.formatDate(Fechai);
    let fechafs=this.formatDate(Fechaf);

    this.servicioTareas.cargar(0,0,0,0,99,fechais,fechafs)
    .subscribe ( (res1:any) => 
    {
        //console.log(res1);
        this.TareasAll= res1['resultado'];

        console.log(this.ItemsALL);

  
    });

  //  console.log(this.Items);
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

console.log ( fechaVencimiento < fechaHoy);
console.log (fechaVencimiento );
  console.log (fechaHoy );

    return fechaVencimiento < fechaHoy; // Comparar la fecha de vencimiento con la fecha actual
  }


}
