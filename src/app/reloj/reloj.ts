import {Component, OnInit, OnDestroy, signal} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-reloj',
  styleUrl: './reloj.css',
  templateUrl: './reloj.html',
})
export class Reloj implements OnInit, OnDestroy {

  horaActual = signal('');
  formato = false;
  paises = new Map<string, string>([
    ["Europe/Madrid", "España"],
    ["Australia/Sydney", "Australia"],
    ["America/Mexico_City", "México"]
  ]);

  pais: string = "Europe/Madrid";
  intervalo: any;

  ngOnInit() {
    this.actualizarHora1();

    this.intervalo = setInterval(() => {
      this.actualizarHora1();
    }, 1000);
  }

  actualizarHora1() {
    let fecha = new Date();

    this.horaActual.set(fecha.toLocaleTimeString("es-ES", {
      timeZone: this.pais,
      hour12: this.formato
    }));
  }

  ngOnDestroy() {
    clearInterval(this.intervalo);
  }

  cambiarFormato() {
    this.formato = !this.formato;
    this.actualizarHora1();
  }

  cambiarPais(event: Event) {
    let select = event.target as HTMLSelectElement;
    this.pais = select.value;
    this.actualizarHora1();
  }
}
