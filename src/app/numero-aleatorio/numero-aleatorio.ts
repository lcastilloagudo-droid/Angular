import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-numero-aleatorio',
  styleUrl: './numero-aleatorio.css',
  templateUrl: './numero-aleatorio.html',
})
export class NumeroAleatorio {
  min: number = 1;
  max: number = 100;
  cantidad: number = 5;
  noRepetidos = false;
  numeros = signal<number[]>([]);
  error = signal('');

  cambiarMin(event: Event) {
    this.min = Number((event.target as HTMLInputElement).value);
  }

  cambiarMax(event: Event) {
    this.max = Number((event.target as HTMLInputElement).value);
  }

  cambiarCantidad(event: Event) {
    this.cantidad = Number((event.target as HTMLInputElement).value);
  }

  cambiarRepetidos(event: Event) {
    this.noRepetidos = (event.target as HTMLInputElement).checked;
  }

  generarNumeros() {
    this.numeros.set([]);
    this.error.set('');

    if (!Number.isInteger(this.min) || !Number.isInteger(this.max) || !Number.isInteger(this.cantidad)) {
      this.error.set('Introduce solamente números enteros.');
      return;
    }

    if (this.min > this.max || this.cantidad < 1) {
      this.error.set('El mínimo no puede superar el máximo y la cantidad debe ser mayor que 0.');
      return;
    }

    if (this.noRepetidos && this.cantidad > this.max - this.min + 1) {
      this.error.set('No hay suficientes números diferentes en ese rango.');
      return;
    }

    let lista: number[] = [];

    while (lista.length < this.cantidad) {
      let numero = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;

      if (!this.noRepetidos || !lista.includes(numero)) {
        lista.push(numero);
      }
    }

    this.numeros.set(lista);
    console.log('Números generados:', lista);
  }
}
