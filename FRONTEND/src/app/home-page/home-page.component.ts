import { Component } from '@angular/core';
import { KibblesList } from '../kibbles-list/kibbles-list.component';
import { SearchEngineComponent } from '../search-engine/search-engine.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [KibblesList, SearchEngineComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
