import { Component, OnDestroy } from '@angular/core';
import { Observable, retry,interval, take ,map,filter, Subscriber, Subscription} from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: []
})
export class RxjsComponent  implements OnDestroy{
  
public intervalSubs : Subscription;


  constructor(){
/*
    this.retornaObservable().pipe(
        retry(1) //reintete si hay error en este caso 1 vez mas
      ).subscribe(
        {
          next: valor => console.log('Subs:',valor),
          error: error => console.warn('Error:',error),
          complete: ()=> console.info ('Obs terminado')
        }
      );
*/

    //forma tradicional
    //this.retornaIntervalo().subscribe( (valor)=>console.log( valor ) );
    
    //forma mejorada
   this.intervalSubs=  this.retornaIntervalo().subscribe( console.log );

  }
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  retornaIntervalo(): Observable<number>
  {
    //operador take dice cuantas veces voy a emitir este interval
    return interval(1000)
    .pipe(  
      map(valor => valor + 1),
      filter(valor=> (valor%2===0)?true:false), 
      take(4),
    );  // un segundo  // por el filter solo deja pasar los pares

   
  }

  //funcion que retorna observable
  retornaObservable() : Observable<number>
  {
    let i = -1;
    return new Observable <number>(observer => {
      const intervalo=setInterval ( ()=>{
           i++;   
           observer.next(i);  
           if (i===4) 
           {
            //termina el intervalo
            clearInterval(intervalo); 
            //notificar que termino
            observer.complete();
           }      
           if (i===2) 
           {
            //disparar el  error
            observer.error('error llego i a 2');
           }      
        },1000);

    });
     
  }


}
