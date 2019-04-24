import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from "@angular/core";
import { Carousel } from "nativescript-carousel";

import { SlideItem } from "./slideItem";
import { ItemService } from "./item.service";


@Component({
    selector: "ns-carousel-dynamic",
    moduleId: module.id,
    templateUrl: "./carousel-dynamic.html",
})
export class CarouselDynamicComponent implements OnInit, AfterViewInit {
    @ViewChild('dynamicCarousel') carouselRef: ElementRef;
    items: SlideItem[];

    carouselView: Carousel;

    constructor(private itemService: ItemService) { }

    ngOnInit(): void {
        this.items = this.itemService.getItems();
    }

    ngAfterViewInit(): void {
        this.carouselView = this.carouselRef.nativeElement as Carousel;
    }

    selectPage(): void {
        this.carouselView.selectedPage = 2;
    }
}
