import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-numero-aleatorio',
  styleUrl: './numero-aleatorio.css',
  templateUrl: './numero-aleatorio.html',
})
export class NumeroAleatorio {
  numero:number = 0;
  min:number = 0;
  max:number = 0;
  numeros:number[] = [];

  ngOnInit() {}

  generarNumero(numero:number) {
    this.numero = Math.floor(Math.random() * this.max) + this.min
  }

}
