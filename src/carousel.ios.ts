import { Application, Builder, Enums, Screen, Utils } from '@nativescript/core';
import {
  autoPagingIntervalProperty,
  bounceProperty,
  CarouselCommon,
  CarouselItem,
  CarouselUtil,
  finiteProperty,
  indicatorColorProperty,
  indicatorColorUnselectedProperty,
  indicatorOffsetProperty,
  Log,
  scrollEnabledProperty,
  selectedPageProperty,
  showIndicatorProperty,
} from './carousel.common';
export * from './carousel.common';

export class Carousel extends CarouselCommon {
  public nativeView;
  public items;
  public itemTemplate;
  public selectedPage;
  private _isDirty: boolean;
  private currentOrientation: string;

  constructor() {
    super();
    CarouselUtil.debug = this.debug;

    this.currentOrientation = Enums.DeviceOrientation.unknown;
    Application.on('orientationChanged', this.onOrientationChanged);
  }

  [autoPagingIntervalProperty.setNative](value) {
    if (this.nativeView instanceof DKCarouselView) {
      this.nativeView.setAutoPagingForInterval(value);
    }
  }

  [selectedPageProperty.setNative](value) {
    this.selectedPage = value;
    this.nativeView.selectedPage = value;
  }

  [showIndicatorProperty.setNative](value) {
    this.nativeView.indicatorIsVisible = value;
  }

  [finiteProperty.setNative](value) {
    this.nativeView.finite = value;
  }

  [bounceProperty.setNative](value) {
    this.nativeView.bounce = value;
  }

  [scrollEnabledProperty.setNative](value) {
    this.nativeView.scrollEnabled = value;
  }

  [indicatorColorProperty.setNative](value) {
    this.nativeView.indicatorTintColor = value ? value.ios : '#fff';
  }

  [indicatorColorUnselectedProperty.setNative](value) {
    this.nativeView.indicatorTintColorUnselected = value.ios;
  }

  [indicatorOffsetProperty.setNative](value) {
    const ar = value.split(',');
    const x = ar[0] ? ar[0] : 0;
    const y = ar[1] ? ar[1] : 0;
    this.nativeView.indicatorOffset = CGPointMake(x, y);
  }

  createNativeView() {
    const viewWidth = this.getActualSize().width === 0 ? Screen.mainScreen.widthDIPs : this.getActualSize().width;
    const viewHeight = this.getActualSize().height === 0 ? Screen.mainScreen.heightDIPs : this.getActualSize().height;
    Log.D('createNativeView size', viewWidth, viewHeight);

    this.nativeView = DKCarouselView.alloc().initWithFrame(CGRectMake(0, 0, viewWidth, viewHeight));
    Log.D('createNativeView', this.nativeView);
    return this.nativeView;
  }

  initNativeView() {
    const nativeView = this.nativeView;
    this._isDirty = true;

    nativeView.setDidSelectBlock((item, index) => {
      const data = {
        eventName: CarouselCommon.pageTappedEvent,
        object: this,
        view: item,
        index: index,
      };
      this.notify(data);
    });

    nativeView.setDidChangeBlock((view, index) => {
      const data = {
        eventName: CarouselCommon.pageChangedEvent,
        object: this,
        view: view,
        index: index,
      };
      this.selectedPage = index;
      this.notify(data);
    });

    nativeView.setDidScrollBlock((view, offset) => {
      const data = {
        eventName: CarouselCommon.pageScrollingEvent,
        object: this,
        view: view,
        state: {
          offset: offset,
        },
      };
      this.notify(data);
    });

    Log.D('initNativeView', this.nativeView);
  }

  disposeNativeView() {
    const nativeView = this.nativeView;
    nativeView.setDidChangeBlock(null);
    nativeView.setDidScrollBlock(null);
    nativeView.setDidSelectBlock(null);
    nativeView.setItems(NSMutableArray.new());
    this.removeChildren();
  }

  onLoaded() {
    super.onLoaded();

    if (this._isDirty) {
      this.refresh();
      Log.D(`onLoaded()`);
    }
  }

  onOrientationChanged = (evt) => {
    Log.D(`OrientationChanged to `, evt.newValue);
    if (this.currentOrientation != evt.newValue) {
      this.currentOrientation = evt.newValue;
      this.refresh();
    }
  };

  refresh() {
    Log.D(`refresh()`);
    if (!this.isLoaded || !this.nativeView) {
      this._isDirty = true;
      return;
    }

    this._isDirty = false;
    this.nativeView.setItems(NSMutableArray.new());

    if (Utils.isNullOrUndefined(this.itemTemplate)) {
      Log.D(`Using generic-mode`);
      const nsArray = NSMutableArray.new();
      Log.D(`children count: `, this.getChildrenCount());
      this.eachChildView((staticView) => {
        if (staticView instanceof CarouselItem) {
          staticView.width = this.width;
          staticView.height = this.height;
          const dkCarouselViewItem1 = new DKCarouselViewItem();
          dkCarouselViewItem1.view = staticView.ios;
          nsArray.addObject(dkCarouselViewItem1);
        }
        return true;
      });
      this.nativeView.setItems(nsArray);
      Log.D(`items set: `, nsArray.count);
    } else {
      Log.D(`Using template-mode`);
      if (Utils.isNullOrUndefined(this.items)) {
        Log.D(`Items list is null...`);
        return;
      }

      this.removeChildren();
      const nsArray = NSMutableArray.new();
      const length = this.items.length;
      Log.D(`items length: `, length);

      for (let i = 0; i < length; i++) {
        const viewToAdd = !Utils.isNullOrUndefined(this.itemTemplate) ? Builder.parse(this.itemTemplate, this) : null;
        if (!viewToAdd) continue;
        const dataItem = this._getDataItem(i);
        viewToAdd.bindingContext = dataItem;
        this.addChild(viewToAdd);
      }

      this.eachChildView((view) => {
        if (view instanceof CarouselItem) {
          view.width = this.width;
          view.height = this.height;
          const dkCarouselViewItem = new DKCarouselViewItem();
          dkCarouselViewItem.view = view.ios;
          nsArray.addObject(dkCarouselViewItem);
        }
        return true;
      });
      this.nativeView.setItems(nsArray);
      Log.D(`items set: `, nsArray.count);
    }
  }

  public onItemsChanged(data) {
    Log.D('onItemsChanged', data);
    if (!Utils.isNullOrUndefined(this.items) && Utils.isNumber(this.items.length)) {
      this.refresh();
    }
  }

  private _getDataItem(index) {
    return this.items.getItem ? this.items.getItem(index) : this.items[index];
  }
}
