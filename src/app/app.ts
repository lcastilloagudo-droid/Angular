import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { aplicarTema } from './tema';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {
  ngOnInit() {
    aplicarTema();
  }
}
