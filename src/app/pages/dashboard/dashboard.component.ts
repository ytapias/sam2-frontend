import { Component } from '@angular/core';
import { Administracion } from 'src/app/models/administracion.model';
import { Expedientes } from 'src/app/models/expedientes';
import { AdministracionService } from 'src/app/services/administracion.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['dashboard.component.css'],
})
export class DashboardComponent {
  public Items: Administracion=new Administracion(0,"",0,"",0,0,0,0);
  public ItemsALL: Administracion[]=[new Administracion(0,"",0,"",0,0,0,0)];

  marcas :number=0;
  Expedientes:number=0;
  gestiones :number=0;
  gacetas:number=0;
 
  
  ngOnInit(): void {
    this.cargar();
    
  }

  constructor(private servicio: AdministracionService,)
  {
     
  }

  
  cargar() {

    this.Items.idempresa=0;
    this.Items.tipo="dashboardgeneral";
  
    this.servicio.dashboard(this.Items)
    .subscribe ( (res1:any) => 
    {
        //console.log(res1);
        this.ItemsALL= res1['resultado'];

     //   console.log(this.ItemsALL);

  
    });

  //  console.log(this.Items);
  }
  


}
