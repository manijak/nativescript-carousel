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
var carouselCommon = require("./index-common");
var knownTemplates;
(function (knownTemplates) {
    knownTemplates.itemTemplate = "itemTemplate";
})(knownTemplates = exports.knownTemplates || (exports.knownTemplates = {}));

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

    Carousel.prototype[carouselCommon.autoPagingIntervalProperty.setNative] = function (value) {
        if (this.nativeView instanceof DKCarouselView){
            this.nativeView.setAutoPagingForInterval(value);
        }
    };

    Carousel.prototype[carouselCommon.selectedPageProperty.getNative] = function (value) {
        if (this.nativeView instanceof DKCarouselView){
            return this._selectedPage ? this._selectedPage : 0;
        }
    };
    Carousel.prototype[carouselCommon.selectedPageProperty.setNative] = function (value) {
        if (this.nativeView instanceof DKCarouselView){
            this._selectedPage = value;
            this.nativeView.selectedPage = value;
        }
    };

    Carousel.prototype[carouselCommon.showIndicatorProperty.getNative] = function (value) {
        if (this.nativeView instanceof DKCarouselView){
            return this.nativeView.indicatorIsVisible;
        }
    };
    Carousel.prototype[carouselCommon.showIndicatorProperty.setNative] = function (value) {
        if (this.nativeView instanceof DKCarouselView){
            this.nativeView.indicatorIsVisible = value;
        }
    };

    Carousel.prototype[carouselCommon.finiteProperty.getNative] = function (value) {
        if (this.nativeView instanceof DKCarouselView){
            return this.nativeView.finite;
        }
    };
    Carousel.prototype[carouselCommon.finiteProperty.setNative] = function (value) {
        if (this.nativeView instanceof DKCarouselView){
            this.nativeView.finite = value;
        }
    };
    Carousel.prototype[carouselCommon.bounceProperty.getNative] = function (value) {
        if (this.nativeView instanceof DKCarouselView){
            return this.nativeView.bounce;
        }
    };
    Carousel.prototype[carouselCommon.bounceProperty.setNative] = function (value) {
        if (this.nativeView instanceof DKCarouselView){
            this.nativeView.bounce = value;
        }
    };
    
    Carousel.prototype[carouselCommon.scrollEnabledProperty.getNative] = function (value) {
        if (this.nativeView instanceof DKCarouselView){
            return this.nativeView.scrollEnabled;
        }
    };
    Carousel.prototype[carouselCommon.scrollEnabledProperty.setNative] = function (value) {
        if (this.nativeView instanceof DKCarouselView){
            this.nativeView.scrollEnabled = value;
        }
    };

    Carousel.prototype[carouselCommon.indicatorColorProperty.setNative] = function (value) {
        if (this.nativeView instanceof DKCarouselView){
            this.nativeView.indicatorTintColor = value.ios;
        }
    };
    Carousel.prototype[carouselCommon.indicatorColorUnselectedProperty.setNative] = function (value) {
        if (this.nativeView instanceof DKCarouselView){
            this.nativeView.indicatorTintColorUnselected = value.ios;
        }
    };
    Carousel.prototype[carouselCommon.indicatorOffsetProperty.setNative] = function (value) {
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
}(carouselCommon.CarouselCommon));

Carousel.pageChangedEvent = "pageChanged";
Carousel.pageTappedEvent = "pageTapped";
Carousel.pageScrollingEvent = "pageScrolling";

exports.Carousel = Carousel;