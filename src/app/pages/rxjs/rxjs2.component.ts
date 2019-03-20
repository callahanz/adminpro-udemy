import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-rxjs2',
  templateUrl: './rxjs2.component.html',
  styles: []
})
export class Rxjs2Component implements OnInit, OnDestroy {

  suscription: Subscription;

  constructor() {

    const obs = this.regresaObservableNumber();
    this.suscription = obs.subscribe(
      numero => console.log( 'Subs', numero ),
      error => console.error('Error en el obs', error),
      () => console.log('El observador termino!')
    );

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('La página se va ha cerrar');
    // el unsubscribe es decirle al observable que ya no te interesa ser notificado
    // de cualquier información que el observable reciba
    this.suscription.unsubscribe();

    // las promesas no tienen en este momento un cancelar
    // para cualquier proceso que sea suceptible de devolver valores indefinidamente
    // o que deba recibir valores por x lapso de tiempo el cual no interesa si no estamos
    // visualizando siempre es recomendable utilizar observables para no sobrecargar memoria.
    // En casos de recoger valores unicos o valores finitos controlados a veces una promesa
    // es mas simple que usar un observable; por eso fue que se crearon los RXJS, para poder
    // realizar todo lo que las promesas no hacen.
  }

  // regresaObservableNumber(): Observable<number | string> {
  regresaObservableNumber(): Observable<number> {
    const obs: Observable<number> = new Observable( observer => {
      let contador = 0;
      const intervalo = setInterval( () => {
        contador += 1;
        observer.next( contador );

        // comentamos esta parte del codigo que contiene el observer.complete
        // porque nos interesa que las respuestas del observador sean infinitas
        // incluso cuando nos movemos a otra pestaña del navegador web
        // if ( contador === 3 ) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }

        // tambien comentamos esta parte que contiene el observer.error por lo mismo
        // porque nos interesa que las respuestas del observador sean infinitas
        // if ( contador === 2 ) {
        //   clearInterval(intervalo);
        //   observer.error('intencionadamente provocamos un error al llegar a 2');
        // }

        // de esta forma podemos mostrar una forma de detener las respuestas infinitas
        // de un observador justo antes de movernos a otra pestaña del navegador web
        // usando el ciclo de vida de los componentes de angular usando el ngOnDestroy
      }, 1000 );
    });
    return obs;
  }

}
