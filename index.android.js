"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var grid_layout = require('ui/layouts/grid-layout');
var stack_layout = require('ui/layouts/stack-layout');
var types = require("utils/types");
var builder = require("ui/builder");
var viewModule = require("ui/core/view");
var carouselCommon = require("./index-common");
var knownTemplates;
(function (knownTemplates) {
    knownTemplates.itemTemplate = "itemTemplate";
})(knownTemplates = exports.knownTemplates || (exports.knownTemplates = {}));

exports.CarouselItem = carouselCommon.CarouselItem;
var Carousel = (function (_super) {
    __extends(Carousel, _super);
    function Carousel() {
        this._androidViewId = -1;
        this._indicatorViewId = -1;
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Carousel.prototype.createNativeView = function () {
        if (this._androidViewId < 0) {
            this._androidViewId = android.view.View.generateViewId();
        }
        if (this._indicatorViewId < 0) {
            this._indicatorViewId = android.view.View.generateViewId();
        }
        this.nativeView = new android.support.v4.view.ViewPager(this._context);
        this.nativeView.setId(this._androidViewId);
        
        this._pageIndicatorView = new com.rd.PageIndicatorView(this._context);
        this._pageIndicatorView.setId(this._indicatorViewId);
        this._pagerIndicatorLayoutParams = new org.nativescript.widgets.CommonLayoutParams();

        ensureCarouselPagerAdapterClass();
        this.nativeView.setAdapter(new CarouselPagerAdapterClass(this));
        
        ensureCarouselPageChangedListenerClass();
        this.nativeView.setOnPageChangeListener(new CarouselPageChangedListenerClass(this));

        return this.nativeView;
    };
    Carousel.prototype.onLoaded = function () {
        if(this.showIndicator !== false){
            this._pagerIndicatorLayoutParams.height = android.support.v4.view.ViewPager.LayoutParams.WRAP_CONTENT;
            this._pagerIndicatorLayoutParams.width = android.support.v4.view.ViewPager.LayoutParams.MATCH_PARENT;
        
            var ar = this.indicatorOffset.split(',');
            var x = ar[0] ? Number(ar[0]) : 0;
            var y = ar[1] ? Number(ar[1]) : 0;

            var defaultVerticalMargin = 50;
            var verticalOffset = defaultVerticalMargin + ((y < 0) ? Math.abs(y) : -Math.abs(y)); //Reverse +- to be the same as ios
            var horizontalOffset = x;

            if(this.indicatorAlignment === "TOP"){
                this._pagerIndicatorLayoutParams.setMargins(horizontalOffset, verticalOffset, 0, 0);
                this._pagerIndicatorLayoutParams.gravity = android.view.Gravity.TOP | android.view.Gravity.CENTER;    
            }else{
                this._pagerIndicatorLayoutParams.setMargins(horizontalOffset, 0, 0, verticalOffset);
                this._pagerIndicatorLayoutParams.gravity = android.view.Gravity.BOTTOM | android.view.Gravity.CENTER;
            }
        
            if (this._pageIndicatorView.getParent()) {
                this.parent.android.removeView(this._pageIndicatorView);
            }

            if(this.parent instanceof grid_layout.GridLayout){
                this.parent.android.addView(this._pageIndicatorView, this._pagerIndicatorLayoutParams);
            }else{
                this.parent.android.addView(this._pageIndicatorView);
            }

            this._pageIndicatorView.setViewPager(this.nativeView);
            this._pageIndicatorView.setCount(this._childrenCount);
            this._pageIndicatorView.setSelection(this.selectedPage);
        }
        _super.prototype.onLoaded.call(this);
    };
    Carousel.prototype.initNativeView = function () {
        this.refresh();
    };
    Carousel.prototype.refresh = function () {
        if (types.isNullOrUndefined(this.items) || !types.isNumber(this.items.length)) return;
        if (!this.nativeView) return;
        this.removeChildren();
     
        var length = this.items.length;
        for (var i = 0; i < length; i++) {
            var viewToAdd = !types.isNullOrUndefined(this.itemTemplate) ? builder.parse(this.itemTemplate, this) : this._getDefaultItemContent(i);
            var dataItem = this._getDataItem(i);
            viewToAdd.bindingContext = dataItem;
            this.addChild(viewToAdd);
        }
        var adapter = this.nativeView.getAdapter();
        if(adapter){
            adapter.notifyDataSetChanged();
            this._pageIndicatorView.setCount(this.items.length);
            this.nativeView.setCurrentItem(this.selectedPage);
            this._pageIndicatorView.setSelection(this.selectedPage);
        }
    };
    Carousel.prototype._getDataItem = function (index) {
        return this.items.getItem ? this.items.getItem(index) : this.items[index];
    };
    Carousel.prototype._onItemsChanged = function (data) {
        this.refresh();
    };
    Carousel.prototype.onLayout = function (left, top, right, bottom) {
        viewModule.View.layoutChild(this, this, 0, 0, right - left, bottom - top);
    };
    Object.defineProperty(Carousel.prototype, "android", {
        get: function () {
            return this.nativeView;
        },
        enumerable: true,
        configurable: true
    });

    Carousel.prototype[carouselCommon.indicatorColorProperty.setNative] = function (value) {
        if(!value) return;
        this._pageIndicatorView.setSelectedColor(value.android);
    };
    Carousel.prototype[carouselCommon.indicatorColorUnselectedProperty.setNative] = function (value) {
        if(!value) return;
        this._pageIndicatorView.setUnselectedColor(value.android);
    };
    Carousel.prototype[carouselCommon.selectedPageProperty.setNative] = function (value) {
        this.selectedPage = value;
        this.nativeView.setCurrentItem(value);
    };

    Carousel.prototype[carouselCommon.indicatorAnimationProperty.setNative] = function (value) {
        if(!value) return;
        var animationType = com.rd.animation.type.AnimationType.NONE;
        switch(value.toUpperCase()){
            case "NONE":
                animationType = com.rd.animation.type.AnimationType.NONE;
                break;
            case "COLOR":
                animationType = com.rd.animation.type.AnimationType.COLOR;
                break;
            case "SLIDE":
                animationType = com.rd.animation.type.AnimationType.SLIDE;
                break;
            case "WORM":
                animationType = com.rd.animation.type.AnimationType.WORM;
                break;
            case "SCALE":
                animationType = com.rd.animation.type.AnimationType.SCALE;
                break;
            case "FILL":
                animationType = com.rd.animation.type.AnimationType.FILL;
                break;
            case "THIN_WORM":
                animationType = com.rd.animation.type.AnimationType.THIN_WORM;
                break;
            case "DROP":
                animationType = com.rd.animation.type.AnimationType.DROP;
                break;
            case "SWAP":
                animationType = com.rd.animation.type.AnimationType.SWAP;
                break;
            default:
                animationType = com.rd.animation.type.AnimationType.NONE;
                break;
        }
        if(this._pageIndicatorView)
            this._pageIndicatorView.setAnimationType(animationType);
    };
    Carousel.prototype[carouselCommon.indicatorAnimationDurationProperty.setNative] = function (value) {
        if(!value) return;
        if(this._pageIndicatorView)
            this._pageIndicatorView.setAnimationDuration(value);
    };
  
    Carousel.prototype[carouselCommon.indicatorRadiusProperty.setNative] = function (value) {
        if(!value) return;
        if(this._pageIndicatorView){
            this._pageIndicatorView.setRadius(value);
        }
    };
    Carousel.prototype[carouselCommon.indicatorPaddingProperty.setNative] = function (value) {
        if(!value) return;
        if(this._pageIndicatorView){
            this._pageIndicatorView.setPadding(value);
        }
    };
    return Carousel;
}(carouselCommon.CarouselCommon));
exports.Carousel = Carousel;

var VIEWS_STATES = "_viewStates";
var CarouselPagerAdapterClass;
function ensureCarouselPagerAdapterClass() {
    if (CarouselPagerAdapterClass) {
        return;
    }
    var CarouselPagerAdapterClassInner = (function (_super) {
        __extends(CarouselPagerAdapterClassInner, _super);
        function CarouselPagerAdapterClassInner(owner) {
            _super.call(this);
            this.owner = owner;

            return global.__native(this);
        }
        CarouselPagerAdapterClassInner.prototype.getCount = function () {
            if (types.isNullOrUndefined(this.owner.items) || !types.isNumber(this.owner.items.length))
                return this.owner ? this.owner._childrenCount : 0;
            else
                return this.owner ? this.owner.items.length : 0;
        };
        CarouselPagerAdapterClassInner.prototype.getItemPosition = function (item) {
           return android.support.v4.view.PagerAdapter.POSITION_NONE;
        };
        CarouselPagerAdapterClassInner.prototype.isViewFromObject = function (view, _object) {
            return view === _object;
        };
        CarouselPagerAdapterClassInner.prototype.instantiateItem = function (container, index) {
            var item = this.owner.getChildAt(index);
            if(!item)
                return null;
            
            if (item.parent !== this.owner) 
                this.owner.addChild(item);
            else
                item.parent.android.removeView(item.android);
            
            if (this[VIEWS_STATES]) {
                item.nativeView.restoreHierarchyState(this[VIEWS_STATES]);
            }
            container.addView(item.nativeView, android.view.ViewGroup.LayoutParams.MATCH_PARENT, android.view.ViewGroup.LayoutParams.MATCH_PARENT);
            return item.nativeView;
        };
        CarouselPagerAdapterClassInner.prototype.destroyItem = function (container, index, _object) {
            var item = this.owner.getChildAt(index);
            if(!item)
                return null;

            var nativeView = item.nativeView;
            container.removeView(nativeView);
        };
        CarouselPagerAdapterClassInner.prototype.saveState = function () {
            if (!this[VIEWS_STATES]) {
                this[VIEWS_STATES] = new android.util.SparseArray();
            }
            var mViewStates = this[VIEWS_STATES];
            var mViewPager = this.owner.android;
            var count = mViewPager.getChildCount();
            for (var i = 0; i < count; i++) {
                var c = mViewPager.getChildAt(i);
                if (c.isSaveFromParentEnabled()) {
                    c.saveHierarchyState(mViewStates);
                }
            }
            var bundle = new android.os.Bundle();
            bundle.putSparseParcelableArray(VIEWS_STATES, mViewStates);
            return bundle;
        };
        CarouselPagerAdapterClassInner.prototype.restoreState = function (state, loader) {
            var bundle = state;
            bundle.setClassLoader(loader);
            this[VIEWS_STATES] = bundle.getSparseParcelableArray(VIEWS_STATES);
        };
        return CarouselPagerAdapterClassInner;
    }(android.support.v4.view.PagerAdapter));
    CarouselPagerAdapterClass = CarouselPagerAdapterClassInner;
}

var CarouselPageChangedListenerClass;
function ensureCarouselPageChangedListenerClass() {
    if (CarouselPageChangedListenerClass) {
        return;
    }
    var CarouselPageChangedListener = (function (_super) {
        __extends(CarouselPageChangedListener, _super);
        function CarouselPageChangedListener(owner) {
            _super.call(this);
            this.owner = owner;
            return global.__native(this);
        }
        CarouselPageChangedListener.prototype.onPageSelected = function (position) {
            this.owner.notify({ 
                eventName: carouselCommon.CarouselCommon.pageChangedEvent, 
                object: this.owner,
                index: position
            });
            this.owner.selectedPage = position;
        };
        CarouselPageChangedListener.prototype.onPageScrollStateChanged = function (state) {
            this.owner.notify({ 
                eventName: carouselCommon.CarouselCommon.pageScrollStateChangedEvent, 
                object: this.owner,
                state: state
            });
        };
        CarouselPageChangedListener.prototype.onPageScrolled = function (position, positionOffset, positionOffsetPixels) {
            var args2 = { 
                eventName: carouselCommon.CarouselCommon.pageScrollingEvent, 
                object: this.owner,
                state: {
                    offset: positionOffset,
                    android:{
                        position: position,
                        positionOffset: positionOffset, 
                        positionOffsetPixels: positionOffsetPixels
                    }
                }
            };
            this.owner.notify(args2);
        };
        return CarouselPageChangedListener;
    }(android.support.v4.view.ViewPager.SimpleOnPageChangeListener));
    CarouselPageChangedListenerClass = CarouselPageChangedListener;
}