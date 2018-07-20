import { Component } from '@angular/core';
import { registerElement } from 'nativescript-angular/element-registry';
// Register Custom Elements for Angular
import { Carousel, CarouselItem } from 'nativescript-carousel';

registerElement('Carousel', () => Carousel);
registerElement('CarouselItem', () => CarouselItem);

@Component({
  selector: 'ns-app',
  templateUrl: 'app.component.html'
})
export class AppComponent {}
