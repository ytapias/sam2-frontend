import { Component } from '@angular/core';

import { ClipboardModule, ClipboardService } from 'ngx-clipboard';
import {  HostListener } from '@angular/core';


@Component({
  selector: 'app-gacetas',
  templateUrl: './gacetas.component.html',
  styleUrls: []
})
export class GacetasComponent {


  // export class TuComponenteComponent {
    textoACopiar: string = 'Texto que quieres copiar al portapapeles';
  
    constructor(private clipboardService: ClipboardService) { }
  
    copiarAlPortapapeles() {
      this.clipboardService.copyFromContent(this.textoACopiar);
      console.log(this.textoACopiar);
      alert('Texto copiado al portapapeles: ' + this.textoACopiar);
    }


    textoPegado: string="";

    @HostListener('paste', ['$event'])
    handlePaste(event: ClipboardEvent) {
      const clipboardData = event.clipboardData || (window as any).clipboardData;
      this.textoPegado = clipboardData.getData('text');
      // Puedes agregar lógica adicional después de obtener los datos del portapapeles
      console.log('Texto pegado desde el portapapeles: ' + this.textoPegado);
      alert('Texto copiado del  portapapeles: ' +  this.textoPegado);
    }

}
