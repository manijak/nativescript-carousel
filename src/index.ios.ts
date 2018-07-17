/// <reference path="./node_modules/tns-platform-declarations/ios.d.ts" />

import { screen } from 'tns-core-modules/platform';
import * as builder from 'tns-core-modules/ui/builder';
import { isNullOrUndefined, isNumber } from 'utils/types';
import {
  autoPagingIntervalProperty,
  bounceProperty,
  CarouselCommon,
  CarouselItem,
  finiteProperty,
  indicatorColorProperty,
  indicatorColorUnselectedProperty,
  indicatorOffsetProperty,
  scrollEnabledProperty,
  selectedPageProperty,
  showIndicatorProperty
} from './index-common';

export class Carousel extends CarouselCommon {
  public nativeView;
  public items;
  public itemTemplate;
  public selectedPage;
  private _isDirty: boolean;
  constructor() {
    super();
  }

  get ios(): any {
    return this.nativeView;
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
    this.nativeView = new DKCarouselView(CGRectMake(0, 0, screen.mainScreen.widthDIPs, 0));
    return this.nativeView;
  }

  initNativeView() {
    const nativeView = this.nativeView;
    this._isDirty = true;

    nativeView.setDidSelectBlock((item, index) => {
      const data = {
        eventName: CarouselItem.pageTappedEvent,
        object: this,
        view: item,
        index: index
      };
      this.notify(data);
    });

    nativeView.setDidChangeBlock((view, index) => {
      const data = {
        eventName: CarouselItem.pageChangedEvent,
        object: this,
        view: view,
        index: index
      };
      this.selectedPage = index;
      this.notify(data);
    });

    nativeView.setDidScrollBlock((view, offset) => {
      const data = {
        eventName: CarouselItem.pageScrollingEvent,
        object: this,
        view: view,
        state: {
          offset: offset
        }
      };
      this.notify(data);
    });
  }

  disposeNativeView() {
    const nativeView = this.nativeView;
    nativeView.setDidChangeBlock(null);
    nativeView.setDidScrollBlock(null);
    nativeView.setDidSelectBlock(null);
    nativeView.setItems(new NSMutableArray());
    this.removeChildren();
  }

  onLoaded() {
    super.onLoaded.call(this);
    if (this._isDirty) {
      this.refresh();
    }
  }

  refresh() {
    if (!this.isLoaded || !this.nativeView) {
      this._isDirty = true;
      return;
    }
    this._isDirty = false;
    this.nativeView.setItems(new NSMutableArray());
    if (isNullOrUndefined(this.items) || !isNumber(this.items.length)) {
      const nsArray = new NSMutableArray();
      this.eachChildView(view1 => {
        if (view1 instanceof CarouselItem) {
          view1.width = 100;
          view1.height = 100;
          const dkCarouselViewItem1 = new DKCarouselViewItem();
          dkCarouselViewItem1.view = view1.ios;
          nsArray.addObject(dkCarouselViewItem1);
        }
        return true;
      });
      this.nativeView.setItems(nsArray);
    } else {
      this.removeChildren();
      const nsArray = new NSMutableArray();
      const length = this.items.length;
      for (let i = 0; i < length; i++) {
        const viewToAdd = !isNullOrUndefined(this.itemTemplate) ? builder.parse(this.itemTemplate, this) : null;
        if (!viewToAdd) continue;
        const dataItem = this._getDataItem(i);
        viewToAdd.bindingContext = dataItem;
        this.addChild(viewToAdd);
      }
      this.eachChildView(view => {
        if (view instanceof CarouselItem) {
          view.width = 100;
          view.height = 100;
          const dkCarouselViewItem = new DKCarouselViewItem();
          dkCarouselViewItem.view = view.ios;
          nsArray.addObject(dkCarouselViewItem);
        }
        return true;
      });
      this.nativeView.setItems(nsArray);
    }
  }

  private _getDataItem(index) {
    return this.items.getItem ? this.items.getItem(index) : this.items[index];
  }
  private _onItemsChanged(data) {
    if (!isNullOrUndefined(this.items) && isNumber(this.items.length)) {
      this.refresh();
    }
  }
}

let knownTemplates;
(function(knownTemplates) {
  knownTemplates.itemTemplate = 'itemTemplate';
})((knownTemplates = exports.knownTemplates || (exports.knownTemplates = {})));
