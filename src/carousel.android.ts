import { Builder, GridLayout, Utils, View } from '@nativescript/core';
import {
  CarouselCommon,
  CarouselUtil,
  indicatorAnimationDurationProperty,
  indicatorAnimationProperty,
  indicatorColorProperty,
  indicatorColorUnselectedProperty,
  indicatorPaddingProperty,
  indicatorRadiusProperty,
  Log,
  selectedPageProperty,
} from './carousel.common';

const VIEWS_STATES = '_viewStates';
const PagerNamespace = androidx.viewpager.widget;
const POSITION_UNCHANGED = -1;
const POSITION_NONE = -2;
declare const global, com: any;

export * from './carousel.common';

export class Carousel extends CarouselCommon {
  private _androidViewId = -1;
  private _indicatorViewId = -1;
  private _pageIndicatorView;
  private _pagerIndicatorLayoutParams;
  public _childrenCount; // public so it's accessible inside extended classes using WeakRef
  public CarouselPagerAdapterClass: CarouselPagerAdapterClassInner;
  public CarouselPageChangedListenerClass: CarouselPageChangedListener;

  constructor() {
    super();
    CarouselUtil.debug = this.debug;
    Log.D('Carousel constructor');

    this.CarouselPagerAdapterClass = new CarouselPagerAdapterClassInner(new WeakRef(this));
    this.CarouselPageChangedListenerClass = new CarouselPageChangedListener(new WeakRef(this));

    Log.D(
      `this.CarouselPagerAdapterClass = ${this.CarouselPagerAdapterClass}`,
      `this.CarouselPageChangedListenerClass = ${this.CarouselPageChangedListenerClass}`
    );
  }

  /**
   * Returns androidx.viewpager.widget.PagerAdapter on AndroidX enabled apps.
   * Returns android.support.v4.view.PagerAdapter on non androidX apps.
   */
  get adapter(): androidx.viewpager.widget.PagerAdapter {
    return this.nativeView.getAdapter();
  }

  set pageIndicatorCount(value: number) {
    if (value) {
      this.adapter.notifyDataSetChanged();
      this._pageIndicatorView.setCount(value);
    }
  }

  [indicatorColorProperty.setNative](value) {
    Log.D(`indicatorColorProperty.setNative value = ${value}`);
    if (!value) {
      return;
    }
    this._pageIndicatorView.setSelectedColor(value.android);
  }

  [indicatorColorUnselectedProperty.setNative](value) {
    Log.D(`indicatorColorUnselectedProperty.setNative value = ${value}`);
    if (!value) {
      return;
    }
    this._pageIndicatorView.setUnselectedColor(value.android);
  }

  [selectedPageProperty.setNative](value) {
    Log.D(`selectedPageProperty.setNative value = ${value}`);
    this.selectedPage = value;
    this.nativeView.setCurrentItem(value);
  }

  [indicatorAnimationProperty.setNative](value) {
    Log.D(`indicatorAnimationProperty.setNative value = ${value}`);

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
      // case 'SCALE_DOWN':
      //   animationType = com.rd.animation.type.AnimationType.SCALE_DOWN;
      //   break;
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
    Log.D(`indicatorAnimationDurationProperty.setNative value = ${value}`);

    if (!value) {
      return;
    }
    if (this._pageIndicatorView) {
      this._pageIndicatorView.setAnimationDuration(value);
    }
  }

  [indicatorRadiusProperty.setNative](value) {
    Log.D(`indicatorRadiusProperty.setNative value = ${value}`);
    if (!value) {
      return;
    }
    if (this._pageIndicatorView) {
      this._pageIndicatorView.setRadius(value);
    }
  }

  [indicatorPaddingProperty.setNative](value) {
    Log.D(`indicatorPaddingProperty.setNative value = ${value}`);
    if (!value) {
      return;
    }
    if (this._pageIndicatorView) {
      this._pageIndicatorView.setPadding(value);
    }
  }

  createNativeView() {
    Log.D(`createNativeView`);

    if (this._androidViewId < 0) {
      this._androidViewId = android.view.View.generateViewId();
    }

    if (this._indicatorViewId < 0) {
      this._indicatorViewId = android.view.View.generateViewId();
    }

    this.nativeView = new PagerNamespace.ViewPager(this._context);
    this.nativeView.setId(this._androidViewId);
    Log.D(`this.nativeView = ${this.nativeView}`);

    this._pageIndicatorView = new com.rd.PageIndicatorView(this._context);
    this._pageIndicatorView.setId(this._indicatorViewId);
    this._pagerIndicatorLayoutParams = new org.nativescript.widgets.CommonLayoutParams();

    this.nativeView.setAdapter(this.CarouselPagerAdapterClass);
    this.nativeView.setOnPageChangeListener(this.CarouselPageChangedListenerClass);
    return this.nativeView;
  }

  onLoaded() {
    super.onLoaded();
    Log.D(`onLoaded`);

    if (this.showIndicator !== false) {
      this._pagerIndicatorLayoutParams.height = -2; // PagerNamespace.ViewPager.LayoutParams.WRAP_CONTENT;
      this._pagerIndicatorLayoutParams.width = -1; // PagerNamespace.ViewPager.LayoutParams.MATCH_PARENT;

      const ar = this.indicatorOffset.split(',');
      const x = ar[0] ? Number(ar[0]) : 0;
      const y = ar[1] ? Number(ar[1]) : 0;

      const defaultVerticalMargin = 25;
      const verticalOffset = Utils.layout.toDevicePixels(defaultVerticalMargin + (y < 0 ? Math.abs(y) : -Math.abs(y))); // Reverse +- to be the same as ios
      const horizontalOffset = Utils.layout.toDevicePixels(x);

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
  }

  initNativeView() {
    Log.D(`initNativeView`);
    this.refresh();
  }

  getItemCount(): number {
    let itemCount: number;
    if (!Utils.isNullOrUndefined(this.items) && Utils.isNumber(this.items.length)) {
      itemCount = this.items.length;
    } else {
      itemCount = this.getChildrenCount();
    }
    return itemCount;
  }

  refresh() {
    Log.D(`refresh()`);
    if (!this.nativeView) {
      return;
    }

    let itemsCount = this.getItemCount();
    Log.D(`Items count: `, itemsCount);
    if (Utils.isNullOrUndefined(itemsCount)) {
      return;
    }

    // Using 'items' property and 'itemTemplate' to populate Carousel. Remove all parent children first then add all items.
    if (!Utils.isNullOrUndefined(this.itemTemplate)) {
      Log.D(`Using template mode`);
      this.removeChildren();
      for (let i = 0; i < itemsCount; i++) {
        const viewToAdd = !Utils.isNullOrUndefined(this.itemTemplate)
          ? Builder.parse(this.itemTemplate, this)
          : this._getDefaultItemContent(i);
        const dataItem = this._getDataItem(i);
        viewToAdd.bindingContext = dataItem;
        this.addChild(viewToAdd);
      }
    }

    // Notify adapter and indicatorView that items have changed.
    if (this.adapter) {
      Log.D(`notifyDataSetChanged`);
      this.adapter.notifyDataSetChanged();
      this.nativeView.setCurrentItem(this.selectedPage);
      this._pageIndicatorView.setCount(itemsCount);
      this._pageIndicatorView.setSelection(this.selectedPage);
    }

    if (Utils.isNullOrUndefined(this.itemTemplate)) {
      Log.D(`setOffscreenPageLimit`);
      this.nativeView.setOffscreenPageLimit(itemsCount);
    }
  }

  public onLayout(left, top, right, bottom) {
    View.layoutChild(this, this, 0, 0, right - left, bottom - top);
  }

  private _getDataItem(index) {
    return this.items.getItem ? this.items.getItem(index) : this.items[index];
  }

  public onItemsChanged(data) {
    Log.D(`_onItemsChanged()`, data);
    this.refresh();
  }
}

@NativeClass()
class CarouselPagerAdapterClassInner extends PagerNamespace.PagerAdapter {
  private owner: WeakRef<Carousel>;
  constructor(owner: WeakRef<Carousel>) {
    super();
    this.owner = owner;
    return global.__native(this);
  }

  getCount(): number {
    return this.owner.get().getItemCount();
  }

  getItemPosition(item) {
    return POSITION_NONE;
  }

  isViewFromObject(view, _object) {
    return view === _object;
  }

  instantiateItem(container: androidx.viewpager.widget.ViewPager, index: number) {
    Log.D(`-------> CarouselPagerAdapter instantiateItem()`, index);
    Log.D(`-------> PagerAdapter: Collection count: `, container.getChildCount());
    Log.D(`-------> PagerAdapter: Carousel count: `, this.owner.get().getChildrenCount());
    Log.D(`-------> PagerAdapter: Items count: `, this.getCount());

    const item = this.owner.get().getChildAt(index);
    if (Utils.isNullOrUndefined(item)) {
      Log.D(`-------> PagerAdapter: Could not find Carousel(Grid) child item at index: `, index);
      return null;
    }

    if (item.parent !== this.owner.get()) {
      this.owner.get().addChild(item);
    } else {
      item.parent.android.removeView(item.android);
    }

    if (this[VIEWS_STATES]) {
      item.nativeView.restoreHierarchyState(this[VIEWS_STATES]);
    }

    container.addView(item.nativeView, 0, android.view.ViewGroup.LayoutParams.MATCH_PARENT);
    return item.nativeView;
  }

  destroyItem(container: android.view.ViewGroup, index: number, object) {
    Log.D(`PagerAdapter destroyItem()`, index);
    container.removeView(object);
  }

  saveState() {
    Log.D(`CarouselPagerAdapterClassInner saveState()`);
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
    Log.D(`CarouselPagerAdapterClassInner restoreState()`, state, loader);
    const bundle = state;
    bundle.setClassLoader(loader);
    this[VIEWS_STATES] = bundle.getSparseParcelableArray(VIEWS_STATES);
  }
}

@NativeClass()
class CarouselPageChangedListener extends PagerNamespace.ViewPager.SimpleOnPageChangeListener {
  private owner: WeakRef<Carousel>;

  constructor(owner: WeakRef<Carousel>) {
    super();
    this.owner = owner;
    return global.__native(this);
  }

  onPageSelected(position) {
    Log.D(`CarouselPageChangedListener onPageSelected()`, position);
    this.owner.get().notify({
      eventName: CarouselCommon.pageChangedEvent,
      object: this.owner.get(),
      index: position,
    });
    this.owner.get().selectedPage = position;
  }

  onPageScrollStateChanged(state) {
    //Log.D(`CarouselPageChangedListener onPageScrollStateChanged()`);
    this.owner.get().notify({
      eventName: CarouselCommon.pageScrollStateChangedEvent,
      object: this.owner.get(),
      state: state,
    });
  }

  onPageScrolled(position, positionOffset, positionOffsetPixels) {
    //Log.D(`CarouselPageChangedListener onPageScrolled()`, position, positionOffset, positionOffsetPixels);
    const data = {
      eventName: CarouselCommon.pageScrollingEvent,
      object: this.owner.get(),
      state: {
        offset: positionOffset,
        android: {
          position: position,
          positionOffset: positionOffset,
          positionOffsetPixels: positionOffsetPixels,
        },
      },
    };
    this.owner.get().notify(data);
  }
}
