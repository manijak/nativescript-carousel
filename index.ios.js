"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Platform = require('platform');
var absolute_layout = require('ui/layouts/absolute-layout');
var stack_layout = require('ui/layouts/stack-layout');
var types = require("utils/types");
var builder = require("ui/builder");
var carouselCommon = require("./index-common");
var knownTemplates;
(function (knownTemplates) {
    knownTemplates.itemTemplate = "itemTemplate";
})(knownTemplates = exports.knownTemplates || (exports.knownTemplates = {}));

exports.CarouselItem = carouselCommon.CarouselItem;
var Carousel = (function (_super) {
    __extends(Carousel, _super);
    function Carousel() {
        var _this = _super.call(this) || this;
        return _this;
    }
    Carousel.prototype.createNativeView = function () {
        this.nativeView = new DKCarouselView(CGRectMake(0, 0, Platform.screen.mainScreen.widthDIPs, 0));
        return this.nativeView;
    };
    Carousel.prototype.initNativeView = function () {
        var _this = this;
        var nativeView = this.nativeView;
        _this._isDirty = true;
        nativeView.setDidSelectBlock(function(item, index){
            var args1 = { 
                eventName: Carousel.pageTappedEvent, 
                object: _this,
                view: item,
                index: index
            };
            _this.notify(args1);
        });
        nativeView.setDidChangeBlock(function(view, index){
            var args2 = { 
                eventName: Carousel.pageChangedEvent, 
                object: _this, 
                view: view,
                index: index
            };
             _this.selectedPage = index;
            _this.notify(args2);
        });
        nativeView.setDidScrollBlock(function(view, offset){
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
    };
    Carousel.prototype.disposeNativeView = function () {
        var nativeView = this.nativeView;
        nativeView.setDidChangeBlock(null);
        nativeView.setDidScrollBlock(null);
        nativeView.setDidSelectBlock(null);
        nativeView.setItems(new NSMutableArray());
        this.removeChildren();
    };
    Carousel.prototype.onLoaded = function () {
        _super.prototype.onLoaded.call(this); 
        if (this._isDirty) {
            this.refresh();
        }
    };
    Carousel.prototype.refresh = function () {
        if (!this.isLoaded || !this.nativeView) {
            this._isDirty = true;
            return;
        }
        this._isDirty = false;
        this.nativeView.setItems(new NSMutableArray());
        if (types.isNullOrUndefined(this.items) || !types.isNumber(this.items.length)) {
            var nsArray = new NSMutableArray();
            this.eachChildView(function (view1) {
                if (view1 instanceof carouselCommon.CarouselItem) {
                    view1.width = "100%";
                    view1.height = "100%";
                    var dkCarouselViewItem1 = new DKCarouselViewItem();
                    dkCarouselViewItem1.view = view1.ios;
                    nsArray.addObject(dkCarouselViewItem1);
                }
            });
            this.nativeView.setItems(nsArray);
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
                if (view instanceof carouselCommon.CarouselItem) {
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
        if(this.nativeView instanceof DKCarouselView){
            this.nativeView.setAutoPagingForInterval(value);
        }
    };
    Carousel.prototype[carouselCommon.selectedPageProperty.setNative] = function (value) {
        this.selectedPage = value;
        this.nativeView.selectedPage = value;
    };
    Carousel.prototype[carouselCommon.showIndicatorProperty.setNative] = function (value) {
        this.nativeView.indicatorIsVisible = value;
    };
    Carousel.prototype[carouselCommon.finiteProperty.setNative] = function (value) {
        this.nativeView.finite = value;
    };
    Carousel.prototype[carouselCommon.bounceProperty.setNative] = function (value) {
        this.nativeView.bounce = value;
    };
    Carousel.prototype[carouselCommon.scrollEnabledProperty.setNative] = function (value) {
        this.nativeView.scrollEnabled = value;
    };
    Carousel.prototype[carouselCommon.indicatorColorProperty.setNative] = function (value) {
        this.nativeView.indicatorTintColor = value ? value.ios : "#fff";
    };
    Carousel.prototype[carouselCommon.indicatorColorUnselectedProperty.setNative] = function (value) {
        this.nativeView.indicatorTintColorUnselected = value.ios;
    };
    Carousel.prototype[carouselCommon.indicatorOffsetProperty.setNative] = function (value) {
        var ar = value.split(',');
        var x = ar[0] ? ar[0] : 0;
        var y = ar[1] ? ar[1] : 0;
        this.nativeView.indicatorOffset = CGPointMake(x,y);
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

exports.Carousel = Carousel;