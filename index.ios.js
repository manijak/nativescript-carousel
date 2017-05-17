"use strict";
var observableArray = require("data/observable-array");
var Platform = require('platform');
var absolute_layout = require('ui/layouts/absolute-layout');
var stack_layout = require('ui/layouts/stack-layout');
var colorModule = require('color');
var weakEvents = require("ui/core/weak-event-listener");
var types = require("utils/types");
var builder = require("ui/builder");
var viewModule = require("tns-core-modules/ui/core/view");
var knownTemplates;
(function (knownTemplates) {
    knownTemplates.itemTemplate = "itemTemplate";
})(knownTemplates = exports.knownTemplates || (exports.knownTemplates = {}));

const selectedPageProperty = new viewModule.Property({
    name: "selectedPage",
    defaultValue: 0,
    valueConverter: function (value) { return +value; }
});
const autoPagingIntervalProperty = new viewModule.Property({
    name: "autoPagingInterval",
    defaultValue: 0,
    valueConverter: function (value) { return +value; }
});
const showIndicatorProperty = new viewModule.Property({
    name: "showIndicator",
    defaultValue: true,
    valueConverter: viewModule.booleanConverter
});
const finiteProperty = new viewModule.Property({
    name: "finite",
    defaultValue: undefined,
    valueConverter: viewModule.booleanConverter
});
const bounceProperty = new viewModule.Property({
    name: "bounce",
    defaultValue: undefined,
    valueConverter: viewModule.booleanConverter
});
const scrollEnabledProperty = new viewModule.Property({
    name: "scrollEnabled",
    defaultValue: undefined,
    valueConverter: viewModule.booleanConverter
});
const indicatorColorProperty = new viewModule.Property({
    name: "indicatorColor",
    defaultValue: undefined
});
const indicatorColorUnselectedProperty = new viewModule.Property({
    name: "indicatorColorUnselected",
    defaultValue: undefined
});
const indicatorOffsetProperty = new viewModule.Property({
    name: "indicatorOffset",
    defaultValue: undefined
});

var CarouselItem = (function (_super) {
    __extends(CarouselItem, _super);
    function CarouselItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CarouselItem;
}(stack_layout.StackLayout));
exports.CarouselItem = CarouselItem;

var Carousel = (function (_super) {
    __extends(Carousel, _super);
    function Carousel() {
        var _this = _super.call(this) || this;
        return _this;
    }
    Carousel.prototype.createNativeView = function () {
        var _this = this;
        _this.nativeView = new DKCarouselView(CGRectMake(0, 0, Platform.screen.mainScreen.widthDIPs, 0));
        _this.nativeView.setDidSelectBlock(function(item, index){
            var args1 = { 
                eventName: Carousel.pageTappedEvent, 
                object: _this,
                view: item,
                index: index
            };
            _this.notify(args1);
        });
        _this.nativeView.setDidChangeBlock(function(view, index){
            var args2 = { 
                eventName: Carousel.pageChangedEvent, 
                object: _this, 
                view: view,
                index: index
            };
             _this._selectedPage = index;
            _this.notify(args2);
        });
        _this.nativeView.setDidScrollBlock(function(view, offset){
            var args2 = { 
                eventName: Carousel.pageScrollingEvent, 
                object: _this, 
                view: view,
                state: {
                    offset: offset
                }
            };
            _this.notify(args2);
        });
        return _this.nativeView;
    };
    Carousel.prototype.initNativeView = function () {
        this.refresh();
    };
    Carousel.prototype.disposeNativeView = function () {
        this.nativeView.setItems(new NSMutableArray());
        this.removeChildren();
    };
    Carousel.prototype.refresh = function () {
        if(!(this.nativeView instanceof DKCarouselView)) return; 
        
        this.nativeView.setItems(new NSMutableArray());
        var that = this;
        if (types.isNullOrUndefined(this.items) || !types.isNumber(this.items.length)) {
            this.on(absolute_layout.AbsoluteLayout.loadedEvent, function (data) {
                var nsArray = new NSMutableArray();
                that.eachChildView(function (view1) {
                    if (view1 instanceof CarouselItem) {
                        view1.width = "100%";
                        view1.height = "100%";
                        var dkCarouselViewItem1 = new DKCarouselViewItem();
                        dkCarouselViewItem1.view = view1.ios;
                        nsArray.addObject(dkCarouselViewItem1);
                    }
                });
                that.nativeView.setItems(nsArray);
            });
        }
        else{
            this.removeChildren();
            var nsArray = new NSMutableArray();
            var length = this.items.length;
            for (var i = 0; i < length; i++) {
                var viewToAdd = !types.isNullOrUndefined(this.itemTemplate) ? builder.parse(this.itemTemplate, this) : null;
                if(!viewToAdd) continue;
                var dataItem = this._getDataItem(i);
                viewToAdd.bindingContext = dataItem;
                this.addChild(viewToAdd);
            }
            this.eachChildView(function (view) {
                if (view instanceof CarouselItem) {
                    view.width = "100%";
                    view.height = "100%";
                    var dkCarouselViewItem = new DKCarouselViewItem();
                    dkCarouselViewItem.view = view.ios;
                    nsArray.addObject(dkCarouselViewItem);
                }
            });
            this.nativeView.setItems(nsArray);
        }
    };
    Carousel.prototype._getDataItem = function (index) {
        return this.items.getItem ? this.items.getItem(index) : this.items[index];
    };
    Carousel.prototype._onItemsChanged = function (data) {
        if (!types.isNullOrUndefined(this.items) && types.isNumber(this.items.length)) {
            this.refresh();
        }
    };

    Carousel.prototype[autoPagingIntervalProperty.setNative] = function (value) {
        if (this.nativeView instanceof DKCarouselView){
            this.nativeView.setAutoPagingForInterval(value);
        }
    };

    Carousel.prototype[selectedPageProperty.getNative] = function (value) {
        if (this.nativeView instanceof DKCarouselView){
            return this._selectedPage ? this._selectedPage : 0;
        }
    };
    Carousel.prototype[selectedPageProperty.setNative] = function (value) {
        if (this.nativeView instanceof DKCarouselView){
            this._selectedPage = value;
            this.nativeView.selectedPage = value;
        }
    };

    Carousel.prototype[showIndicatorProperty.getNative] = function (value) {
        if (this.nativeView instanceof DKCarouselView){
            return this.nativeView.indicatorIsVisible;
        }
    };
    Carousel.prototype[showIndicatorProperty.setNative] = function (value) {
        if (this.nativeView instanceof DKCarouselView){
            this.nativeView.indicatorIsVisible = value;
        }
    };

    Carousel.prototype[finiteProperty.getNative] = function (value) {
        if (this.nativeView instanceof DKCarouselView){
            return this.nativeView.finite;
        }
    };
    Carousel.prototype[finiteProperty.setNative] = function (value) {
        if (this.nativeView instanceof DKCarouselView){
            this.nativeView.finite = value;
        }
    };
    Carousel.prototype[bounceProperty.getNative] = function (value) {
        if (this.nativeView instanceof DKCarouselView){
            return this.nativeView.bounce;
        }
    };
    Carousel.prototype[bounceProperty.setNative] = function (value) {
        if (this.nativeView instanceof DKCarouselView){
            this.nativeView.bounce = value;
        }
    };
    
    Carousel.prototype[scrollEnabledProperty.getNative] = function (value) {
        if (this.nativeView instanceof DKCarouselView){
            return this.nativeView.scrollEnabled;
        }
    };
    Carousel.prototype[scrollEnabledProperty.setNative] = function (value) {
        if (this.nativeView instanceof DKCarouselView){
            this.nativeView.scrollEnabled = value;
        }
    };

    Carousel.prototype[indicatorColorProperty.setNative] = function (value) {
        if (this.nativeView instanceof DKCarouselView){
            this.nativeView.indicatorTintColor = new colorModule.Color(value).ios;
        }
    };
    Carousel.prototype[indicatorColorUnselectedProperty.setNative] = function (value) {
        if (this.nativeView instanceof DKCarouselView){
            this.nativeView.indicatorTintColorUnselected = new colorModule.Color(value).ios;
        }
    };
    Carousel.prototype[indicatorOffsetProperty.setNative] = function (value) {
        if (this.nativeView instanceof DKCarouselView){
            var ar = value.split(',');
            var x = ar[0] ? ar[0] : 0;
            var y = ar[1] ? ar[1] : 0;
            this.nativeView.indicatorOffset = CGPointMake(x,y);
        }
    };
    Object.defineProperty(Carousel.prototype, "ios", {
        get: function () {
            return this.nativeView;
        },
        enumerable: true,
        configurable: true
    });
    return Carousel;
}(absolute_layout.AbsoluteLayout));

Carousel.pageChangedEvent = "pageChanged";
Carousel.pageTappedEvent = "pageTapped";
Carousel.pageScrollingEvent = "pageScrolling";

exports.Carousel = Carousel;
exports.itemTemplateProperty = new viewModule.Property({
    name: "itemTemplate", 
    affectsLayout: true, 
    valueChanged: function (target) {
        target.refresh();
    }
});
exports.itemTemplateProperty.register(Carousel);
exports.itemsProperty = new viewModule.Property({
    name: "items", 
    affectsLayout: true, 
    valueChanged: function (target, oldValue, newValue) {
        if (oldValue instanceof observableArray.ObservableArray) {
            weakEvents.removeWeakEventListener(oldValue, observableArray.ObservableArray.changeEvent, target._onItemsChanged, target);
        }
        if (newValue instanceof observableArray.ObservableArray) {
            weakEvents.addWeakEventListener(newValue, observableArray.ObservableArray.changeEvent, target._onItemsChanged, target);
        }
        if (!types.isNullOrUndefined(target.items) && types.isNumber(target.items.length)) {
            target.refresh();
        }
    }
});
exports.itemsProperty.register(Carousel);

selectedPageProperty.register(Carousel);
autoPagingIntervalProperty.register(Carousel);
showIndicatorProperty.register(Carousel);
finiteProperty.register(Carousel);
bounceProperty.register(Carousel);
scrollEnabledProperty.register(Carousel);
indicatorColorProperty.register(Carousel);
indicatorColorUnselectedProperty.register(Carousel);
indicatorOffsetProperty.register(Carousel);