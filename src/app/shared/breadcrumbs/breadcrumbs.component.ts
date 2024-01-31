import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription, filter,map } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',

})
export class BreadcrumbsComponent  implements OnDestroy{
  public titulo!: string;
  public tituloSubs$: Subscription;



  constructor ( private router : Router){
     this.tituloSubs$ = this.getArgumentosRuta()
                            .subscribe( ({titulo}) =>{
                              this.titulo= titulo;
                              document.title = `Sam - ${titulo}`;  //titulo de la pagina
                            });
  }
  ngOnDestroy(): void {
      this.tituloSubs$.unsubscribe();
    }

  getArgumentosRuta()
  {
    //tengo que suscribirme a este observable
    return this.router.events
    .pipe( 
      filter( (event): event is ActivationEnd => event instanceof ActivationEnd ),
      filter( (event: ActivationEnd)=> event.snapshot.firstChild === null ),
      map( (event: ActivationEnd)=> event.snapshot.data ),
    );
/*
  forma normal
    .subscribe( data =>{
      console.log(data);
    })
*/ 


  }

}
