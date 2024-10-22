import { Component } from '@angular/core';

import { AvaliablePlacesComponent } from '../../places/avaliable-places/avaliable-places.component';
import { UserplacesComponent } from '../../places/userplaces/userplaces.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AvaliablePlacesComponent, UserplacesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  get imagePath() {
    return 'logo.png';
  }
  get altText() {
    return 'Stylized Globe';
  }
}
