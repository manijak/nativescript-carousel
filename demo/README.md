# Vanilla TS/JS Carousel Demo - Instructions

### Please take a look at the demo code for more details on how to use the Carousel. Read below on how to run the demos.

_Make sure you include the namespace on the root element:_

```xml
xmlns:ns="nativescript-carousel"
```

#### Manually create each slide by using `CarouselItem`

```xml
<ns:Carousel height="100%" width="100%" pageChanged="myChangeEvent" pageTapped="mySelectedEvent" indicatorColor="#fff000" finite="true" bounce="false" showIndicator="true" verticalAlignment="top" android:indicatorAnimation="swap" color="white">
    <ns:CarouselItem id="slide1" backgroundColor="#b3cde0" verticalAlignment="middle">
        <Label text="Slide 1" backgroundColor="#50000000" horizontalAlignment="center"/>
    </ns:CarouselItem>
    <ns:CarouselItem id="slide2" backgroundColor="#6497b1" verticalAlignment="middle">
        <Label text="Slide 2" backgroundColor="#50000000" horizontalAlignment="center"/>
    </ns:CarouselItem>
    <ns:CarouselItem id="slide3" backgroundColor="#005b96" verticalAlignment="middle">
        <Label text="Slide 3" backgroundColor="#50000000" horizontalAlignment="center"/>
    </ns:CarouselItem>
    <ns:CarouselItem id="slide4" backgroundColor="#03396c" verticalAlignment="middle">
        <Label text="Slide 4" backgroundColor="#50000000" horizontalAlignment="center"/>
    </ns:CarouselItem>
</ns:Carousel>
```

#### Or use a template by wrapping a single `CarouselItem` with `Carousel.itemTemplate` and assigning the `items` property with an array of data.

```xml
<ns:Carousel id="myCarousel" items="{{ myDataArray }}" height="100%" width="100%" color="white" pageChanged="myChangeEvent" android:indicatorAnimation="slide"  indicatorColor="#fff" indicatorOffset="0,0" showIndicator="true">
    <ns:Carousel.itemTemplate>
        <ns:CarouselItem backgroundColor="{{ color }}" verticalAlignment="middle" tap="myTapEvent">
            <GridLayout>
                <Image src="{{ image }}" stretch="aspectFill" />
                <Label text="{{ title }}" horizontalAlignment="center" backgroundColor="#50000000" height="30" />
            </GridLayout>
        </ns:CarouselItem>
    </ns:Carousel.itemTemplate>
</ns:Carousel>
```

#### Events

You can create tap-events on the `CarouselItem` or on any elements innside it, then check against `selectedPage` to get the slide index.

```js
export function myTapEvent(args) {
    let myCarousel = page.getViewById('myCarousel');
    console.log('Tapped page index: ' + (myCarousel.selectedPage));
}

export function myChangeEvent(args) {
    var changeEventText = 'Page changed to index: ' + args.index;
    console.log(changeEventText);
};
```

## Running the demos

The best way to run the demo would be to clone the repo and run the demos from there. 
From the `src` folder you can run a set of npm scripts based on what you want to do. Take a look at the `package.json` too see all the script commands.

*To run the NS Vanilla demo run the following command:*

Navigate to the `src` folder:
`cd src`

Build the Carousel plugin:
`npm run build`

Run iOS demo:
`npm run demo.ios`

Run Android demo:
`npm run demo.android`
