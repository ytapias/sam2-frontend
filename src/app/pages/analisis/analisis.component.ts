import { Component } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';
import { Analisis } from 'src/app/models/analisis.model';
import { gacetas } from 'src/app/models/gacetas.model';
import { AnalisisService } from 'src/app/services/analisis.service';
import { GacetasService } from 'src/app/services/gacetas.service';
import * as XLSX from 'xlsx';


import { 
  Document, 
  Packer, 
  Paragraph, 
  TextRun, 
  Table, 
  TableCell, 
  TableRow, 
  HeadingLevel ,
  ShadingType 
} from 'docx';

@Component({
  selector: 'app-analisis',
  templateUrl: './analisis.component.html',
  styleUrls: []
})
export class AnalisisComponent {

 
  public Items: gacetas[]=[];
  public ItemsAnalisis: Analisis[]=[];
  public ItemsALL: Analisis[]=[];



  constructor(private servicio: GacetasService,
    private servicioAnalisis: AnalisisService,
    private clipboardService: ClipboardService) 
    { 
      this.cargar();

    }

    cargar() {

     
      this.servicio.cargar()
      .subscribe ( (res1:any) => 
      {
          console.log(res1);
          this.Items= res1['resultado'];
          // this.labels1= res1['resultado'];
          // this.labels1= res1['resultado'].cantidad;
  
       //   console.log(this.ItemsALL);
  
    
      });
  
    //  console.log(this.Items);
    }
    
    // Lista de países
    
    paises: any[] = [
      { nombre: 'Colombia', codigo: 'CO' },
      { nombre: 'México', codigo: 'ME' },
      { nombre: 'Argentina', codigo: 'AR' },
      { nombre: 'Chile', codigo: 'CL' }
    ];
    // País seleccionado por el usuario
  
    codigoPaisSeleccionado: string = '';

    // Lista original de Items (gacetas)
    // Items: any[] = [
    //   { gaceta: 'Gaceta 1', paisrad: 'CO', fechapub: new Date(), registros: 10 },
    //   { gaceta: 'Gaceta 2', paisrad: 'ME', fechapub: new Date(), registros: 5 },
    //   { gaceta: 'Gaceta 3', paisrad: 'AR', fechapub: new Date(), registros: 7 },
    //   { gaceta: 'Gaceta 4', paisrad: 'CL', fechapub: new Date(), registros: 12 }
    // ];
  
    // Lista filtrada por país
    get gacetasFiltradas(): any[] {
      return this.Items.filter(item => item.paisrad === this.codigoPaisSeleccionado);
    }
  
  
    analisisGaceta(item: any): void {
      // Lógica para analizar gaceta
      console.log('Análisis', item);
    }
  

    abrirDetalle(item : gacetas)
    {
        console.log(item.gaceta);
        
        this.servicioAnalisis.cargar(0,10,item.gaceta)
        .subscribe ( (res1:any) => 
        {
            console.log(res1);
            this.ItemsAnalisis= res1['resultado'];
            // this.labels1= res1['resultado'];
            // this.labels1= res1['resultado'].cantidad;
    
        console.log(this.ItemsAnalisis);
    
      
        });
    

    }


  //////////////////////////////////////////////
  /////////// exportar WORD
  /////////////////////////////////////////////

  generateWordDocument(item: Analisis): void {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              heading: HeadingLevel.HEADING_3,
              children: [
                new TextRun({
                  text: 'COLOMBIA. ',
                  size: 24,
                  bold: true,
                  font: 'Arial',
                  
                }),
                new TextRun({
                  text: `${item.duenomarca}`,
                  size: 24,
                  bold: true,
                  font: 'Arial',
                }),
              ],
            }),
            new Paragraph({
              text: '',
              heading: HeadingLevel.HEADING_1,
            }),
            new Paragraph({
              children: [
              new TextRun({
              bold: true,
              text: `Aviso informativo posible oposición contra la solicitud de registro No. [${item.expedi}] de la marca “${item.Cadena1gaceta}” (nominativa/mixta/figurativa) en clase(s) ${item.clase}`,
              }),
             ],
              heading: HeadingLevel.HEADING_3,
            }),
            new Paragraph({
              text: '',
              heading: HeadingLevel.HEADING_1,
            }),
            
  
            new Paragraph({
              text: 'AVISO INFORMATIVO',
              heading: HeadingLevel.HEADING_1,
            }),
            new Paragraph({
              text: '',
              heading: HeadingLevel.HEADING_1,
            }),
  
            new Paragraph({
              text: 'Estimado(a) Dr.(a):',
            }),
            new Paragraph({
              text: '',
              heading: HeadingLevel.HEADING_1,
            }),
  
            new Paragraph({
              text: 'Le informamos que la siguiente solicitud de registro de marca ha sido publicada en Colombia:',
            }),
            new Paragraph({
              text: '',
              heading: HeadingLevel.HEADING_1,
            }),
  
            // Aquí empieza la tabla principal
            new Table({
              
              rows: [
                 
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph('Marca solicitada')],
                    }),
                    new TableCell({
                      children: [new Paragraph(item.Cadena1gaceta)],
                    }),
                    
                   
                  ],
                }),
  
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph('Solicitante')],
                    }),
                    new TableCell({
                      children: [new Paragraph(item.solicitant)],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph('Clase Solicitada')],
                    }),
                    new TableCell({
                      children: [new Paragraph(`${item.clase}`)],
                    }),
                  ],
                }),
  
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph('Marca(s) previamente registradas')],
                    }),
                    new TableCell({
                      children: [new Paragraph( item.Cadena2marca)],//item.MarcaRegistrada || 
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph('Titular')],
                    }),
                    new TableCell({
                      children: [new Paragraph(item.duenomarca)],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph('Clase')],
                    }),
                    new TableCell({
                      children: [new Paragraph(`${item.clase}`)],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph('Probabilidades de éxito')],
                    }),
                    new TableCell({
                      children: [new Paragraph('Porcentaje')],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph('Plazo para presentar oposición')],
                    }),
                    new TableCell({
                      children: [new Paragraph(
                        (item.plazopo instanceof Date
                          ? item.plazopo
                          : new Date(item.plazopo)
                        ).toLocaleDateString()
  
                      )],//item.plazopo
                    }),
                  ],
                }),
              ],
            }),
  
            new Paragraph({
              text: '',
              heading: HeadingLevel.HEADING_1,
            }),
  
            new Paragraph({
              text: 'Teniendo en cuenta que las probabilidades de éxito son bajas, no sugerimos proceder con la oposición.',
            }),
            new Paragraph({
              text: '',
              heading: HeadingLevel.HEADING_1,
            }),
            new Paragraph({
              text: 'Quedamos atentos a sus instrucciones y pendientes de cualquier aclaración o complementación que estime necesarias.',
            }),
            new Paragraph(''),
            new Paragraph({
              text: 'Atentamente,',
            }),
            new Paragraph(''),
            new Paragraph({
              text: '',
              heading: HeadingLevel.HEADING_1,
            }),
            new Paragraph({
              text: '(Nombre de la asociada encargada)',
            }),
            new Paragraph({
              text: '',
              heading: HeadingLevel.HEADING_1,
            }),
            new Paragraph({
              text: 'Asociada – Área de Marca',
            }),
          ],
        },
      ],
    });
  
  
  // Guardar el documento como un archivo .docx
  Packer.toBlob(doc).then((blob) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated-document.docx';
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  });
}

//////////////////////////////////////////////
///////////  FILTROS 
//////////////////////////////////////////////

public filters: any = {
  Gaceta: '',
  Resultadoglobal: '',
  resultado: '',
  Cadena2marca: '',
  Cadena1gaceta: '',
  idempresa: '',
  idmarca: '',
  idgaceta: ''
};
  filteredItems(): Analisis[] {
    return this.ItemsAnalisis.filter(item => {
      return (
        (this.filters.Gaceta === '' || item.Gaceta.toString().includes(this.filters.Gaceta)) &&
        (this.filters.Resultadoglobal === '' || item.Resultadoglobal.includes(this.filters.Resultadoglobal)) &&
        (this.filters.resultado === '' || item.resultado.toString().includes(this.filters.resultado)) &&
        (this.filters.Cadena2marca === '' || item.Cadena2marca.includes(this.filters.Cadena2marca)) &&
        (this.filters.Cadena1gaceta === '' || item.Cadena1gaceta.includes(this.filters.Cadena1gaceta)) &&
        (this.filters.idempresa === '' || item.idempresa.toString().includes(this.filters.idempresa)) &&
        (this.filters.idmarca === '' || item.idmarca.toString().includes(this.filters.idmarca)) &&
        (this.filters.idgaceta === '' || item.idgaceta.toString().includes(this.filters.idgaceta))
      );
    });
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
  link.setAttribute('download', 'datos.csv');
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
  XLSX.writeFile(wb, 'datos.xlsx');
  }
  
  
  async  exportarAExcelTodo() {
  try {
  // Llamar a la función asíncrona cargar
  
  this.ItemsALL= this.ItemsAnalisis;
  // Continuar con la generación de Excel
  const datosExcel =  this.convertirAFormatoExcel( this.ItemsALL);
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datosExcel);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Datos');
  XLSX.writeFile(wb, 'datos.xlsx');
 
  
  
  } catch (error) {
  console.error('Error al exportar a Excel:', error);
  // Manejar el error según tus necesidades
  }
  
  }
  
  
  convertirAFormatoExcel(datos: any[]): any[] {
  // Asegúrate de que tus datos estén en un formato aceptable por la librería XLSX
  return datos.map(dato => ({
  id:dato.idgaceta,
  gaceta: dato.Gaceta,
  resultado: dato.Resultadoglobal,
  cadenaMarca: dato.Cadena2marca,
  cadenaGaceta: dato.Cadena1gaceta,
  clase: dato.clase,
  idmarca: dato.idmarca,
  solicitante: dato.solicitant,
  Plazo: dato.plazopo,
  Expediente: dato.expedi,
  Id: dato.id
  }));
  
  
  }
  

}
