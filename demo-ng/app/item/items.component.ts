import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Carousel, IndicatorAnimation } from 'nativescript-carousel';
import { isAndroid } from 'tns-core-modules/platform';
import { alert } from 'tns-core-modules/ui/dialogs';
import { Item } from './item';
import { ItemService } from './item.service';

@Component({
  selector: 'ns-items',
  moduleId: module.id,
  templateUrl: './items.component.html'
})
export class ItemsComponent implements OnInit, AfterViewInit {
  @ViewChild('carousel') carouselRef: ElementRef;
  items: Item[];

  // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class.
  // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.items = this.itemService.getItems();
  }

  ngAfterViewInit() {
    const carousel = this.carouselRef.nativeElement as Carousel;
    if (isAndroid) {
      setTimeout(() => {
        carousel.indicatorAnimation = IndicatorAnimation.WORM;
        alert({
          message: 'The indicator animation has changed from SWAP to WORM. View the items.component.ts to see how.',
          okButtonText: 'Okay'
        });
      }, 5000);
    }
  }
}
