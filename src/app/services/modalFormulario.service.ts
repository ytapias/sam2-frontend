import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalFormularioService {
 

  private _ocultarModal: boolean = true;

  constructor(){

  }

  get ocultarModal(){
    return this._ocultarModal;
  }

  abrirModal(){
    this._ocultarModal=false;

  }

  cerrarModal(){
    this._ocultarModal=true;

  }

  abrirCrear(titulo: string){
  

  }

  abrirModificar(titulo: string,DItemActual:any){
  
    
  }

   
}
