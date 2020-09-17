[![npm](https://img.shields.io/npm/v/nativescript-carousel.svg)](https://www.npmjs.com/package/nativescript-carousel)
[![npm](https://img.shields.io/npm/dt/nativescript-carousel.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-carousel)

# NativeScript Carousel

A simple carousel component for NativeScript.

| Platform | Supported | Version  |                                      NativeView                                       |
| -------- | :-------: | :------: | :-----------------------------------------------------------------------------------: |
| iOS      |    Yes    | iOS 8.1+ |              [DKCarouselView](https://github.com/manijak/DKCarouselView)              |
| Android  |    Yes    | API 15+  | ViewPager with [PageIndicatorView](https://github.com/romandanylyk/PageIndicatorView) |

## Installation

NativeScript 7+:

```bash
ns plugin add nativescript-carousel
```

NativeScript less than NS7:

```bash
tns plugin add nativescript-carousel@6.1.1
```

## Limitations

- (iOS) PagerIndicator animations not available for iOS, only Android.
- (Android) Auto- and Infinite-paging not available.
- (Android) Carousel still needs to be wrapped in a GridLayout for the indicator to overlap.

## Usage

Check out the demos included in this repo for instructions on how to use the Carousel with your choice of framework:

[Vanilla TS demo](https://github.com/manijak/nativescript-carousel/tree/master/demo)

[Angular demo](https://github.com/manijak/nativescript-carousel/tree/master/demo-ng)

[Vue demo](https://github.com/manijak/nativescript-carousel/tree/master/demo-vue)

## Attributes - Common

- **items** _optional_ (must be used with `itemTemplate`)

Assign a data-array to generate the slides and apply the bindingContext. If `items` is populated then you must use the template-option.

- **itemTemplate** _optional_ (must be used with `items`)

Defines the view template for each slide-view to be generated.

- **selectedPage** _optional_

Sets/Gets the active page by index

- **showIndicator** _optional_

Shows or hides the page-indicator

- **indicatorColor** _optional_

Sets the active indicator color. Default is semi-transparent white. Use hex or color-name.

- **indicatorColorUnselected**

Sets the color of unselected indicators

- **indicatorOffset** _optional_

By default the indicator is centered at the bottom. You can use points (x,y) to move the indicator. E.g. `indicatorOffset="100,100"`

## Attributes - iOS specific

- **finite** _optional_

If true last slide will wrap back to first and visa versa

- **bounce** _optional_

If set to 'true' scrolling will bounce at the first/last page (non-infinite). Default is 'false'.

- **autoPagingInterval** _optional_

Defines the interval in seconds to wait before the next slide is shown. Default is 0 (off).

- **scrollEnabled** _optional_

Enables/Disables user scroll on the Carousel.

- **ios**

Returns the `DKCarouselView` object.

## Attributes - Android specific

- **android**

Returns the `ViewPager` object.

- **indicatorAnimation**

Sets the pager-indicator animation type. Choose between: `color`, `slide`, `scale`, `worm`, `thin_worm`, `fill`, `drop` or `none`. Default is `none`.

- **indicatorAnimationDuration**

Sets the pager-indicator animation duration in milliseconds. Default is 500.

- **indicatorAlignment**

Sets the pager-indicator alignment. Choose between `top` or `bottom`. Default is `bottom`.

- **indicatorRadius**

Sets the pager-indicator dot radius.

- **indicatorPadding**

Sets the pager-indicator dot padding.

- **pageIndicatorCount**

Set the indicator count which will change the underlying Android data adapter. See issue [#5 discussion](https://github.com/manijak/nativescript-carousel/issues/5#issuecomment-414993988)

## Demo

| iOS                                                                                              | Android                                                                                                  |
| ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| ![iOS](https://github.com/manijak/nativescript-carousel/raw/master/screenshots/ios_carousel.gif) | ![Android](https://github.com/manijak/nativescript-carousel/raw/master/screenshots/android_carousel.gif) |

#### Indicator animations (Android only!)

| NONE                                                                                                       | COLOR                                                                                                        | SCALE                                                                                                        | SLIDE                                                                                                        |
| ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| ![anim_none](https://raw.githubusercontent.com/romandanylyk/PageIndicatorView/master/assets/anim_none.gif) | ![anim_color](https://raw.githubusercontent.com/romandanylyk/PageIndicatorView/master/assets/anim_color.gif) | ![anim_scale](https://raw.githubusercontent.com/romandanylyk/PageIndicatorView/master/assets/anim_scale.gif) | ![anim_slide](https://raw.githubusercontent.com/romandanylyk/PageIndicatorView/master/assets/anim_slide.gif) |

| WORM                                                                                                       | THIN_WORM                                                                                                            | FILL                                                                                                       | DROP                                                                                                       | SWAP                                                                                                       |
| ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| ![anim_worm](https://raw.githubusercontent.com/romandanylyk/PageIndicatorView/master/assets/anim_worm.gif) | ![anim_thin_worm](https://raw.githubusercontent.com/romandanylyk/PageIndicatorView/master/assets/anim_thin_worm.gif) | ![anim_fill](https://raw.githubusercontent.com/romandanylyk/PageIndicatorView/master/assets/anim_fill.gif) | ![anim_drop](https://raw.githubusercontent.com/romandanylyk/PageIndicatorView/master/assets/anim_drop.gif) | ![anim_swap](https://raw.githubusercontent.com/romandanylyk/PageIndicatorView/master/assets/anim_swap.gif) |

## Changelog

**7.0.1**

- Hotfix release: Fixes issues with the `@NativeClass()` decorator.

**7.0.0**

- Plugin updated to support NativeScript v7.0 release. Thanks to @BradMartin, @NathanWalker & @rickwalking for all the PRs and making sure the code compiles & runs. :clap:

**6.1.0**

- Fix for iOS safe-area issues. No need to use the custom css-padding-hack any more.
- DKCarouselView pod updated to version 2.5.0 (fix safe-area layout).
- Known bugs: Orientation change render-issues on iOS (DKCarouselView) (help wanted).
- Demos updated.

**6.0.0**

- NativeScript 6.0 & AndroidX migration.
- IndicatorView gradle bumped to 1.0.3 (androidx).
- Some refactorings on the Android side for the plugin to work better with Angular & Vue.
- Demos updated, again.
- Instructions for each demo updated.

**4.2.5**

- Fix for the dreadded `PagerAdapter changed the adapter's contents without calling PagerAdapter#notifyDataSetChanged!` error on Android.
- Hotfix on the AndroidX migration.
- Minor refactor in the `refresh()` function. Safer to call on demand.
- Redesigned all demo apps. Added more advanced examples.
- 4.x will be the last Nativescript 5.x version. All future versions will be Nativescript 6.x only and that includes AndroidX.

**4.2.1**

- Hotfix for static items. Sorry!

**4.2.0**

- AndroidX update for NS6. Thanks @bradmartin!
- Code cleanup, typings fix.
- Demos updated. Proper Vue-demo added.

**4.1.0**

- Added setter for `pageIndicatorCount` for Android to enable dynamically changing the length of the carousel items array without Android throwing a crash about the adapster set changing incorrectly.

**4.0.2**

- Carousel now extends from GridLayout instead of AbsoluteLayout (better positioning). (Thanks @bradmartin)

**4.0.0**

- Mirgration to TypeScript, typings added (Thanks @bradmartin)
- Cleanup in demo app, added ng-demo (Thanks @bradmartin)

**3.1.1**

- Made comaptible for recent TNS 3.2.x releases.
- Merged fix regarding the `notifyDataSetChanged` issue. Thanks @OPADA-Eng
- Fixed issue on iOS when having only 2 slides. Thanks @sitefinitysteve

**3.1.0**

- Made comaptible for recent TNS 3.1.x releases.
- Updated Android indicator library to latest version.

**3.0.2**

- Fixed an issue with events not working on Android (affected all events).

**3.0.1**

- Fixed a critical bug on Android during `refresh` when navigating back to a view with a Carousel.

**3.0.0**

- Finally! Support for TNS 3.x. Big thanks to @MattNer0, @sitefinitysteve, @hristo, @NickIliev
- Fixed the "refresh observable" issue on Android, thanks @MattNer0.
- New property to enable/disable scroll, thanks @sitefinitysteve.
- New property for Android: `indicatorOffset`, thanks @sitefinitysteve.
- Fixed issue with orientation change on iOS. Please use `nativescript-orientation` plugin in order to trigger UI-refresh.
- Code refactor & cleanup, introduced common.js
- Updated Pod & Android-IndicatorView to latest version.

**2.4.2**

- Added `bounce` property to the plugin and the Pod. Thanks to @sitefinitysteve.

**2.4.1**

- Fixed an issue on iOS when updating `Items` binding, would not refresh Carousel-view.

**2.4.0**

- Added new event, 'pageScrolling'. Thanks to @sitefinitysteve!
- Updated gradle for 'PageIndicatorView' to version 0.1.2
- Updated package.json with 'plugin' metadata to comply with the upcomming 3.0 plugin standard
- Potential fix for `ViewPager.populate` exception on Android.

**2.3.1**

- Potential fix for ng2 & webpack users (`Trying to link invalid 'this' to a Java object`). Thanks @peterstaev.
- Updated android indicators gradle plugin. New animation: `swap`!

**2.3.0**

- Changed the iOS Pod to point to our own repo! We have the control ;)
- New property available for iOS: `indicatorColorUnselected`. Allows you to set color to the unselected dots.

**2.2.0**

- Fixed issue with the `refresh` function that could cause a crash or removal of slides (Android).
- Updated Android-indicators gradle library to v0.1.0. More stable and more animations! New animations are: `drop`, `scale` and `thin_worm`.
- Fixed issue with a small white bar being shown if the indicators are disabled (Android). Thanks to @EddyVerbruggen.
- Fixed, another, potential bug that would cause app to crash when resuming he activity (Android).

**2.1.2**

- Fixed a critical bug that would cause the app to crash when resuming the activity (Android). Thanks to @EddyVerbruggen.

**2.1.1**

- Corrected README, iOS does indeed allow for tap-events innside the CarouselItems. Thanks @terreb!
- Fixed the selectedPage property on iOS, now also returns selected index.
- Updated iOS Podfile to 1.4.12

**2.1.0**

- Added Android support!
- Android gets animated pager-indicators made by @romandanylyk.

**1.1.0**

- Updated pod with version '1.4.10'
- Fixed page-change-event when finite is set to 'true'
- Added new property 'selectedPage' (set active page by index).
- Updated demo app

**1.0.0**

- Initial release

## Author

- [manijak](https://github.com/manijak)

## Collaborators

- [bradmartin](https://github.com/bradmartin)
- [NathanWalker](https://github.com/NathanWalker)
- [rickwalking](https://github.com/rickwalking)
- [sitefinitysteve](https://github.com/sitefinitysteve)
- [EddyVerbruggen](https://github.com/EddyVerbruggen)
- [Pip3r4o](https://github.com/Pip3r4o)
- [MattNer0](https://github.com/MattNer0)

## Contributing

I will accept pull requests that improve this and assign credit.

- Fork and clone the repository
- `cd src && npm run setup`
- `npm run demo.android` for android development
- `npm run demo.ios` for iOS development
- `npm run demo-ng.ios` for iOS Angular app
- `npm run demo-ng.android` for Android Angular
- `npm run demo-vue.ios` for iOS Vue app
- `npm run demo-vue.android` for Android Vue
