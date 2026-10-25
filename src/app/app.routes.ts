import { Routes } from '@angular/router';
import { Reloj } from './reloj/reloj';
import { Botones } from './botones/botones';
import { NumeroAleatorio } from './numero-aleatorio/numero-aleatorio';
import { Historial } from './historial/historial';
import { VentanaHija } from './ventana-hija/ventana-hija';
import { Cookies } from './cookies/cookies';
import { Almacenamiento } from './almacenamiento/almacenamiento';

export const routes: Routes = [
  { path: '', redirectTo: '/menu', pathMatch: 'full' },
  { path: 'menu', component: Botones },
  { path: 'reloj', component: Reloj },
  { path: 'numero-aleatorio', component: NumeroAleatorio },
  { path: 'historial', component: Historial },
  { path: 'ventana-hija', component: VentanaHija },
  { path: 'cookies', component: Cookies },
  { path: 'almacenamiento', component: Almacenamiento }
];
