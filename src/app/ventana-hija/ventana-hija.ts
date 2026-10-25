import { Component, OnDestroy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-ventana-hija',
  templateUrl: './ventana-hija.html',
  styleUrl: './ventana-hija.css',
})
export class VentanaHija implements OnDestroy {
  ventana: Window | null = null;
  abierta = signal(false);
  error = signal('');
  intervalo: any;

  abrirVentana() {
    if (this.ventana && !this.ventana.closed) {
      return;
    }

    this.ventana = window.open('', 'ventanaEjercicio4', 'width=400,height=400');
    if (this.ventana) {
      this.abierta.set(true);
      this.error.set('');
      this.intervalo = setInterval(() => {
        if (this.ventana && this.ventana.closed) {
          this.abierta.set(false);
          clearInterval(this.intervalo);
        }
      }, 500);
    } else {
      this.error.set('El navegador ha bloqueado la ventana emergente.');
    }
  }

  moverVentana(x: number, y: number) {
    if (this.ventana && !this.ventana.closed) {
      this.ventana.moveBy(x, y);
      this.ventana.focus();
    }
  }

  cerrarVentana() {
    if (this.ventana && !this.ventana.closed) {
      this.ventana.close();
    }
    this.abierta.set(false);
    clearInterval(this.intervalo);
  }

  ngOnDestroy() {
    clearInterval(this.intervalo);
    // Si se vuelve al menú, también cerramos la ventana hija.
    this.cerrarVentana();
  }
}
