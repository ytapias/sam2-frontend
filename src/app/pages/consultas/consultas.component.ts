import { Component } from '@angular/core';
import { ReportesService } from 'src/app/services/reportes.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent {
  reportes: any[] = [];
  reporteSeleccionado: number | null = null;
  datosReporte: any[] = [];
  columnKeys: string[] = [];
  nombreReporteSeleccionado: string = '';
  filtrosDisponibles: string[] = [];

  // Variables de filtros
  filtroFechaDesde: string = '';
  filtroFechaHasta: string = '';
  filtroPais: string = '';
  filtroCliente: string = '';

  // Opciones para filtros dinámicos
  listaPaises: any[] = [];
  listaClientes: any[] = [];

  constructor(private reportesService: ReportesService) {}

  ngOnInit(): void {
    this.cargarReportes();
  }

  // ✅ Cargar la lista de reportes disponibles sin ejecutar búsqueda
  cargarReportes(): void {
    this.reportesService.getReportes().subscribe((res: any) => {
      if (res.ok) {
        this.reportes = res.resultado;
      }
    });
  }

  // ✅ Se ejecuta cuando cambia el reporte y solo carga los filtros, sin buscar datos
  cargarFiltrosReporte(): void {
    if (this.reporteSeleccionado) {
      const reporte = this.reportes.find(r => r.id === Number(this.reporteSeleccionado));
      this.nombreReporteSeleccionado = reporte ? reporte.nombre : 'reporte';

      // ✅ Obtener los filtros que el reporte necesita
      this.filtrosDisponibles = reporte && reporte.filtros ? reporte.filtros : [];

      // ✅ Limpiar los valores de los filtros al cambiar de reporte
      this.filtroFechaDesde = '';
      this.filtroFechaHasta = '';
      this.filtroPais = '';
      this.filtroCliente = '';
      this.datosReporte = []; // Limpia la tabla al cambiar de reporte

      // ✅ Si el reporte requiere filtros de país o cliente, los cargamos dinámicamente
      if (this.filtrosDisponibles.includes('pais')) {
        this.cargarPaises();
      }
      if (this.filtrosDisponibles.includes('cliente')) {
        this.cargarClientes();
      }
    }
  }

  // ✅ Se ejecuta cuando el usuario hace clic en el botón "Buscar"
  cargarDatosReporte(): void {
    if (this.reporteSeleccionado) {
      const reporte = this.reportes.find(r => r.id === Number(this.reporteSeleccionado));

      // ✅ Construimos el objeto de filtros
      const filtros = {
        id: reporte.id,
        fechaDesde: this.filtroFechaDesde,
        fechaHasta: this.filtroFechaHasta,
        pais: this.filtroPais,
        cliente: this.filtroCliente
      };

      // ✅ Llamamos al backend solo cuando el usuario hace clic en "Buscar"
      this.reportesService.getReporteData(this.reporteSeleccionado, filtros).subscribe((res: any) => {
        if (res.ok) {
          if (res.resultado.resultado.length > 0) {
            this.columnKeys = Object.keys(res.resultado.resultado[0]);
            this.datosReporte = res.resultado.resultado.map((item: any) => {
              let filaOrdenada: any = {};
              this.columnKeys.forEach(col => filaOrdenada[col] = item[col]);
              return filaOrdenada;
            });
          } else {
            this.columnKeys = [];
            this.datosReporte = [];
          }
        }
      });
    }
  }

  // ✅ Cargar lista de países dinámicamente
  cargarPaises(): void {
    // this.reportesService.getPaises().subscribe((res: any) => {
    //   if (res.ok) {
    //     this.listaPaises = res.resultado;
    //   }
    // });
  }

  // ✅ Cargar lista de clientes dinámicamente
  cargarClientes(): void {
    // this.reportesService.getClientes().subscribe((res: any) => {
    //   if (res.ok) {
    //     this.listaClientes = res.resultado;
    //   }
    // });
  }

  
//-----------------------------------------------
//   EXPORTAR A EXCEL
//-----------------------------------------------
// Exportar a Excel con encabezados dinámicos
exportarAExcel() {
  if (!this.datosReporte || this.datosReporte.length === 0) {
    console.warn('No hay datos para exportar.');
    return;
  }

  // Extraer los encabezados dinámicos
  const encabezados = this.columnKeys;

  // Convertimos los datos en un formato adecuado para Excel
  const datosExcel = this.datosReporte.map(item => {
    let fila: any = {};
    encabezados.forEach(key => {
      fila[key] = item[key]; // Agregar dinámicamente cada propiedad del objeto
    });
    return fila;
  });

  // Crear la hoja de Excel con los encabezados
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datosExcel, { header: encabezados });

  // Crear el libro de Excel
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Reporte');

  // Nombre del archivo basado en el reporte seleccionado
  const nombreArchivo = `${this.nombreReporteSeleccionado.replace(/\s+/g, '_')}.xlsx`;

  // Descargar el archivo Excel
  XLSX.writeFile(wb, nombreArchivo);
}



}
