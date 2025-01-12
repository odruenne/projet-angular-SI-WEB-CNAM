import { Component } from '@angular/core';
import { KibblesService } from '../services/kibbles.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-engine',
  standalone: true,
  templateUrl: './search-engine.component.html',
  styleUrls: ['./search-engine.component.css'],
  imports: [FormsModule]
})
export class SearchEngineComponent {

  taste: string = "";
  maxPricePerKilo: number = Infinity;

  constructor(private kibblesService: KibblesService) {
  }

  onFilterChange() {
    this.kibblesService.getKibbles(this.taste, this.maxPricePerKilo);
  }
}