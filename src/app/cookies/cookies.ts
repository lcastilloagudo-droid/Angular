import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { aplicarTema, borrarCookie, guardarCookie, leerCookie } from '../tema';

@Component({
  imports: [RouterLink],
  selector: 'app-cookies',
  templateUrl: './cookies.html',
  styleUrl: './cookies.css',
})
export class Cookies implements OnInit {
  nombre = signal('');
  visitas = signal(0);
  ultimaVisita = signal('Nunca');
  tema = signal('');

  ngOnInit() {
    this.nombre.set(leerCookie('nombre'));
    if (!this.nombre()) {
      let nombre = prompt('Introduce tu nombre:');
      if (nombre && nombre.trim() !== '') {
        this.nombre.set(nombre.trim());
        guardarCookie('nombre', this.nombre());
      }
    }

    this.visitas.set(Number(leerCookie('visitas')) + 1);
    this.ultimaVisita.set(leerCookie('ultimaVisita') || 'Nunca');
    this.tema.set(leerCookie('tema'));
    guardarCookie('visitas', String(this.visitas()));
    guardarCookie('ultimaVisita', new Date().toLocaleString('es-ES'));
    aplicarTema();
  }

  cambiarTema(event: Event) {
    let tema = (event.target as HTMLSelectElement).value;
    this.tema.set(tema);
    if (tema) {
      guardarCookie('tema', tema);
    } else {
      borrarCookie('tema');
    }
    aplicarTema();
  }

  borrarDatos() {
    for (let clave of ['nombre', 'visitas', 'ultimaVisita', 'tema']) {
      borrarCookie(clave);
    }
    this.nombre.set('');
    this.visitas.set(0);
    this.ultimaVisita.set('Nunca');
    this.tema.set('');
    aplicarTema();
  }
}
