import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { KibblesDTO } from '../models/KibblesDTO';

@Injectable({
  providedIn: 'root',
})
export class KibblesService implements OnDestroy {
  kibblesSubject: BehaviorSubject<KibblesDTO[]> = new BehaviorSubject<KibblesDTO[]>([]);
  kibblesObservable: Observable<KibblesDTO[]> = this.kibblesSubject.asObservable();
  
  constructor(private httpClient: HttpClient) { }

  public getKibbles(tasteFilter: string, priceFilter: number): void {
    this.httpClient.get<KibblesDTO[]>(`${environment.backendURL}/kibbles`)
      .pipe(
        map((kibbles: KibblesDTO[]) => {
          return kibbles
            .filter((kibble: KibblesDTO) => kibble.taste.toLowerCase().includes(tasteFilter.toLowerCase()))
            .filter((kibble: KibblesDTO) => priceFilter == null || kibble.price <= priceFilter);
        })
      )
      .subscribe((kibbles: KibblesDTO[]) => this.kibblesSubject.next(kibbles));
  }

  public getKibblesByID(id: number): Observable<KibblesDTO> {
    return this.httpClient.get<KibblesDTO>(`${environment.backendURL}/kibbles/${id}`);
  }

  ngOnDestroy(): void {
    this.kibblesSubject.unsubscribe();
  }
}

