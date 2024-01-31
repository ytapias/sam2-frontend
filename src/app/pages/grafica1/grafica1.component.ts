import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
 
})
export class Grafica1Component {

 
    public title1 : string="Primera Grafica ";
    public labels1: string []=["juegos PC", "Plastation", "Xbox"];

    public datasets1: number[]=  [
      350, 450, 100 
   ];
     

    public labels2: string []=["Ciudades", "vendedores", "comerciales"];

    public datasets2= [
     [50, 45, 98]
    
    ]



}
