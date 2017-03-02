[![npm](https://img.shields.io/npm/v/nativescript-carousel.svg)](https://www.npmjs.com/package/nativescript-carousel)
[![npm](https://img.shields.io/npm/dt/nativescript-carousel.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-carousel)

# NativeScript Carousel
A simple carousel component for NativeScript.

|Platform|Supported|Version|NativeView|
| ------------------- | :-----------: | :-----------: | :------------------: |
|iOS|Yes|iOS 8.1+|[DKCarouselView](https://github.com/zhangao0086/DKCarouselView)|
|Android|Yes|API 15+|ViewPager with [PageIndicatorView](https://github.com/romandanylyk/PageIndicatorView)|

## Installation
Run  `tns plugin install nativescript-carousel` in the ROOT directory of your project.

## Upgrading
If you are upgrading from an earlier version, you might receive some errors when building. Therefore you must remove the platforms and re-add them. 
```
tns platform remove ios OR android
tns platform add ios OR android
```

## Limitations
- (iOS) PagerIndicator animations not available for iOS, only Android. 
- (Android) In order to show the PageIndicators on top of the Carousel, wrap the `<Carousel>` inside a `<GridLayout>`.
- (Android) Auto- and Infinite-paging not available.
- (Angular) Only static slides work, the dynamic ones with binding do not (for now).
 
## Usage
*Make sure you include the namespace on the Page element:*
```xml
xmlns:ns="nativescript-carousel"
```

#### Manually create each slide by using `CarouselItem`
```xml
<ns:Carousel height="250" pageChanged="myChangeEvent">
    <ns:CarouselItem id="slide1"  verticalAlignment="center" backgroundColor="#b3cde0" height="250">
        <Label text="Slide 1" verticalAlignment="center" horizontalAlignment="center"/>
    </ns:CarouselItem>
    <ns:CarouselItem id="slide2" verticalAlignment="center" backgroundColor="#6497b1" height="250">
        <Label text="Slide 2" verticalAlignment="center" horizontalAlignment="center"/>
    </ns:CarouselItem>
    <ns:CarouselItem id="slide3" verticalAlignment="center" backgroundColor="#005b96" height="250">
        <Label text="Slide 3" verticalAlignment="center" horizontalAlignment="center"/>
    </ns:CarouselItem>
</ns:Carousel>
```

#### Or use a template by wrapping a single `CarouselItem` with `Carousel.itemTemplate` and assigning the `items` property with an array of data.
```xml
<ns:Carousel items="{{ myDataArray }}" height="250" pageChanged="myChangeEvent">
    <ns:Carousel.itemTemplate>
        <ns:CarouselItem  verticalAlignment="center" backgroundColor="{{ color }}" height="250" tap="myTapEvent">
            <Label text="{{ title }}"  horizontalAlignment="center"/>
            <Image src="{{ image }}" height="100" />
        </ns:CarouselItem>
    </ns:Carousel.itemTemplate>
</ns:Carousel>
```

#### Events
For both platforms, you can create tap-events on the `CarouselItem` or elements innside it, then check against `selectedPage` to get the index.

```js
exports.myChangeEvent = function(args){
    var changeEventText = "Page changed to index: " + args.index;
    console.log(changeEventText);
}
```

## Attributes - Common
* **items** *optional* (must be used with `itemTemplate`)

Assign a data-array to generate the slides and apply the bindingContext. If `items` is populated then you must use the template-option.

* **itemTemplate** *optional* (must be used with `items`)

Defines the view template for each slide-view to be generated. 

* **selectedPage** *optional*

Sets/Gets the active page by index

* **showIndicator** *optional*

Shows or hides the page-indicator

* **indicatorColor** *optional*

Sets the active indicator color. Default is semi-transparent white. Use hex or color-name. 

* **indicatorColorUnselected**

Sets the color of unselected indicators

## Attributes - iOS specific
* **finite** *optional*

If set to 'true' scrolling will bounce at the first/last page (non-infinite). Default is 'false'. 

* **autoPagingInterval** *optional*

Defines the interval in seconds to wait before the next slide is shown. Default is 0 (off).

* **indicatorOffset** *optional*

By default the indicator is centered at the bottom. You can use points (x,y) to move the indicator. E.g. `indicatorOffset="100,100"`

* **ios**

Returns the `DKCarouselView` object.


## Attributes - Android specific
* **android**

Returns the `ViewPager` object.

* **indicatorAnimation**

Sets the pager-indicator animation type. Choose between: `color`, `slide`, `scale`, `worm`, `thin_worm`, `fill`, `drop` or `none`. Default is `none`.

* **indicatorAnimationDuration**

Sets the pager-indicator animation duration in milliseconds. Default is 500.

* **indicatorAlignment**

Sets the pager-indicator alignment. Choose between `top` or `bottom`. Default is `bottom`.

* **indicatorRadius**

Sets the pager-indicator dot radius.

* **indicatorPadding**

Sets the pager-indicator dot padding.


## Demo
|iOS|Android|
| ----------- | ----------- |
|![iOS](https://github.com/manijak/nativescript-carousel/raw/master/ios_carousel.gif)|![Android](https://github.com/manijak/nativescript-carousel/raw/master/android_carousel.gif)|

#### Indicator animations (Android only!)
NONE| COLOR| SCALE| SLIDE
--- | --- | --- | --- 
![anim_none](https://raw.githubusercontent.com/romandanylyk/PageIndicatorView/master/assets/anim_none.gif) |![anim_color](https://raw.githubusercontent.com/romandanylyk/PageIndicatorView/master/assets/anim_color.gif) |![anim_scale](https://raw.githubusercontent.com/romandanylyk/PageIndicatorView/master/assets/anim_scale.gif) |![anim_slide](https://raw.githubusercontent.com/romandanylyk/PageIndicatorView/master/assets/anim_slide.gif)

WORM| THIN_WORM| FILL| DROP| SWAP
--- | --- | --- | --- | ---
![anim_worm](https://raw.githubusercontent.com/romandanylyk/PageIndicatorView/master/assets/anim_worm.gif) |![anim_thin_worm](https://raw.githubusercontent.com/romandanylyk/PageIndicatorView/master/assets/anim_thin_worm.gif) |![anim_fill](https://raw.githubusercontent.com/romandanylyk/PageIndicatorView/master/assets/anim_fill.gif) |![anim_drop](https://raw.githubusercontent.com/romandanylyk/PageIndicatorView/master/assets/anim_drop.gif) |![anim_swap](https://raw.githubusercontent.com/romandanylyk/PageIndicatorView/master/assets/anim_swap.gif)

## Changelog

**2.3.1**
* Potential fix for ng2 & webpack users (`Trying to link invalid 'this' to a Java object`). Thanks @peterstaev.
* Updated android indicators gradle plugin. New animation: `swap`!

**2.3.0**
* Changed the iOS Pod to point to our own repo! We have the control ;)
* New property available for iOS: `indicatorColorUnselected`. Allows you to set color to the unselected dots.

**2.2.0**
* Fixed issue with the `refresh` function that could cause a crash or removal of slides (Android).
* Updated Android-indicators gradle library to v0.1.0. More stable and more animations! New animations are: `drop`, `scale` and `thin_worm`.
* Fixed issue with a small white bar being shown if the indicators are disabled (Android). Thanks to @EddyVerbruggen.
* Fixed, another, potential bug that would cause app to crash when resuming he activity (Android). 

**2.1.2**
* Fixed a critical bug that would cause the app to crash when resuming the activity (Android). Thanks to @EddyVerbruggen.

**2.1.1**
* Corrected README, iOS does indeed allow for tap-events innside the CarouselItems. Thanks @terreb!
* Fixed the selectedPage property on iOS, now also returns selected index. 
* Updated iOS Podfile to 1.4.12

**2.1.0**
* Added Android support!
* Android gets animated pager-indicators made by @romandanylyk. 

**1.1.0**
* Updated pod with version '1.4.10'
* Fixed page-change-event when finite is set to 'true'
* Added new property 'selectedPage' (set active page by index). 
* Updated demo app  

**1.0.0**
* Initial release

## Author
* [manijak](https://github.com/manijak)

## Collaborators
* [Pip3r4o](https://github.com/Pip3r4o) 

## Help
I will accept pull requests that improve this and assign credit.
