import { Component, DestroyRef, OnInit, signal } from '@angular/core';

import { PlacesComponentComponent } from '../places-component/places-component.component';
import { LoadedPlacesComponent } from '../loaded-places/loaded-places.component';

import { PlacesService } from '../../../services/places.service';
import { type Place } from '../../../Types/place.model';
@Component({
  selector: 'app-userplaces',
  standalone: true,
  imports: [PlacesComponentComponent, LoadedPlacesComponent],
  templateUrl: './userplaces.component.html',
  styleUrl: './userplaces.component.css',
})
export class UserplacesComponent implements OnInit {
  constructor(
    private placesService: PlacesService,
    private destroyRef: DestroyRef
  ) {}

  places = signal<Place[] | undefined>(undefined);
  isFetching = signal(true);
  error = signal('');

  onSelectedUserPlace(place: Place) {
    //here i will use the delete service
    this.placesService.removeUserPlace(place.id).subscribe({
      error: (error) => {
        console.log('error');
      },
      complete: () => {
        console.log('user deleted sucessfully');
      },
    });
  }

  ngOnInit(): void {
    this.placesService.loadUserPlaces(
      'http://localhost:3000/user-places',
      'Failed to load user selected places'
    );
    const subscription = this.placesService.observer$.subscribe({
      next: (val) => {
        this.places.set(val);
      },
      error: (error) => {
        this.error.set(error);
      },
    });
    this.destroyRef.onDestroy(() => {});
  }
}
