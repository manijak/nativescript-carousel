import { Component, OnInit, } from "@angular/core";
import { Page } from "tns-core-modules/ui/page/page";

@Component({
    selector: "ns-carousel-static",
    moduleId: module.id,
    templateUrl: "./carousel-static.html",
    styleUrls: ["./carousel-static.css"]
})
export class CarouselStaticComponent implements OnInit {
   
    constructor(private page: Page) { }

    ngOnInit(): void {
        //this.page.actionBarHidden = true;
    }
}
