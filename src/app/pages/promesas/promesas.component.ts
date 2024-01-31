import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: []
})
export class PromesasComponent implements OnInit 
{
  ngOnInit(): void {

    this.getUsuarios().then( usuarios=>{
      console.log(usuarios)
    });

  }
   getUsuarios() 
   {
    return  new Promise(resolve=>{
      fetch('https://reqres.in/api/users')
      .then(  resp => resp.json())
      .then( body =>  resolve(body.data)
        )
      }
      );
   
    }

  /*
    //crear la promesa
    const promesa = new Promise( (resolve,reject) => {
     
      if(true)
      {
        resolve("Hola Mundo"); 
      }
      else{
        reject('Algo Salio Mal');
      }
    });

    //suscribirse a la promesa
    promesa.then ( (mensaje)=>{
      console.log(mensaje);

    })
    .catch (error => console.log('Error en mi promesa', error) );

    console.log("Fin Init"); 
    */


}   
