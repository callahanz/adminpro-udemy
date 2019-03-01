import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Input('nombre') leyenda: string = 'Leyenda';
  @Input() progreso: number = 50;

  @Output('actualizaValor') cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {
    // console.log('Leyenda', this.leyenda);
    // console.log('progreso', this.progreso);
  }

  ngOnInit() {
    // console.log('Leyenda', this.leyenda);
    // console.log('progreso', this.progreso);
  }

  onChanges( newValue: number ) {
    // console.log(newValue);

    // const elemHTML: any = document.getElementsByName('progreso')[0];
    // console.log(elemHTML.value);
    // console.log(this.txtProgress);


    if (newValue > 100) {
      this.progreso = 100;
    } else if (newValue < 0 || !newValue) {
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }

    // elemHTML.value = this.progreso;
    this.txtProgress.nativeElement.value = this.progreso;

    this.cambioValor.emit( this.progreso );

  }

  cambiarValor( valor: number ) {
    console.log( this.progreso, valor );
    console.log( (typeof this.progreso), (typeof valor) );

    if ( this.progreso >= 100 && valor > 0 ) {
      this.progreso = 100;
      return;
    }

    if ( this.progreso <= 0 && valor < 0 ) {
      this.progreso = 0;
      return;
    }

    this.progreso = this.progreso + valor;

    console.log( this.progreso );

    this.cambioValor.emit( this.progreso );

    this.txtProgress.nativeElement.focus();

  }

}
