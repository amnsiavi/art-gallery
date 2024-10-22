import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-places-component',
  standalone: true,
  imports: [],
  templateUrl: './places-component.component.html',
  styleUrl: './places-component.component.css',
})
export class PlacesComponentComponent {
  @Input({ required: true }) title!: string;
}
