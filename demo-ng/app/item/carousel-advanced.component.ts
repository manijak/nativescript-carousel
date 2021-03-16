import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Carousel } from 'nativescript-carousel';
import { ItemService } from './item.service';
import { SlideItem } from './slideItem';

@Component({
  selector: 'ns-carousel-advanced',
  moduleId: module.id,
  templateUrl: './carousel-advanced.html',
})
export class CarouselAdvancedComponent implements OnInit, AfterViewInit {
  @ViewChild('advCarousel', { static: false }) carouselRef: ElementRef;
  items: SlideItem[];
  currentPage: number = 1;
  tappedPage: number = 0;
  indicatorEnabled: boolean = true;	
  scrollEnabled: boolean = true;

  carouselView: Carousel;
  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.items = this.itemService.getItems();
  }

  ngAfterViewInit(): void {
    this.carouselView = this.carouselRef.nativeElement as Carousel;
  }

  toggleColor(): void {
    this.carouselView.indicatorColor = '#FED700';
    this.carouselView.indicatorColorUnselected = '#50FED700';
  }

  toggleIndicator(): void {
    this.carouselView.showIndicator = !this.indicatorEnabled;
    this.indicatorEnabled = !this.indicatorEnabled;
  }

  pageChangedEvent(args: any): void {
    this.currentPage = args.index + 1;
  }

  pageTappedEvent(args: any): void {
    this.tappedPage = this.carouselView.selectedPage + 1;
  }

  onCheckedChange(args) {
    this.scrollEnabled = args.object.checked;
  }
}
