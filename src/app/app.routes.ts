import { Routes } from '@angular/router';
import {Reloj} from './reloj/reloj';
import {Botones} from './botones/botones';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/menu',
    pathMatch: 'full'
  },
  {
    path: 'reloj',
    component: Reloj,
  },
  {
    path: 'menu',
    component: Botones,
  },
];
