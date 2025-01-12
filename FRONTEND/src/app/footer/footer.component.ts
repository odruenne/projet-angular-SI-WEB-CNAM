import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  projects: any[] = [
    {name: 'Mon site web', link:'https://oceanedruenne.github.io/'},
    {name: 'Étude sur la fibromyalgie', link:'https://oceanedruenne.github.io/etudeFibromyalgie/'},
    {name: 'Maquette pour une orthophoniste à Obernai ', link:'https://oceanedruenne.github.io/orthophonisteobernai/'},
    {name: 'Site pour une coach en communication', link:'https://oceanedruenne.github.io/coachstrasbourg/'},
    {name: 'TP réalisé avec HTML/CSS', link:'https://oceanedruenne.github.io/tp_numero_deux_serfa_od/'}
  ]
}
