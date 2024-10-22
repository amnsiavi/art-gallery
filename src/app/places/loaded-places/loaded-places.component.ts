import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Place } from '../../../Types/place.model';
@Component({
  selector: 'app-loaded-places',
  standalone: true,
  imports: [],
  templateUrl: './loaded-places.component.html',
  styleUrl: './loaded-places.component.css',
})
export class LoadedPlacesComponent {
  @Input({ required: true }) places?: Place[];

  @Output() selectedPlace = new EventEmitter<Place>();

  get URL() {
    return 'http://localhost:3000/';
  }

  onSelectedPlace(place: Place) {
    this.selectedPlace.emit(place);
  }
}
