# Angular Carousel Demo - Instructions

### Please take a look at the demo code for more details on how to use the Carousel. Read below on how to run the demos.

_Don't forget to register the Carousel components in your main `app.component.ts`_
```js
registerElement('Carousel', () => Carousel);
registerElement('CarouselItem', () => CarouselItem);
```

## Manually create each slide by using `CarouselItem` without data-binding

```xml
<Carousel height="100%" width="100%" pageChanged="myChangeEvent" pageTapped="mySelectedEvent" indicatorColor="#fff000" finite="true" bounce="false" showIndicator="true" verticalAlignment="top" android:indicatorAnimation="swap" color="white">
    <CarouselItem id="slide1" backgroundColor="#b3cde0" verticalAlignment="middle">
        <Label text="Slide 1" backgroundColor="#50000000" horizontalAlignment="center"/>
    </CarouselItem>
    <CarouselItem id="slide2" backgroundColor="#6497b1" verticalAlignment="middle">
        <Label text="Slide 2" backgroundColor="#50000000" horizontalAlignment="center"/>
    </CarouselItem>
    <CarouselItem id="slide3" backgroundColor="#005b96" verticalAlignment="middle">
        <Label text="Slide 3" backgroundColor="#50000000" horizontalAlignment="center"/>
    </CarouselItem>
    <CarouselItem id="slide4" backgroundColor="#03396c" verticalAlignment="middle">
        <Label text="Slide 4" backgroundColor="#50000000" horizontalAlignment="center"/>
    </CarouselItem>
</Carousel>
```

## Or create a data-bound Carousel with a single `CarouselItem` acting as your template.

**Warning: This method is a bit of a "hack" in order to get the data-bound Carousel working with Angular. There are certain conditions that need to be met in order for the data-bound Carousel to work properly:** 
Please note that you need to assign your data-array to both the `Carousel` using the `items` property, and the `CarouselItem` using the `*ngFor="let item of myData"` directive.

**Example:**
```xml
<GridLayout height="350">
    <Carousel #myCarousel debug="true" [items]="myData" height="100%" width="100%" color="white" (pageChanged)="myChangePageEvent($event)" 
            android:indicatorAnimation="slide" indicatorColor="#fff" indicatorOffset="0, -10" showIndicator="true">
        <CarouselItem *ngFor="let item of myData" [backgroundColor]="item.color" verticalAlignment="middle" (tap)="myTapPageEvent()">
            <GridLayout>
                <Image [src]="item.image" stretch="aspectFill"></Image>
                <Label [text]="item.title" horizontalAlignment="center" backgroundColor="#50000000" height="30"></Label>
            </GridLayout>
        </CarouselItem>
    </Carousel>
</GridLayout>
```

## Events
You can create tap-events on the `CarouselItem` or on any elements innside it, then check against `selectedPage` to get the slide index.

```js
@ViewChild("myCarousel", { static: false }) carouselView: ElementRef<Carousel>;

export function myTapPageEvent(args) {
    console.log('Tapped page index: ' + (this.carouselView.nativeElement.selectedPage));
}

export function myChangePageEvent(args) {
    console.log('Page changed to index: ' + args.index);
};
```

## Running the demos

The best way to run the demo would be to clone the repo and run the demos from there. 
From the `src` folder you can run a set of npm scripts based on what you want to do. Take a look at the `package.json` too see all the script commands.

*To run the Angular demo run the following command:*

Navigate to the `src` folder:
`cd src`

Build the Carousel plugin:
`npm run build`

Run iOS demo:
`npm run demo-ng.ios`

Run Android demo:
`npm run demo-ng.android`
