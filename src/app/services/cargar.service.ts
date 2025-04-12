import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

const base_url = environment.base_url;

interface DataItem {
  paisrad: string;
  dominio: string;
  anno: string;
  expedi: string;
  fechapb: string;
  estado: string;
  ts: string;
  natural: string;
  denomi: string;
  civersion: string;
  clase: string;
  apoderado: string;
  dirapo: string;
  emailapode: string;
  paisapod: string;
  solicitant: string;
  direcsol: string;
  emailsol: string;
  nomciu: string;
  depto: string;
  pais: string;
  codpais: string;
  contacto: string;
  dircont: string;
  emailcont: string;
  ciudcont: string;
  paiscont: string;
  tipomarc: string;
  tipoproc: string;
  gaceta: number;
  expedinu: string;
  plazopo: string;
  clases: string;
  fechapub: string;
  tiposol: string;
  expedio: string;
  numpub: string;
  prioridad: string;
  fechapri: string;
  regint: string;
  fregint: string;
  codciud: string;
  direccion: string;
  clasesig: string;
  nro_publicacion: string;
}

@Injectable({
  providedIn: 'root'
})
export class CargarService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  nuevoArreglo: any[] = [];

  excelDateToJSDate(excelDate: any): string {
    if (!excelDate || isNaN(+excelDate)) return '';
    const date = new Date((+excelDate - 25569) * 86400 * 1000);
    return date.toISOString().split('T')[0];
  }

  cargar(Tipo: string = '', Data: string) {
    console.log('creando');
    const parsedData = JSON.parse(Data);
    const sheetName = Object.keys(parsedData).find(name => name.trim().toLowerCase() === 'colombia general');

    if (!sheetName) {
      setTimeout(() => {
        Swal.fire('Error', 'No se encontró la hoja llamada "COLOMBIA GENERAL".', 'error');
      }, 0);
      return of(null);
    }

    const data = parsedData[sheetName];
    if (!Array.isArray(data)) {
      setTimeout(() => {
        Swal.fire('Error', 'El formato de los datos no es correcto.', 'error');
      }, 0);
      return of(null);
    }

    return new Observable(observer => {
      Swal.fire({
        title: 'Fecha de publicación',
        text: 'Por favor selecciona la fecha de publicación de la gaceta',
        input: 'text',
        inputLabel: 'Fecha de publicación',
        inputAttributes: {
          placeholder: 'YYYY-MM-DD'
        },
        inputValidator: (value) => {
          if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
            return 'Ingresa una fecha válida en formato YYYY-MM-DD';
          }
          return null;
        },
        showCancelButton: true
      }).then(result => {
        if (!result.isConfirmed || !result.value) {
          Swal.fire('Cancelado', 'No se seleccionó fecha de publicación.', 'info');
          observer.complete();
          return;
        }

        const fechaPublicacion = result.value;

        this.nuevoArreglo = data.map((item: any) => ({
          nro_publicacion: item.nro_publicacion || '',
          paisrad: item.paisradicacion || '',
          dominio: item.dominio || '',
          anno: item['año'] || '',
          expedi: item.expediente || '',
          fechapb: this.excelDateToJSDate(item.fechasolicitud),
          estado: item.estado || '',
          ts: item.ts || '',
          natural: item.natural || '',
          denomi: this.safeText(item.denomi, 200),
          civersion: item.civersion || '',
          clase: item.clase || '',
          apoderado: item.apoderado || '',
          dirapo: item.dirapo || '',
          emailapode: item.emailapode || '',
          paisapod: item.paisapod || '',
          solicitant: item.solicitante || '',
          direcsol: item.direcsol || '',
          emailsol: item.emailsol || '',
          nomciu: item.nomciu || '',
          depto: item.depto || '',
          pais: item.pais || '',
          codpais: item.codpais || '',
          contacto: item.contacto || '',
          dircont: item.dircont || '',
          emailcont: item.emailcont || '',
          ciudcont: item.ciudcont || '',
          paiscont: item.paiscont || '',
          tipomarc: item.tipo || '',
          tipoproc: item.tipoproceso || '',
          gaceta: +item.gaceta || 0,
          expedinu: item.expedinu || '',
          plazopo: this.excelDateToJSDate(item.fechalimite),
          clases: item.clases || '',
          fechapub: fechaPublicacion,
          tiposol: item.tiposol || '',
          expedio: item.expedio || '',
          numpub: item.numpub || '',
          prioridad: item.prioridad || '',
          fechapri: item.fechapri || '',
          regint: item.regint || '',
          fregint: item.fregint || '',
          codciud: item.codciud || '',
          direccion: item.direccion || '',
          clasesig: item.clasesig || '',
        }));

        console.log(this.nuevoArreglo);

        this.http.post(`${base_url}/cargarSQL`, this.nuevoArreglo, this.headers).pipe(
          catchError(err => {
            console.error('Error al hacer el POST:', err);
            Swal.fire('Error', 'Ocurrió un error al guardar los datos.', 'error');
            observer.error(err);
            return of(null);
          })
        ).subscribe(response => {
          observer.next(response);
          observer.complete();
        });
      });
    });
  }
  safeText(value: any, maxLength: number): string {
    if (!value) return '';
    const str = String(value);
    return str.length > maxLength ? str.substring(0, maxLength) : str;
  }
}