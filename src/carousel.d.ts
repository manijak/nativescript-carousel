import { Color, ObservableArray, booleanConverter, Property, Template, View, addWeakEventListener, removeWeakEventListener, Label, GridLayout, StackLayout, Utils } from '@nativescript/core';

export declare class Carousel extends CarouselCommon {
  private _androidViewId;
  private _indicatorViewId;
  private _pagerIndicatorLayoutParams;

  /**
   * Android Only - the native page indicator instance.
   */
  pageIndicatorView: any;

  _childrenCount: any;
  CarouselPagerAdapterClass: CarouselPagerAdapterClassInner;
  CarouselPageChangedListenerClass: CarouselPageChangedListener;
  constructor();
  readonly android: any;

  /**
   * Android Only - the native pager adapter for the carousel.
   */
  readonly pagerAdapter: any;

  /**
   * Android Only - set the page indicator count (useful when modifying the carousel items programmatically).
   */
  pageIndicatorCount: number;

  createNativeView(): any;
  onLoaded(): void;
  initNativeView(): void;
  refresh(): void;
  onLayout(left: any, top: any, right: any, bottom: any): void;
  private _getDataItem;
  onItemsChanged(data: any): void;
}

@NativeClass()
declare class CarouselPagerAdapterClassInner extends androidx.viewpager.widget.PagerAdapter {
  private owner;
  constructor(owner: WeakRef<Carousel>);
  getCount(): any;
  getItemPosition(item: any): number;
  isViewFromObject(view: any, _object: any): boolean;
  instantiateItem(container: any, index: any): any;
  destroyItem(container: any, index: any, _object: any): any;
  saveState(): android.os.Bundle;
  restoreState(state: any, loader: any): void;
}

declare class CarouselPageChangedListener extends androidx.viewpager.widget.ViewPager.SimpleOnPageChangeListener {
  private owner;
  constructor(owner: WeakRef<Carousel>);
  onPageSelected(position: any): void;
  onPageScrollStateChanged(state: any): void;
  onPageScrolled(position: any, positionOffset: any, positionOffsetPixels: any): void;
}

export declare class CarouselCommon extends GridLayout {
  static pageChangedEvent: string;
  static pageTappedEvent: string;
  static pageScrollingEvent: string;
  static pageScrollStateChangedEvent: string;
  ios: any;
  android: any;
  items: ObservableArray<any>;
  itemTemplate: string | Template;
  selectedPage: any;
  showIndicator: boolean;
  indicatorColor: any;
  indicatorColorUnselected: any;
  indicatorOffset: any;
  bounce: any;
  finite: any;
  scrollEnabled: any;
  autoPagingInterval: any;
  indicatorAnimation: any;
  indicatorAnimationDuration: any;
  indicatorAlignment: any;
  indicatorRadius: any;
  indicatorPadding: any;
  debug: boolean;
  constructor();
  _getDefaultItemContent(index: number): View;
}
export declare class CarouselItem extends StackLayout {
  constructor();
  onLoaded(): void;
}

export declare namespace knownTemplates {
  const itemTemplate = 'itemTemplate';
}

export declare const debugProperty: Property<CarouselCommon, boolean>;
export declare const itemTemplateProperty: Property<CarouselCommon, any>;
export declare const itemsProperty: Property<CarouselCommon, ObservableArray<any>>;
export declare const selectedPageProperty: Property<CarouselCommon, number>;
export declare const showIndicatorProperty: Property<CarouselCommon, boolean>;
export declare const indicatorColorProperty: Property<CarouselCommon, Color>;
export declare const indicatorColorUnselectedProperty: Property<CarouselCommon, Color>;
export declare const indicatorOffsetProperty: Property<CarouselCommon, any>;
export declare const autoPagingIntervalProperty: Property<CarouselCommon, number>;
export declare const finiteProperty: Property<CarouselCommon, boolean>;
export declare const bounceProperty: Property<CarouselCommon, boolean>;
export declare const scrollEnabledProperty: Property<CarouselCommon, boolean>;
export declare const indicatorAnimationProperty: Property<CarouselCommon, IndicatorAnimation>;
export declare const indicatorAnimationDurationProperty: Property<CarouselCommon, number>;
export declare const indicatorAlignmentProperty: Property<CarouselCommon, any>;
export declare const indicatorRadiusProperty: Property<CarouselCommon, number>;
export declare const indicatorPaddingProperty: Property<CarouselCommon, number>;

/**
 * ** ANDROID ONLY ** - Enum to indicator animation type.
 */
export enum IndicatorAnimation {
  'NONE' = 'NONE',
  'COLOR' = 'COLOR',
  'SLIDE' = 'SLIDE',
  'WORM' = 'WORM',
  'FILL' = 'FILL',
  'SCALE' = 'SCALE',
  'SCALE_DOWN' = 'SCALE_DOWN',
  'THIN_WORM' = 'THIN_WORM',
  'DROP' = 'DROP',
  'SWAP' = 'SWAP'
}

export declare class CarouselUtil {
  static debug: boolean;
}
export declare class Log {
  static D(...args: any[]): void;
}
