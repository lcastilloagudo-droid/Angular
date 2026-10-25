import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-historial',
  templateUrl: './historial.html',
  styleUrl: './historial.css',
})
export class Historial implements OnInit, OnDestroy {
  colores = ['white', 'red', 'green', 'blue', 'yellow', 'orange'];
  color = signal('white');
  total = signal(0);
  posicion = signal(0);
  pasos = 1;
  error = signal('');

  // Guardamos el historial de colores dentro de history.state.
  ngOnInit() {
    let datos = history.state;

    if (datos && datos.ejercicio === 3) {
      this.cargarEstado(datos);
    } else {
      history.replaceState({ ejercicio: 3, color: 'white', posicion: 0, total: 0 }, '');
    }

    window.addEventListener('popstate', this.alCambiarHistorial);
  }

  alCambiarHistorial = (event: PopStateEvent) => {
    if (event.state && event.state.ejercicio === 3) {
      this.cargarEstado(event.state);
    }
  };

  cargarEstado(datos: any) {
    this.color.set(datos.color);
    this.posicion.set(datos.posicion);
    this.total.set(datos.total);
    this.error.set('');
  }

  cambiarColor(event: Event) {
    let nuevo = (event.target as HTMLSelectElement).value;
    if (nuevo === this.color()) {
      return;
    }

    let posicion = this.posicion() + 1;
    this.posicion.set(posicion);
    this.total.set(posicion);
    this.color.set(nuevo);
    this.error.set('');

    history.pushState({ ejercicio: 3, color: nuevo, posicion: posicion, total: posicion }, '');
    console.log('Color:', nuevo, 'Cambio:', posicion);
  }

  atras() {
    if (this.posicion() > 0) {
      history.back();
    } else {
      this.error.set('No puedes retroceder más.');
    }
  }

  adelante() {
    // go(1) no hace nada si no existe una entrada posterior.
    history.forward();
  }

  cambiarPasos(event: Event) {
    this.pasos = Number((event.target as HTMLInputElement).value);
  }

  retroceder() {
    if (!Number.isInteger(this.pasos) || this.pasos < 1 || this.pasos > this.posicion()) {
      this.error.set('No es posible retroceder esa cantidad de cambios.');
    } else {
      this.error.set('');
      history.go(-this.pasos);
    }
  }

  ngOnDestroy() {
    window.removeEventListener('popstate', this.alCambiarHistorial);
  }
}
