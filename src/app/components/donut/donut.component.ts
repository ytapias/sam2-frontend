import { Component,Input, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';



@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styleUrls: []
})
export class DonutComponent  implements OnInit {
 
  @Input() title: string = 'Sin titulo';
  @Input('labels') doughnutChartLabels: string[] = [];
  @Input('data') dataDonut: number[] = [];
  @Input('backgroundColor') backgroundColorDonut: string[] = [];
  charOptions = {
    resposive: true,
    maintainAspectRatio: false
  }; // TODO: evaluar si es candidato a ser @Input()
 
  constructor() {
    // Valores por defecto en caso no se setee nada desde otros componentes
    this.dataDonut = [350, 450, 100];
    this.doughnutChartLabels = ['Labels1', 'Labels2', 'Labels3'];
    this.backgroundColorDonut = ['#6857E6', '#009FEE', '#F02059'];
  }
  ngOnInit(): void {
    // Aca seteamos los valores que vienen como @Input() al objeto doughnutChartData
    this.doughnutChartData.datasets[0].data = this.dataDonut;
    this.doughnutChartData.datasets[0].backgroundColor = this.backgroundColorDonut;
    this.doughnutChartData.labels = this.doughnutChartLabels;
  }
 
  public doughnutChartData: ChartData<'doughnut'> = {
  labels: this.doughnutChartLabels,
  datasets: [
    {
      data: this.dataDonut,
      backgroundColor: this.backgroundColorDonut
    },
  ]
  };
  
}
