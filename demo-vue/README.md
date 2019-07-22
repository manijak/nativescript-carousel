# Vue Carousel Demo - Instructions

### Please take a look at the demo code for more details on how to use the Carousel. Read below on how to run the demos.

_Don't forget to register the Carousel components in your main `app.ts`_
```js
Vue.registerElement('Carousel', () => require('nativescript-carousel').Carousel);
Vue.registerElement('CarouselItem', () => require('nativescript-carousel').CarouselItem);
```

## Manually create each slide by using `CarouselItem` without data-binding

```xml
<Carousel height="100%" width="100%" pageChanged="myChangeEvent" pageTapped="mySelectedEvent" indicatorColor="#fff000" finite="true" bounce="false" showIndicator="true" verticalAlignment="top"        android:indicatorAnimation="swap" color="white">
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

**Warning: This method is a bit of a "hack" in order to get the data-bound Carousel working with Vue. There are certain conditions that need to be met in order for the data-bound Carousel to work properly:** 

You need to assign your data-array the `CarouselItem` using the `v-for="(item, i) in myData"` directive.
You also need to add a watcher on your data-array for the Carousel to refresh.

**Example:**
```xml
 <GridLayout height="350">
    <Carousel ref="myCarousel" v-if="hasItems" height="100%" width="100%" color="white" @pageChanged="myChangePageEvent" android:indicatorAnimation="slide" indicatorColor="#fff" indicatorOffset="0, -10" showIndicator="true">
        <CarouselItem v-for="(item, i) in myData" :key="i" :backgroundColor="item.color" verticalAlignment="middle" @tap="myTapPageEvent">
            <GridLayout>
                <Image :src="item.image" stretch="aspectFill" />
                <Label :text="item.title" horizontalAlignment="center" backgroundColor="#50000000" height="30" />
            </GridLayout>
        </CarouselItem>
    </Carousel>
</GridLayout>
```
```js
watch: {
    async myData(to) {
        await this.$nextTick()
        this.$refs.myCarousel.nativeView.refresh();
    },
}
```

## Events
You can create tap-events on the `CarouselItem` or on any elements innside it, then check against `selectedPage` to get the slide index.

```js
export function myTapPageEvent(args) {
    console.log('Tapped page index: ' + this.$refs.myCarousel.nativeView.selectedPage);
}
export function myChangePageEvent(args) {
    console.log('Page changed to index: ' + args.index);
};
```

## Running the demos

The best way to run the demo would be to clone the repo and run the demos from there. 
From the `src` folder you can run a set of npm scripts based on what you want to do. Take a look at the `package.json` too see all the script commands.

*To run the Vue demo run the following command:*

Navigate to the `src` folder:
`cd src`

Build the Carousel plugin:
`npm run build`

Run iOS demo:
`npm run demo-vue.ios`

Run Android demo:
`npm run demo-vue.android`
