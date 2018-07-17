import { Color } from 'tns-core-modules/color';
import { ObservableArray } from 'tns-core-modules/data/observable-array';
import { ContentView } from 'tns-core-modules/ui/content-view';
import { booleanConverter, Property, View } from 'tns-core-modules/ui/core/view';
import { addWeakEventListener, removeWeakEventListener } from 'tns-core-modules/ui/core/weak-event-listener';
import { isNullOrUndefined, isNumber } from 'tns-core-modules/utils/types';

export class CarouselUtil {
  public static debug: boolean = false;
}

export enum CLogTypes {
  info,
  warning,
  error
}

export const CLog = (type: CLogTypes = 0, ...args) => {
  if (CarouselUtil.debug) {
    if (type === 0) {
      // Info
      console.log('NativeScript-Carousel: INFO', args);
    } else if (type === 1) {
      // Warning
      console.log('NativeScript-Carousel: WARNING', args);
    } else if (type === 2) {
      console.log('NativeScript-Carousel: ERROR', args);
    }
  }
};

export class CarouselCommon extends ContentView {
  /**
   * If true console logs will be output to help debug the Video events.
   */
  public set debug(value: boolean) {
    CarouselUtil.debug = value;
  }

  constructor() {
    super();
  }
}

export class CarouselItem extends View {
  public static pageChangedEvent = 'pageChanged';
  public static pageTappedEvent = 'pageTapped';
  public static pageScrollingEvent = 'pageScrolling';
  public static pageScrollStateChangedEvent = 'pageScrolled';

  constructor() {
    super();
  }

  onLoaded() {
    super.onLoaded.call(this);
  }
}

// Common
export const itemTemplateProperty = new Property({
  name: 'itemTemplate',
  affectsLayout: true,
  valueChanged: (view, oldValue, newValue) => {
    view.refresh();
  }
});
itemTemplateProperty.register(CarouselCommon);

export const itemsProperty = new Property({
  name: 'items',
  affectsLayout: true,
  valueChanged: (target, oldValue, newValue) => {
    if (oldValue instanceof ObservableArray) {
      removeWeakEventListener(oldValue, ObservableArray.changeEvent, target._onItemsChanged, target);
    }
    if (newValue instanceof ObservableArray) {
      addWeakEventListener(newValue, ObservableArray.changeEvent, target._onItemsChanged, target);
    }
    if (!isNullOrUndefined(target.items) && isNumber(target.items.length)) {
      target.refresh();
    }
  }
});
itemsProperty.register(CarouselCommon);

export const selectedPageProperty = new Property({
  name: 'selectedPage',
  defaultValue: 0,
  valueConverter: value => {
    return +value;
  },
  valueChanged: (view, oldValue, newValue) => {
    view.selectedPage = newValue;
  }
});
selectedPageProperty.register(CarouselCommon);

export const showIndicatorProperty = new Property({
  name: 'showIndicator',
  defaultValue: true,
  valueConverter: booleanConverter,
  valueChanged: (view, oldValue, newValue) => {
    view.showIndicator = newValue;
  }
});
showIndicatorProperty.register(CarouselCommon);

export const indicatorColorProperty = new Property({
  name: 'indicatorColor',
  equalityComparer: Color.equals,
  valueConverter: value => {
    return new Color(value);
  },
  valueChanged: (view, oldValue, newValue) => {
    view.indicatorColor = newValue;
  }
});
indicatorColorProperty.register(CarouselCommon);

export const indicatorColorUnselectedProperty = new Property({
  name: 'indicatorColorUnselected',
  equalityComparer: Color.equals,
  valueConverter: value => {
    return new Color(value);
  },
  valueChanged: (view, oldValue, newValue) => {
    view.indicatorColorUnselected = newValue;
  }
});
indicatorColorUnselectedProperty.register(CarouselCommon);

export const indicatorOffsetProperty = new Property({
  name: 'indicatorOffset',
  defaultValue: '0,0',
  valueChanged: (view, oldValue, newValue) => {
    view.indicatorOffset = newValue;
  }
});
indicatorOffsetProperty.register(CarouselCommon);

// iOS only
export const autoPagingIntervalProperty = new Property({
  name: 'autoPagingInterval',
  defaultValue: 0,
  valueConverter: value => {
    return +value;
  },
  valueChanged: (view, oldValue, newValue) => {
    view.autoPagingInterval = newValue;
  }
});
autoPagingIntervalProperty.register(CarouselCommon);

export const finiteProperty = new Property({
  name: 'finite',
  valueConverter: booleanConverter,
  valueChanged: (view, oldValue, newValue) => {
    view.finite = newValue;
  }
});
finiteProperty.register(CarouselCommon);

export const bounceProperty = new Property({
  name: 'bounce',
  valueConverter: booleanConverter,
  valueChanged: (view, oldValue, newValue) => {
    view.bounce = newValue;
  }
});
bounceProperty.register(CarouselCommon);

export const scrollEnabledProperty = new Property({
  name: 'scrollEnabled',
  valueConverter: booleanConverter,
  valueChanged: (view, oldValue, newValue) => {
    view.scrollEnabled = newValue;
  }
});
scrollEnabledProperty.register(CarouselCommon);

// Android only
export const indicatorAnimationProperty = new Property({
  name: 'indicatorAnimation',
  affectsLayout: true,
  valueChanged: (view, oldValue, newValue) => {
    view.indicatorAnimation = newValue;
  }
});
indicatorAnimationProperty.register(CarouselCommon);

export const indicatorAnimationDurationProperty = new Property({
  name: 'indicatorAnimationDuration',
  affectsLayout: true,
  valueConverter: value => {
    return +value;
  },
  valueChanged: (view, oldValue, newValue) => {
    view.indicatorAnimationDuration = newValue;
  }
});
indicatorAnimationDurationProperty.register(CarouselCommon);

export const indicatorAlignmentProperty = new Property({
  name: 'indicatorAlignment',
  defaultValue: 'BOTTOM',
  valueChanged: (view, oldValue, newValue) => {
    view.indicatorAlignment = newValue.toUpperCase();
  }
});
indicatorAlignmentProperty.register(CarouselCommon);

export const indicatorRadiusProperty = new Property({
  name: 'indicatorRadius',
  affectsLayout: true,
  valueConverter: value => {
    return +value;
  },
  valueChanged: (view, oldValue, newValue) => {
    view.indicatorRadius = newValue;
  }
});
indicatorRadiusProperty.register(CarouselCommon);

export const indicatorPaddingProperty = new Property({
  name: 'indicatorPadding',
  affectsLayout: true,
  valueConverter: value => {
    return +value;
  },
  valueChanged: (view, oldValue, newValue) => {
    view.indicatorPadding = newValue;
  }
});
indicatorPaddingProperty.register(CarouselCommon);
