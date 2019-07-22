import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Input } from "@angular/core";
import { Carousel } from "nativescript-carousel";

import { SlideItem } from "./slideItem";
import { ItemService } from "./item.service";

@Component({
    selector: "ns-carousel-dynamic",
    moduleId: module.id,
    templateUrl: "./carousel-dynamic.html",
})
export class CarouselDynamicComponent implements OnInit, AfterViewInit {
    @ViewChild("myCarousel", { static: false }) carouselView: ElementRef<Carousel>;
    myData: SlideItem[];
    constructor(private itemService: ItemService) { }

    ngOnInit(): void {
        this.myData = this.itemService.getItems();
        console.log("oninit", this.myData.length);
    }
    
    ngAfterViewInit(): void {}
    
    myChangePageEvent(args: any): void {
        var changeEventText = 'Changed to slide index: ' + (args.index);
        console.log(changeEventText);
    }
    myTapPageEvent(): void {
        console.log('Tapped page: ' + (this.carouselView.nativeElement.selectedPage+1));
    }
    selectPageThree(): void {
        this.carouselView.nativeElement.selectedPage = 2;
    }

    addNewPage(): void {
        let itemList = [...this.myData];
        let pagenr = this.myData.length + 1;
        let color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
        itemList.push({ pageNr: pagenr, title: `Slide ${pagenr}`, color: color, image: '' });
        console.log('push item, update array');
        this.myData = itemList;

        setTimeout(() => {
            if (this.carouselView) {
                let selectPage = this.myData.length-1;
                console.log('focus on page index: ', selectPage);
                this.carouselView.nativeElement.selectedPage = selectPage;
            }
        },100);

    }
}
