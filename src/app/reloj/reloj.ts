import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-reloj',
  styleUrl: './reloj.css',
  templateUrl: './reloj.html',
})
export class Reloj implements OnInit, OnDestroy {
  horaActual = signal('');
  segundaHora = signal('');
  mostrarSegunda = false;
  formato = false;
  paises = new Map<string, string>([
    ['Europe/Madrid', 'España'],
    ['Australia/Sydney', 'Australia'],
    ['America/Mexico_City', 'México']
  ]);
  pais = 'Europe/Madrid';
  intervalo: any;

  ngOnInit() {
    this.actualizarHora1();
    this.intervalo = setInterval(() => {
      this.actualizarHora1();
    }, 1000);
  }

  actualizarHora1() {
    let fecha = new Date();
    let fechaTexto = fecha.toLocaleDateString('es-ES', {
      day: '2-digit', month: '2-digit', year: 'numeric'
    }).replaceAll('/', '-');

    let hora = fecha.toLocaleTimeString('en-US', {
      hour12: this.formato,
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
    this.horaActual.set(fechaTexto + ' ' + hora);

    let fechaPais = fecha.toLocaleDateString('es-ES', {
      timeZone: this.pais, day: '2-digit', month: '2-digit', year: 'numeric'
    }).replaceAll('/', '-');

    let horaPais = fecha.toLocaleTimeString('en-US', {
      timeZone: this.pais, hour12: this.formato,
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
    this.segundaHora.set(fechaPais + ' ' + horaPais);
  }

  cambiarFormato() {
    this.formato = !this.formato;
    this.actualizarHora1();
  }

  cambiarMostrar(event: Event) {
    this.mostrarSegunda = (event.target as HTMLInputElement).checked;
    this.actualizarHora1();
  }

  cambiarPais(event: Event) {
    this.pais = (event.target as HTMLSelectElement).value;
    this.actualizarHora1();
  }

  ngOnDestroy() {
    clearInterval(this.intervalo);
  }
}
