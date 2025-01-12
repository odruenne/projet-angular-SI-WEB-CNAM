import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Kibbles } from '../../store/models/kibbles';
import { environment } from '../environments/environment'
import { Router } from '@angular/router';

/* KibblesService est un service dans le front qui va gérer la récupération des kibbles */
// providedIn: root pour utiliser la même instance partout
@Injectable({
  providedIn: 'root',
})
export class KibblesService implements OnDestroy {
  kibblesSubject: BehaviorSubject<Kibbles[]> = new BehaviorSubject<Kibbles[]>([]); 
  kibblesObservable : Observable<Kibbles[]> = this.kibblesSubject.asObservable();
  
  constructor(private httpClient: HttpClient, private router: Router) { }

  public getKibbles(tasteFilter: string, priceFilter: number): void {
    this.httpClient.get<Kibbles[]>(environment.backendURL + "/kibbles")
    .pipe(
      map((kibbles: Kibbles[]) => {
        return kibbles
              .filter((k: Kibbles) => k.taste.toLowerCase().includes(tasteFilter.toLowerCase()))
              .filter((k: Kibbles) => priceFilter == null || k.pricePerKilo <= priceFilter)
      })
    )
    .subscribe((res: Kibbles[]) => this.kibblesSubject.next(res));
  }

  ngOnDestroy(): void {
    this.kibblesSubject.unsubscribe();
  }
}