import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { CarouselStaticComponent } from './item/carousel-static.component';
import { CarouselDynamicComponent } from './item/carousel-dynamic.component';
import { CarouselAdvancedComponent } from './item/carousel-advanced.component';
import { ItemService } from './item/item.service';
import { ItemsComponent } from './item/items.component';
import { CarouselImageZoomComponent } from './item/carousel-image-zoom.component';

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpModule } from "nativescript-angular/http";

@NgModule({
  bootstrap: [AppComponent],
  imports: [NativeScriptModule, AppRoutingModule],
  declarations: [AppComponent, ItemsComponent, CarouselImageZoomComponent, CarouselStaticComponent, CarouselDynamicComponent, CarouselAdvancedComponent],
  providers: [ItemService],
  schemas: [NO_ERRORS_SCHEMA]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule {}
