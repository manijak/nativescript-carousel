import { Component, OnInit } from '@angular/core';
import { Page } from '@nativescript/core';

@Component({
  selector: 'ns-carousel-static',
  moduleId: module.id,
  templateUrl: './carousel-static.html',
  styleUrls: ['./carousel-static.css'],
})
export class CarouselStaticComponent implements OnInit {
  constructor(private page: Page) {}

  ngOnInit(): void {
    //this.page.actionBarHidden = true;
  }
}
