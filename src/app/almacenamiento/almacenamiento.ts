import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { aplicarTema } from '../tema';

@Component({
  imports: [RouterLink],
  selector: 'app-almacenamiento',
  templateUrl: './almacenamiento.html',
  styleUrl: './almacenamiento.css',
})
export class Almacenamiento implements OnInit {
  nombre = signal('');
  visitas = signal(0);
  ultimaVisita = signal('Nunca');
  tema = signal('');

  ngOnInit() {
    this.nombre.set(localStorage.getItem('nombre') || '');
    if (!this.nombre()) {
      let nombre = prompt('Introduce tu nombre:');
      if (nombre && nombre.trim() !== '') {
        this.nombre.set(nombre.trim());
        localStorage.setItem('nombre', this.nombre());
      }
    }

    this.visitas.set(Number(localStorage.getItem('visitas')) + 1);
    this.ultimaVisita.set(localStorage.getItem('ultimaVisita') || 'Nunca');
    this.tema.set(localStorage.getItem('tema') || '');
    localStorage.setItem('visitas', String(this.visitas()));
    localStorage.setItem('ultimaVisita', new Date().toLocaleString('es-ES'));
    aplicarTema();
  }

  cambiarTema(event: Event) {
    let tema = (event.target as HTMLSelectElement).value;
    this.tema.set(tema);
    if (tema) {
      localStorage.setItem('tema', tema);
    } else {
      localStorage.removeItem('tema');
    }
    aplicarTema();
  }

  borrarDatos() {
    for (let clave of ['nombre', 'visitas', 'ultimaVisita', 'tema']) {
      localStorage.removeItem(clave);
    }
    this.nombre.set('');
    this.visitas.set(0);
    this.ultimaVisita.set('Nunca');
    this.tema.set('');
    aplicarTema();
  }
}
