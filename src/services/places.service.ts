import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { type Place } from '../Types/place.model';
import { map, throwError, catchError, tap } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  constructor(private httpClient: HttpClient) {}

  userPlaces: Place[] | undefined = undefined;

  private fetchPlaces(url: string, errorMessage: string) {
    return this.httpClient.get<{ places: Place[] }>(url).pipe(
      map((val) => val.places),
      catchError((error) => throwError(() => new Error(errorMessage)))
    );
  }
  observer$ = new BehaviorSubject<Place[] | undefined>(undefined);

  loadPlaces(url: string, errorMessage: string) {
    return this.fetchPlaces(url, errorMessage);
  }

  loadUserPlaces(url: string, errorMessage: string) {
    this.fetchPlaces(url, errorMessage).subscribe({
      next: (val) => {
        this.userPlaces = val;
        console.log('Inside the service', val);
        this.observer$.next(this.userPlaces);
      },
      error: (error) => console.error(error),
    });
  }

  addUserSelectedPlace(placeId: string) {
    return this.httpClient
      .put('http://localhost:3000/user-places', {
        placeId: placeId,
      })
      .pipe(
        tap(() => {
          this.loadUserPlaces(
            'http://localhost:3000/user-places',
            'Failed to Load User Places'
          );
        })
      );
  }
  removeUserPlace(placeId: string) {
    return this.httpClient
      .delete(`http://localhost:3000/user-places/${placeId}`)
      .pipe(
        tap(() => {
          this.loadUserPlaces(
            'http://localhost:3000/user-places',
            'Failed to load user places'
          );
        })
      );
  }
}
