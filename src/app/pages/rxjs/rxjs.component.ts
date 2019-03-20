import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {

  constructor() {

    // Para ver todos los operadores que pueden utilizarse de rxjs
    // siga este enlace:
    // http://reactivex.io/documentation/operators.html

    // EJEMPLO 1
    // const obs = this.regresaObservableNumber();
    // obs.subscribe(
    //   numero => console.log( 'Subs', numero ),
    //   error => console.error('Error en el obs', error),
    //   () => console.log('El observador termino!')
    // );

    // EJEMPLO 2 OPERADOR RETRY
    // const obsRetry = this.regresaObservableNumber();
    // obsRetry
    // .pipe(
    //   // retry()
    //   retry(4)
    // )
    // .subscribe(
    //   numero => console.log( 'Subs', numero ),
    //   error => console.error('Error en el obs', error),
    //   () => console.log('El observador termino!')
    // );

    // EJEMPLO 3 OPERADOR MAP Y FILTER
    const obsMap = this.regresaObservableAny();
    obsMap
    .pipe(
      map(
        resp => resp.valor
        // resp => {
        //   const convertirEnloquequeramos = resp.valor * 2;
        //   return convertirEnloquequeramos;
        // }
      ),
      map(
        // dentro de pipe podemos repetir y poner tantos operadores como deseemos
        // que se ejecutaran en secuencia uno detras de otro
        resp => resp * 3
      ),
      filter(
        // () => {
        //   return true;
        // }
        (valor, index) => {
          // console.log('Filter', valor, index);
          // la función filter siempre debe devolver un valor booleano true o false
          // suponiendo de que solo nos interesaran los valores impares podriamos hacer
          const impar = valor % 2 === 1;
          return impar;
        }
      )
    )
    .subscribe(
      numero => console.log( 'Subs', numero ),
      error => console.error('Error en el obs', error),
      () => console.log('El observador termino!')
    );

  }

  ngOnInit() {
  }

  // regresaObservableNumber(): Observable<number | string> {
  regresaObservableNumber(): Observable<number> {
    const obs: Observable<number> = new Observable( observer => {
      let contador = 0;
      const intervalo = setInterval( () => {
        contador += 1;
        observer.next( contador );
        if ( contador === 3 ) {
          clearInterval(intervalo);
          observer.complete();
        }

        if ( contador === 2 ) {
          clearInterval(intervalo);
          observer.error('intencionadamente provocamos un error al llegar a 2');
        }
      }, 1000 );
    });
    return obs;
  }

  regresaObservableAny(): Observable<any> {
    const obs: Observable<any> = new Observable( (observer: Subscriber<any>) => {
      let contador = 0;

      // vamos a imaginarnos que este setInterval es una llamada a una api o algun servicio
      // que nosotros no hicimos y no tenemos el control de el; nosotros simplemente
      // consumimos el resultado de ese servicio; pero resulta que el dia de mañana la gente
      // que creo este servicio dice no, no podemos regresar el contador directamente tenemos
      // que retornar un objeto; si realizan ese cambio es muy probable bueno dependiendo de
      // como este nuestra aplicación; que nuestra aplicación ya no funcione porque estaba
      // esperando un valor numerico y ahora recibe un objeto, para evitar eso podemos
      // procesar la informacion antes de usarla pasandola por el operador map para expresarla
      // de la manera que nos interese
      const intervalo = setInterval( () => {
        contador++;
        const salida = {
          valor: contador
        }
        observer.next( salida );
        if ( contador === 3 ) {
          clearInterval(intervalo);
          observer.complete();
        }
      }, 1000 );
    });

    return obs;
  }

}
