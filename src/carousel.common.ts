import {
  addWeakEventListener,
  booleanConverter,
  Color,
  GridLayout,
  Label,
  ObservableArray,
  Property,
  removeWeakEventListener,
  StackLayout,
  Template,
  Utils,
  View,
} from '@nativescript/core';

export class CarouselUtil {
  public static debug: boolean = false;
}

export class Log {
  static D(...args) {
    if (CarouselUtil.debug === true) {
      console.log('NativeScript-Carousel DEBUG: ', ...args);
      console.log('---------------------------------------------------');
    }
  }
}

export class CarouselCommon extends GridLayout {
  /**
   * String value when hooking into the pageChanged event.
   */
  public static pageChangedEvent = 'pageChanged';

  /**
   * String value when hooking into the pageTapped event.
   */
  public static pageTappedEvent = 'pageTapped';

  /**
   * String value when hooking into the pageScrolling event.
   */
  public static pageScrollingEvent = 'pageScrolling';

  /**
   * String value when hooking into the pageScrolled event.
   */
  public static pageScrollStateChangedEvent = 'pageScrolled';

  /**
   * Returns the native iOS DKCarouselView instance.
   */
  public ios: any;

  /**
   * Returns the native android ViewPager instance.
   */
  public android: any;

  /**
   * Assign a data-array to generate the slides and apply the bindingContext. If items is populated then you must use the template-option.
   */
  public items: ObservableArray<any>;

  /**
   * Defines the view template for each slide-view to be generated.
   */
  public itemTemplate: string | Template;

  /**
   * Sets/Gets the active page by index
   */
  public selectedPage;

  /**
   * Shows or hides the page-indicator
   */
  public showIndicator: boolean;

  /**
   * Sets the active indicator color. Default is semi-transparent white. Use hex or color-name.
   */
  public indicatorColor;

  /**
   * Sets the color of unselected indicators
   */
  public indicatorColorUnselected;

  /**
   * By default the indicator is centered at the bottom. You can use points (x,y) to move the indicator. E.g. indicatorOffset="100,100"
   */
  public indicatorOffset;

  /**
   * iOS Only - If set to 'true' scrolling will bounce at the first/last page (non-infinite). Default is 'false'.
   */
  public bounce;

  /**
   * iOS Only - If true last slide will wrap back to first and visa versa
   */
  public finite;

  /**
   * iOS Only - Enables/Disables user scroll on the Carousel.
   */
  public scrollEnabled;

  /**
   * iOS Only - Defines the interval in seconds to wait before the next slide is shown. Default is 0 (off).
   */
  public autoPagingInterval;

  /**
   * Android Only - Sets the pager-indicator animation type. Choose between: color, slide, scale, worm, thin_worm, fill, drop or none. Default is none.
   */
  public indicatorAnimation;

  /**
   * Android Only - Sets the pager-indicator animation duration in milliseconds. Default is 500.
   */
  public indicatorAnimationDuration;

  /**
   * Android Only - Sets the pager-indicator alignment. Choose between top or bottom. Default is bottom.
   */
  public indicatorAlignment;

  /**
   * Android Only - Sets the pager-indicator dot radius.
   */
  public indicatorRadius;

  /**
   * Android Only - Sets the pager-indicator dot padding.
   */
  public indicatorPadding;

  /**
   * If true console logs will be output to help debug the Carousel events.
   */
  set debug(value: boolean) {
    CarouselUtil.debug = value;
  }

  get debug() {
    return CarouselUtil.debug;
  }

  constructor() {
    super();
  }

  public _getDefaultItemContent(index: number): View {
    const lbl = new Label();
    lbl.bind({
      targetProperty: 'text',
      sourceProperty: '$value',
    });
    return lbl;
  }
}

export class CarouselItem extends StackLayout {
  constructor() {
    super();
  }

  onLoaded() {
    super.onLoaded();
  }
}

export namespace knownTemplates {
  export const itemTemplate = 'itemTemplate';
}

// Common
export const debugProperty = new Property<CarouselCommon, boolean>({
  name: 'debug',
  defaultValue: false,
  valueConverter: booleanConverter,
  valueChanged: (view, oldValue, newValue) => {
    CarouselUtil.debug = newValue;
  },
});
debugProperty.register(CarouselCommon);

export const itemTemplateProperty = new Property<CarouselCommon, any>({
  name: 'itemTemplate',
  affectsLayout: true,
  valueChanged: (view: any, oldValue, newValue) => {
    view.refresh(true);
  },
});
itemTemplateProperty.register(CarouselCommon);

export const itemsProperty = new Property<CarouselCommon, ObservableArray<any>>({
  name: 'items',
  affectsLayout: true,
  valueChanged: onItemsChanged,
});
itemsProperty.register(CarouselCommon);

export const selectedPageProperty = new Property<CarouselCommon, number>({
  name: 'selectedPage',
  defaultValue: 0,
  valueConverter: (value) => {
    return +value;
  },
  valueChanged: (view, oldValue, newValue) => {
    view.selectedPage = newValue;
  },
});
selectedPageProperty.register(CarouselCommon);

export const showIndicatorProperty = new Property<CarouselCommon, boolean>({
  name: 'showIndicator',
  defaultValue: true,
  valueConverter: booleanConverter,
  valueChanged: (view, oldValue, newValue) => {
    view.showIndicator = newValue;
  },
});
showIndicatorProperty.register(CarouselCommon);

export const indicatorColorProperty = new Property<CarouselCommon, Color>({
  name: 'indicatorColor',
  equalityComparer: Color.equals,
  valueConverter: (value) => {
    return new Color(value);
  },
  valueChanged: (view, oldValue, newValue) => {
    view.indicatorColor = newValue;
  },
});
indicatorColorProperty.register(CarouselCommon);

export const indicatorColorUnselectedProperty = new Property<CarouselCommon, Color>({
  name: 'indicatorColorUnselected',
  equalityComparer: Color.equals,
  valueConverter: (value) => {
    return new Color(value);
  },
  valueChanged: (view, oldValue, newValue) => {
    view.indicatorColorUnselected = newValue;
  },
});
indicatorColorUnselectedProperty.register(CarouselCommon);

export const indicatorOffsetProperty = new Property<CarouselCommon, any>({
  name: 'indicatorOffset',
  defaultValue: '0,0',
  valueChanged: (view, oldValue, newValue) => {
    view.indicatorOffset = newValue;
  },
});
indicatorOffsetProperty.register(CarouselCommon);

// iOS only
export const autoPagingIntervalProperty = new Property<CarouselCommon, number>({
  name: 'autoPagingInterval',
  defaultValue: 0,
  valueConverter: (value) => {
    return +value;
  },
  valueChanged: (view, oldValue, newValue) => {
    view.autoPagingInterval = newValue;
  },
});
autoPagingIntervalProperty.register(CarouselCommon);

export const finiteProperty = new Property<CarouselCommon, boolean>({
  name: 'finite',
  valueConverter: booleanConverter,
  valueChanged: (view, oldValue, newValue) => {
    view.finite = newValue;
  },
});
finiteProperty.register(CarouselCommon);

export const bounceProperty = new Property<CarouselCommon, boolean>({
  name: 'bounce',
  valueConverter: booleanConverter,
  valueChanged: (view, oldValue, newValue) => {
    view.bounce = newValue;
  },
});
bounceProperty.register(CarouselCommon);

export const scrollEnabledProperty = new Property<CarouselCommon, boolean>({
  name: 'scrollEnabled',
  valueConverter: booleanConverter,
  valueChanged: (view, oldValue, newValue) => {
    view.scrollEnabled = newValue;
  },
});
scrollEnabledProperty.register(CarouselCommon);

// Android only
export const indicatorAnimationProperty = new Property<CarouselCommon, IndicatorAnimation>({
  name: 'indicatorAnimation',
  affectsLayout: true,
  valueChanged: (view, oldValue, newValue) => {
    view.indicatorAnimation = newValue;
  },
});
indicatorAnimationProperty.register(CarouselCommon);

export const indicatorAnimationDurationProperty = new Property<CarouselCommon, number>({
  name: 'indicatorAnimationDuration',
  affectsLayout: true,
  valueConverter: (value) => {
    return +value;
  },
  valueChanged: (view, oldValue, newValue) => {
    view.indicatorAnimationDuration = newValue;
  },
});
indicatorAnimationDurationProperty.register(CarouselCommon);

export const indicatorAlignmentProperty = new Property<CarouselCommon, any>({
  name: 'indicatorAlignment',
  defaultValue: 'BOTTOM',
  valueChanged: (view, oldValue, newValue) => {
    view.indicatorAlignment = newValue.toUpperCase();
  },
});
indicatorAlignmentProperty.register(CarouselCommon);

export const indicatorRadiusProperty = new Property<CarouselCommon, number>({
  name: 'indicatorRadius',
  affectsLayout: true,
  valueConverter: (value) => {
    return +value;
  },
  valueChanged: (view, oldValue, newValue) => {
    view.indicatorRadius = newValue;
  },
});
indicatorRadiusProperty.register(CarouselCommon);

export const indicatorPaddingProperty = new Property<CarouselCommon, number>({
  name: 'indicatorPadding',
  affectsLayout: true,
  valueConverter: (value) => {
    return +value;
  },
  valueChanged: (view, oldValue, newValue) => {
    view.indicatorPadding = newValue;
  },
});
indicatorPaddingProperty.register(CarouselCommon);

function onItemsChanged(view: any, oldValue, newValue) {
  if (oldValue instanceof ObservableArray) {
    removeWeakEventListener(oldValue, ObservableArray.changeEvent, view.refresh, view);
  }

  if (newValue instanceof ObservableArray) {
    addWeakEventListener(newValue, ObservableArray.changeEvent, view.refresh, view);
  }

  if (!Utils.isNullOrUndefined(view.items) && Utils.isNumber(view.items.length)) {
    view.refresh(false);
  }
}

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
  'SWAP' = 'SWAP',
}
