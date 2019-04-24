import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Carousel, IndicatorAnimation } from 'nativescript-carousel';
import { isAndroid } from 'tns-core-modules/platform';

@Component({
  selector: 'ns-items',
  moduleId: module.id,
  templateUrl: './items.component.html'
})
export class ItemsComponent implements OnInit, AfterViewInit {
  //@ViewChild('carousel') carouselRef: ElementRef;

  constructor() {}

  ngOnInit(): void { }

  ngAfterViewInit() {
    //const carousel = this.carouselRef.nativeElement as Carousel;

    /* if (isAndroid) {
      setTimeout(() => {
        carousel.indicatorAnimation = IndicatorAnimation.WORM;
        alert({
          message: 'The indicator animation has changed from SWAP to WORM. View the items.component.ts to see how.',
          okButtonText: 'Okay'
        });
      }, 5000);
    } */
  }
}
