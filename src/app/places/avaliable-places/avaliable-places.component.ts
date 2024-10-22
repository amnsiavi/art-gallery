import { Component, signal, OnInit, DestroyRef } from '@angular/core';

import { PlacesComponentComponent } from '../places-component/places-component.component';
import { LoadedPlacesComponent } from '../loaded-places/loaded-places.component';

import { PlacesService } from '../../../services/places.service';

import { type Place } from '../../../Types/place.model';

@Component({
  selector: 'app-avaliable-places',
  standalone: true,
  imports: [PlacesComponentComponent, LoadedPlacesComponent],
  templateUrl: './avaliable-places.component.html',
  styleUrl: './avaliable-places.component.css',
})
export class AvaliablePlacesComponent implements OnInit {
  constructor(
    private placeService: PlacesService,
    private destroyRef: DestroyRef
  ) {}

  isFetching = signal(true);
  error = signal('');

  places = signal<Place[] | undefined>(undefined);

  userSelectedPlace(place: Place) {
    this.placeService.addUserSelectedPlace(place.id).subscribe({
      error: () => {
        console.log('Add User Error', this.error);
      },
      complete: () => {
        console.log('Add User Complete Sucessfully');
      },
    });
  }

  ngOnInit(): void {
    const subscription = this.placeService
      .loadPlaces(
        'http://localhost:3000/places',
        'Failed to load avaliable places'
      )
      .subscribe({
        next: (val) => {
          console.log('Value of api', val);
          this.places.set(val);
        },
        error: (error) => {
          console.log('Error', error);
          this.error.set(error);
        },
        complete: () => {
          this.isFetching.set(false);
        },
      });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
