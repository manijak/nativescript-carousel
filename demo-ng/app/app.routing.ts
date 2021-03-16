import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';
import { CarouselAdvancedComponent } from './item/carousel-advanced.component';
import { CarouselDynamicComponent } from './item/carousel-dynamic.component';
import { CarouselStaticComponent } from './item/carousel-static.component';
import { ItemsComponent } from './item/items.component';
import { CarouselImageZoomComponent } from './item/carousel-image-zoom.component';

const routes: Routes = [
  { path: '', redirectTo: '/items', pathMatch: 'full' },
  { path: 'items', component: ItemsComponent },
  { path: 'static', component: CarouselStaticComponent },
  { path: 'dynamic', component: CarouselDynamicComponent },
  { path: 'advanced', component: CarouselAdvancedComponent },
  { path: 'imageZoom', component: CarouselImageZoomComponent },
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
