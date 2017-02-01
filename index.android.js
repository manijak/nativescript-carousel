"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var dObservable = require("ui/core/dependency-observable");
var observableArray = require("data/observable-array");
var Platform = require('platform');
var absolute_layout = require('ui/layouts/absolute-layout');
var grid_layout = require('ui/layouts/grid-layout');
var stack_layout = require('ui/layouts/stack-layout');
var colorModule = require('color');
var repeaterModule = require("ui/repeater");
var weakEvents = require("ui/core/weak-event-listener");
var types = require("utils/types");
var builder = require("ui/builder");
var proxy = require("ui/core/proxy");
var viewModule = require("ui/core/view");
var knownTemplates;
(function (knownTemplates) {
    knownTemplates.itemTemplate = "itemTemplate";
})(knownTemplates = exports.knownTemplates || (exports.knownTemplates = {}));
function onItemsPropertyChanged(data) {
    var carousel = data.object;
    carousel._onItemsPropertyChanged(data);
}
function onItemTemplatePropertyChanged(data) {
    var carousel = data.object;
    carousel._onItemTemplatePropertyChanged(data);
}

var CarouselItem = (function (_super) {
    __extends(CarouselItem, _super);
    function CarouselItem() {
        _super.apply(this, arguments);
    }
    return CarouselItem;
}(stack_layout.StackLayout));
exports.CarouselItem = CarouselItem;


var Carousel = (function (_super) {
    __extends(Carousel, _super);
    function Carousel() {
        _super.call(this);
        this._androidViewId = -1;
        this._indicatorViewId = -1;
    }
   
    Carousel.prototype._createUI = function () {
        if (this._androidViewId < 0) {
            this._androidViewId = android.view.View.generateViewId();
        }
        if (this._indicatorViewId < 0) {
            this._indicatorViewId = android.view.View.generateViewId();
        }
        this._viewPager = new android.support.v4.view.ViewPager(this._context);
        this._viewPager.setId(this._androidViewId);
        
        this._pageIndicatorView = new com.rd.PageIndicatorView(this._context);
        this._pageIndicatorView.setId(this._indicatorViewId);
        this._pagerIndicatorLayoutParams = new org.nativescript.widgets.CommonLayoutParams();

        ensureCarouselPagerAdapterClass();
        this._viewPager.setAdapter(new CarouselPagerAdapterClass(this));
        
        ensureCarouselPageChangedListenerClass();
        this._viewPager.setOnPageChangeListener(new CarouselPageChangedListenerClass(this));
    };
    Carousel.prototype.onLoaded = function () {
        this._viewPager.setCurrentItem(this.selectedPage, false);

        if(this._enableIndicator !== false){
            this._pagerIndicatorLayoutParams.height = android.support.v4.view.ViewPager.LayoutParams.WRAP_CONTENT;
            this._pagerIndicatorLayoutParams.width = android.support.v4.view.ViewPager.LayoutParams.MATCH_PARENT;
        
            if(this._indicatorAlignment === "TOP"){
                this._pagerIndicatorLayoutParams.setMargins(0, 20, 0, 0);
                this._pagerIndicatorLayoutParams.gravity = android.view.Gravity.TOP | android.view.Gravity.CENTER;    
            }else{
                this._pagerIndicatorLayoutParams.setMargins(0, 0, 0, 20);
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

            this._pageIndicatorView.setViewPager(this._viewPager);
            this._pageIndicatorView.setCount(this._childrenCount);
            this._pageIndicatorView.setSelection(this.selectedPage);

            this.indicatorAnimationDuration = this._indicatorAnimationDuration ? this._indicatorAnimationDuration : 500;
            this.indicatorAnimation = this._indicatorAnimation;
            this.indicatorRadius = this._indicatorRadius;
            this.indicatorPadding = this._indicatorPadding;
            this.indicatorColor = this._indicatorColor;
            this.indicatorColorUnselected = this._indicatorColorUnselected;
        }
        _super.prototype.onLoaded.call(this);
    };
    Carousel.prototype.constructView = function () { };
    Carousel.prototype.refresh = function () {
        if (types.isNullOrUndefined(this.items) || !types.isNumber(this.items.length))
            return;
        this.removeChildren();
     
        var length = this.items.length;
        for (var i = 0; i < length; i++) {
            var viewToAdd = !types.isNullOrUndefined(this.itemTemplate) ? builder.parse(this.itemTemplate, this) : this._getDefaultItemContent(i);
            var dataItem = this._getDataItem(i);
            viewToAdd.bindingContext = dataItem;
            this.addChild(viewToAdd);
        }
        var adapter = this._viewPager.getAdapter();
        adapter.notifyDataSetChanged();
        this._pageIndicatorView.setCount(this.items.length);
        this._pageIndicatorView.setSelection(0);
    };
    Carousel.prototype._getDataItem = function (index) {
        return this.items.getItem ? this.items.getItem(index) : this.items[index];
    };
    Carousel.prototype._onItemsPropertyChanged = function (data) {
        if (data.oldValue instanceof observableArray.ObservableArray) {
            weakEvents.removeWeakEventListener(data.oldValue, observableArray.ObservableArray.changeEvent, this._onItemsChanged, this);
        }
        if (data.newValue instanceof observableArray.ObservableArray) {
            weakEvents.addWeakEventListener(data.newValue, observableArray.ObservableArray.changeEvent, this._onItemsChanged, this);
        }
        this._requestRefresh();
    };
    Carousel.prototype._onItemTemplatePropertyChanged = function (data) {
        this._requestRefresh();
    };
    Carousel.prototype._onItemsChanged = function (data) {
        var adapter = this._viewPager.getAdapter();
        adapter.notifyDataSetChanged();
        this._pageIndicatorView.setCount(this.items.length);
        console.log("ItemsChanged");
    };
    Carousel.prototype.onLayout = function (left, top, right, bottom) {
        viewModule.View.layoutChild(this, this, 0, 0, right - left, bottom - top);
    };
    Carousel.prototype._requestRefresh = function () {
        if (this.isLoaded) {
            this.refresh();
        }
    };
    
    Object.defineProperty(Carousel.prototype, "items", {
        get: function () {
            return this._getValue(Carousel.itemsProperty);
        },
        set: function (value) {
            this._setValue(Carousel.itemsProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Carousel.prototype, "itemTemplate", {
        get: function () {
            return this._getValue(Carousel.itemTemplateProperty);
        },
        set: function (value) {
            this._setValue(Carousel.itemTemplateProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Carousel.prototype, "android", {
        get: function () {
            return this._viewPager;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Carousel.prototype, "_nativeView", {
        get: function () {
            return this._viewPager;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Carousel.prototype, "pageWidth", {
        get: function () {
            return Platform.screen.mainScreen.widthDIPs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Carousel.prototype, "showIndicator", {
        set: function (value) {
            this._enableIndicator = value;
        },
        get: function () {
            return this._enableIndicator;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Carousel.prototype, "indicatorColor", {
        set: function (value) {
            if(!value) return;
            this._indicatorColor = value;
            var droidColor = new colorModule.Color(value).android;
            if(this._pageIndicatorView){
                this._pageIndicatorView.setSelectedColor(droidColor);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Carousel.prototype, "indicatorColorUnselected", {
        set: function (value) {
            if(!value) return;
            this._indicatorColorUnselected = value;
            var droidColor = new colorModule.Color(value).android;
            if(this._pageIndicatorView)
                this._pageIndicatorView.setUnselectedColor(droidColor);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Carousel.prototype, "indicatorAnimation", {
        set: function (value) {
            if(!value) return;
            this._indicatorAnimation = value.toUpperCase();
            var animationType = com.rd.animation.AnimationType.NONE;
            switch(value.toUpperCase()){
                case "NONE":
                    animationType = com.rd.animation.AnimationType.NONE;
                    break;
                case "COLOR":
                    animationType = com.rd.animation.AnimationType.COLOR;
                    break;
                case "SLIDE":
                    animationType = com.rd.animation.AnimationType.SLIDE;
                    break;
                case "WORM":
                    animationType = com.rd.animation.AnimationType.WORM;
                    break;
                case "SCALE":
                    animationType = com.rd.animation.AnimationType.SCALE;
                    break;
                case "FILL":
                    animationType = com.rd.animation.AnimationType.FILL;
                    break;
                case "THIN_WORM":
                    animationType = com.rd.animation.AnimationType.THIN_WORM;
                    break;
                case "DROP":
                    animationType = com.rd.animation.AnimationType.DROP;
                    break;
                default:
                    animationType = com.rd.animation.AnimationType.NONE;
                    break;
            }
            if(this._pageIndicatorView)
                this._pageIndicatorView.setAnimationType(animationType);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Carousel.prototype, "indicatorAnimationDuration", {
        set: function (value) {
            if(!value) return;
            this._indicatorAnimationDuration = value;
            if(this._pageIndicatorView)
                this._pageIndicatorView.setAnimationDuration(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Carousel.prototype, "indicatorAlignment", {
        set: function (value) {
            if(!value) return;
            this._indicatorAlignment = value.toUpperCase();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Carousel.prototype, "indicatorRadius", {
        set: function (value) {
            if(!value) return;
            this._indicatorRadius = value;
            if(this._pageIndicatorView){
                this._pageIndicatorView.setRadius(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Carousel.prototype, "indicatorPadding", {
        set: function (value) {
            if(!value) return;
            this._indicatorPadding = value;
            if(this._pageIndicatorView){
                this._pageIndicatorView.setPadding(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Carousel.prototype, "selectedPage", {
        set: function (value) {
            if(this._viewPager){
                this._viewPager.setCurrentItem(value);
            }
        },
        get: function(){
            if(this._viewPager){
               return this._viewPager.getCurrentItem();
            }
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(Carousel.prototype, "autoPagingInterval", {
        set: function (value) {
            console.log("'autoPagingInterval' property not available for Android");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Carousel.prototype, "indicatorOffset", {
        set: function (value) {
            console.log("'indicatorOffset' property not available for Android");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Carousel.prototype, "finite", {
        set: function (value) {
            console.log("'finite' property not available for Android");
        },
        enumerable: true,
        configurable: true
    });
    Carousel.pageChangedEvent = "pageChanged";
    Carousel.pageTappedEvent = "pageTapped";
    Carousel.itemsProperty = new dObservable.Property("items", "Carousel", new proxy.PropertyMetadata(undefined, dObservable.PropertyMetadataSettings.AffectsLayout, onItemsPropertyChanged));
    Carousel.itemTemplateProperty = new dObservable.Property("itemTemplate", "Carousel", new proxy.PropertyMetadata(undefined, dObservable.PropertyMetadataSettings.AffectsLayout, onItemTemplatePropertyChanged));
    return Carousel;
}(absolute_layout.AbsoluteLayout));
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
                item._nativeView.restoreHierarchyState(this[VIEWS_STATES]);
            }
            container.addView(item._nativeView, android.view.ViewGroup.LayoutParams.MATCH_PARENT, android.view.ViewGroup.LayoutParams.MATCH_PARENT);
            return item._nativeView;
        };
        CarouselPagerAdapterClassInner.prototype.destroyItem = function (container, index, _object) {
            var item = this.owner.getChildAt(index);
            if(!item)
                return null;

            var nativeView = item._nativeView;
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
            var args2 = { 
                eventName: Carousel.pageChangedEvent, 
                object: this.owner,
                index: position
            };
            this.owner.notify(args2);
        };
        CarouselPageChangedListener.prototype.onPageScrollStateChanged = function (state) { };
        CarouselPageChangedListener.prototype.onPageScrolled = function (position, positionOffset, positionOffsetPixels) { };
        return CarouselPageChangedListener;
    }(android.support.v4.view.ViewPager.SimpleOnPageChangeListener));
    CarouselPageChangedListenerClass = CarouselPageChangedListener;
}
