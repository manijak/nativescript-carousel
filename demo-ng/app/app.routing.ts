import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { ItemsComponent } from "./item/items.component";
import { CarouselStaticComponent } from "./item/carousel-static.component";
import { CarouselDynamicComponent } from "./item/carousel-dynamic.component";
import { CarouselAdvancedComponent } from "./item/carousel-advanced.component";

const routes: Routes = [
    { path: "", redirectTo: "/items", pathMatch: "full" },
    { path: "items", component: ItemsComponent },
    { path: "static", component: CarouselStaticComponent },
    { path: "dynamic", component: CarouselDynamicComponent },
    { path: "advanced", component: CarouselAdvancedComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }