import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {
    const promesa = this.contarTres();

    // promesa.then(
    //   () => console.log('Termino!'),
    //   () => console.error('Error')
    // );

    promesa
    .then(
      mensaje => console.log('Termino!', mensaje)
    )
    .catch(
      error => console.error('Error en la promesa', error)
    );
  }

  ngOnInit() {
  }

  contarTres(): Promise<boolean> {
    const promesa: Promise<boolean> = new Promise( (resolve, reject) => {
      let contador = 0;
      const intervalo = setInterval( () => {
        contador += 1;
        console.log(contador);
        if ( contador === 3 ) {
          // aqui podemos llamar a la funcion resolve o reject segun queramos
          // resolve(true);
          reject('simplemente un error intencionado');
          // limpiamos el intervalo para que no continue indefinidamente
          clearInterval(intervalo);
        }
      }, 1000 );
    } );
    return promesa;
  }

}
