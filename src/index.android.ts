/// <reference path="./node_modules/tns-platform-declarations/android.d.ts" />

import * as builder from 'tns-core-modules/ui/builder';
import { View } from 'tns-core-modules/ui/core/view';
import { GridLayout } from 'tns-core-modules/ui/layouts/grid-layout';
import { isNullOrUndefined, isNumber } from 'tns-core-modules/utils/types';
import {
  CLog,
  CLogTypes,
  CarouselCommon,
  CarouselItem,
  indicatorAnimationDurationProperty,
  indicatorAnimationProperty,
  indicatorColorProperty,
  indicatorColorUnselectedProperty,
  indicatorPaddingProperty,
  indicatorRadiusProperty,
  selectedPageProperty
} from './index-common';

const VIEWS_STATES = '_viewStates';
declare const com: any;

export class Carousel extends CarouselCommon {
  public items;
  public itemTemplate;
  public showIndicator: boolean;
  public indicatorOffset;
  public indicatorAlignment;
  public selectedPage;
  public _childrenCount;
  private _androidViewId = -1;
  private _indicatorViewId = -1;
  private _pageIndicatorView;
  private _pagerIndicatorLayoutParams;
  public CarouselPagerAdapterClass: CarouselPagerAdapterClassInner;
  public CarouselPageChangedListenerClass: CarouselPageChangedListener;

  constructor() {
    super();
    CLog(CLogTypes.info, 'Carousel constructor...');

    this.CarouselPagerAdapterClass = new CarouselPagerAdapterClassInner().onInit(new WeakRef(this));
    this.CarouselPageChangedListenerClass = new CarouselPageChangedListener().onInit(new WeakRef(this));

    CLog(
      CLogTypes.info,
      `this.CarouselPagerAdapterClass = ${this.CarouselPagerAdapterClass}`,
      `this.CarouselPageChangedListenerClass = ${this.CarouselPageChangedListenerClass}`
    );
  }

  get android(): any {
    return this.nativeView;
  }

  [indicatorColorProperty.setNative](value) {
    CLog(CLogTypes.info, `indicatorColorProperty.setNative value = ${value}`);
    if (!value) {
      return;
    }
    this._pageIndicatorView.setSelectedColor(value.android);
  }

  [indicatorColorUnselectedProperty.setNative](value) {
    CLog(CLogTypes.info, `indicatorColorUnselectedProperty.setNative value = ${value}`);
    if (!value) {
      return;
    }
    this._pageIndicatorView.setUnselectedColor(value.android);
  }

  [selectedPageProperty.setNative](value) {
    CLog(CLogTypes.info, `selectedPageProperty.setNative value = ${value}`);
    this.selectedPage = value;
    this.nativeView.setCurrentItem(value);
  }

  [indicatorAnimationProperty.setNative](value) {
    CLog(CLogTypes.info, `indicatorAnimationProperty.setNative value = ${value}`);

    if (!value) {
      return;
    }
    let animationType = com.rd.animation.type.AnimationType.NONE;
    switch (value.toUpperCase()) {
      case 'NONE':
        animationType = com.rd.animation.type.AnimationType.NONE;
        break;
      case 'COLOR':
        animationType = com.rd.animation.type.AnimationType.COLOR;
        break;
      case 'SLIDE':
        animationType = com.rd.animation.type.AnimationType.SLIDE;
        break;
      case 'WORM':
        animationType = com.rd.animation.type.AnimationType.WORM;
        break;
      case 'SCALE':
        animationType = com.rd.animation.type.AnimationType.SCALE;
        break;
      case 'FILL':
        animationType = com.rd.animation.type.AnimationType.FILL;
        break;
      case 'THIN_WORM':
        animationType = com.rd.animation.type.AnimationType.THIN_WORM;
        break;
      case 'DROP':
        animationType = com.rd.animation.type.AnimationType.DROP;
        break;
      case 'SWAP':
        animationType = com.rd.animation.type.AnimationType.SWAP;
        break;
      default:
        animationType = com.rd.animation.type.AnimationType.NONE;
        break;
    }
    if (this._pageIndicatorView) {
      this._pageIndicatorView.setAnimationType(animationType);
    }
  }

  [indicatorAnimationDurationProperty.setNative](value) {
    CLog(CLogTypes.info, `indicatorAnimationDurationProperty.setNative value = ${value}`);

    if (!value) {
      return;
    }
    if (this._pageIndicatorView) {
      this._pageIndicatorView.setAnimationDuration(value);
    }
  }

  [indicatorRadiusProperty.setNative](value) {
    CLog(CLogTypes.info, `indicatorRadiusProperty.setNative value = ${value}`);
    if (!value) {
      return;
    }
    if (this._pageIndicatorView) {
      this._pageIndicatorView.setRadius(value);
    }
  }

  [indicatorPaddingProperty.setNative](value) {
    CLog(CLogTypes.info, `indicatorPaddingProperty.setNative value = ${value}`);
    if (!value) {
      return;
    }
    if (this._pageIndicatorView) {
      this._pageIndicatorView.setPadding(value);
    }
  }

  createNativeView() {
    CLog(CLogTypes.info, `Carousel createNativeView`);

    if (this._androidViewId < 0) {
      this._androidViewId = android.view.View.generateViewId();
    }
    CLog(CLogTypes.info, `this._androidViewId = ${this._androidViewId}`);

    if (this._indicatorViewId < 0) {
      this._indicatorViewId = android.view.View.generateViewId();
    }
    CLog(CLogTypes.info, `this._indicatorViewId = ${this._indicatorViewId}`);

    this.nativeView = new android.support.v4.view.ViewPager(this._context);
    this.nativeView.setId(this._androidViewId);
    CLog(CLogTypes.info, `this.nativeView = ${this.nativeView}`);

    this._pageIndicatorView = new com.rd.PageIndicatorView(this._context);
    this._pageIndicatorView.setId(this._indicatorViewId);
    this._pagerIndicatorLayoutParams = new org.nativescript.widgets.CommonLayoutParams();
    CLog(CLogTypes.info, `this._pageIndicatorView = ${this._pageIndicatorView}`);

    this.nativeView.setAdapter(this.CarouselPagerAdapterClass);

    this.nativeView.setOnPageChangeListener(this.CarouselPageChangedListenerClass);

    CLog(CLogTypes.info, `returning this.nativeView`);
    return this.nativeView;
  }

  onLoaded() {
    if (this.showIndicator !== false) {
      this._pagerIndicatorLayoutParams.height = android.support.v4.view.ViewPager.LayoutParams.WRAP_CONTENT;
      this._pagerIndicatorLayoutParams.width = android.support.v4.view.ViewPager.LayoutParams.MATCH_PARENT;

      const ar = this.indicatorOffset.split(',');
      const x = ar[0] ? Number(ar[0]) : 0;
      const y = ar[1] ? Number(ar[1]) : 0;

      const defaultVerticalMargin = 50;
      const verticalOffset = defaultVerticalMargin + (y < 0 ? Math.abs(y) : -Math.abs(y)); // Reverse +- to be the same as ios
      const horizontalOffset = x;

      if (this.indicatorAlignment === 'TOP') {
        this._pagerIndicatorLayoutParams.setMargins(horizontalOffset, verticalOffset, 0, 0);
        this._pagerIndicatorLayoutParams.gravity = android.view.Gravity.TOP | android.view.Gravity.CENTER;
      } else {
        this._pagerIndicatorLayoutParams.setMargins(horizontalOffset, 0, 0, verticalOffset);
        this._pagerIndicatorLayoutParams.gravity = android.view.Gravity.BOTTOM | android.view.Gravity.CENTER;
      }

      if (this._pageIndicatorView.getParent()) {
        this.parent.android.removeView(this._pageIndicatorView);
      }

      if (this.parent instanceof GridLayout) {
        this.parent.android.addView(this._pageIndicatorView, this._pagerIndicatorLayoutParams);
      } else {
        this.parent.android.addView(this._pageIndicatorView);
      }

      this._pageIndicatorView.setViewPager(this.nativeView);
      this._pageIndicatorView.setCount(this._childrenCount);
      this._pageIndicatorView.setSelection(this.selectedPage);
    }

    // is this right call?
    super.onLoaded.call(this);
  }

  initNativeView() {
    this.refresh();
  }

  refresh() {
    CLog(CLogTypes.info, `refresh...`);
    if (isNullOrUndefined(this.items) || !isNumber(this.items.length)) {
      return;
    }
    if (!this.nativeView) {
      return;
    }

    this.removeChildren();

    const length = this.items.length;
    for (let i = 0; i < length; i++) {
      const viewToAdd = !isNullOrUndefined(this.itemTemplate)
        ? builder.parse(this.itemTemplate, this)
        : this._getDefaultItemContent(i);
      const dataItem = this._getDataItem(i);
      viewToAdd.bindingContext = dataItem;
      this.addChild(viewToAdd);
    }

    // get the adapter
    const adapter = this.nativeView.getAdapter();
    if (adapter) {
      adapter.notifyDataSetChanged();
      this._pageIndicatorView.setCount(this.items.length);
      this.nativeView.setCurrentItem(this.selectedPage);
      this._pageIndicatorView.setSelection(this.selectedPage);
    }
  }

  public onLayout(left, top, right, bottom) {
    CLog(CLogTypes.info, `onLayout...`);
    View.layoutChild(this, this, 0, 0, right - left, bottom - top);
  }

  private _getDataItem(index) {
    CLog(CLogTypes.info, `_getDataItem...`);
    return this.items.getItem ? this.items.getItem(index) : this.items[index];
  }

  private _onItemsChanged(data) {
    CLog(CLogTypes.info, `_onItemsChanged...`);
    this.refresh();
  }
}

let knownTemplates;
(function(knownTemplates) {
  knownTemplates.itemTemplate = 'itemTemplate';
})((knownTemplates = exports.knownTemplates || (exports.knownTemplates = {})));

class CarouselPagerAdapterClassInner extends android.support.v4.view.PagerAdapter {
  private owner: WeakRef<Carousel>;
  constructor() {
    super();
    return global.__native(this);
  }

  onInit(owner: WeakRef<Carousel>) {
    this.owner = owner;
    return this;
  }

  getCount() {
    CLog(CLogTypes.info, `CarouselPagerAdapterClassInner getCount...`);
    if (isNullOrUndefined(this.owner.get().items) || !isNumber(this.owner.get().items.length)) {
      return this.owner ? this.owner.get()._childrenCount : 0;
    } else {
      return this.owner ? this.owner.get().items.length : 0;
    }
  }

  getItemPosition(item) {
    CLog(CLogTypes.info, `CarouselPagerAdapterClassInner getItemPosition...`);
    return android.support.v4.view.PagerAdapter.POSITION_NONE;
  }

  isViewFromObject(view, _object) {
    CLog(CLogTypes.info, `CarouselPagerAdapterClassInner isViewFromObject...`);
    return view === _object;
  }

  instantiateItem(container, index) {
    CLog(CLogTypes.info, `CarouselPagerAdapterClassInner instantiateItem...`);
    const item = this.owner.get().getChildAt(index);
    if (!item) {
      return null;
    }

    if (item.parent !== this.owner) {
      this.owner.get().addChild(item);
    } else {
      item.parent.android.removeView(item.android);
    }

    if (this[VIEWS_STATES]) {
      item.nativeView.restoreHierarchyState(this[VIEWS_STATES]);
    }

    container.addView(
      item.nativeView,
      android.view.ViewGroup.LayoutParams.MATCH_PARENT,
      android.view.ViewGroup.LayoutParams.MATCH_PARENT
    );
    return item.nativeView;
  }

  destroyItem(container, index, _object) {
    CLog(CLogTypes.info, `CarouselPagerAdapterClassInner destroyItem...`);
    const item = this.owner.get().getChildAt(index);
    if (!item) {
      return null;
    }

    const nativeView = item.nativeView;
    container.removeView(nativeView);
  }

  saveState() {
    CLog(CLogTypes.info, `CarouselPagerAdapterClassInner saveState...`);
    if (!this[VIEWS_STATES]) {
      this[VIEWS_STATES] = new android.util.SparseArray();
    }
    const mViewStates = this[VIEWS_STATES];
    const mViewPager = this.owner.get().android;
    const count = mViewPager.getChildCount();

    for (let i = 0; i < count; i++) {
      const c = mViewPager.getChildAt(i);
      if (c.isSaveFromParentEnabled()) {
        c.saveHierarchyState(mViewStates);
      }
    }

    const bundle = new android.os.Bundle();
    bundle.putSparseParcelableArray(VIEWS_STATES, mViewStates);
    return bundle;
  }

  restoreState(state, loader) {
    CLog(CLogTypes.info, `CarouselPagerAdapterClassInner restoreState...`);
    const bundle = state;
    bundle.setClassLoader(loader);
    this[VIEWS_STATES] = bundle.getSparseParcelableArray(VIEWS_STATES);
  }
}

class CarouselPageChangedListener extends android.support.v4.view.ViewPager.SimpleOnPageChangeListener {
  private owner: WeakRef<Carousel>;
  constructor() {
    super();
    return global.__native(this);
  }

  onInit(owner: WeakRef<Carousel>) {
    this.owner = owner;
    return this;
  }

  onPageSelected(position) {
    CLog(CLogTypes.info, `CarouselPageChangedListener onPageSelected...`);
    this.owner.get().notify({
      eventName: CarouselItem.pageChangedEvent,
      object: this.owner.get(),
      index: position
    });
    this.owner.get().selectedPage = position;
  }

  onPageScrollStateChanged(state) {
    CLog(CLogTypes.info, `CarouselPageChangedListener onPageScrollStateChanged...`);
    this.owner.get().notify({
      eventName: CarouselItem.pageScrollStateChangedEvent,
      object: this.owner.get(),
      state: state
    });
  }

  onPageScrolled(position, positionOffset, positionOffsetPixels) {
    CLog(CLogTypes.info, `CarouselPageChangedListener onPageScrolled...`);
    const data = {
      eventName: CarouselItem.pageScrollingEvent,
      object: this.owner.get(),
      state: {
        offset: positionOffset,
        android: {
          position: position,
          positionOffset: positionOffset,
          positionOffsetPixels: positionOffsetPixels
        }
      }
    };
    this.owner.get().notify(data);
  }
}
