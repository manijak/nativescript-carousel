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
        console.log("createNativeView");
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
        console.log("initNativeView");
        this.refresh();
    };
    Carousel.prototype.disposeNativeView = function () {
        console.log("disposeNativeView");
        this.nativeView.setItems(new NSMutableArray());
        this.removeChildren();
    };
    Carousel.prototype.refresh = function () {
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
            console.log("refresh()");
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
        //this.nativeView.indicatorIsVisible = this._showIndicator;
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
        if (!types.isNullOrUndefined(this.items) && types.isNumber(this.items.length)) {
            this.refresh();
        }
    };
    Carousel.prototype._onItemsChanged = function (data) {
        if (!types.isNullOrUndefined(this.items) && types.isNumber(this.items.length)) {
            this.refresh();
        }
    };
    Carousel.prototype._onItemTemplatePropertyChanged = function (data) {
        if (!types.isNullOrUndefined(this.items) && types.isNumber(this.items.length)) {
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
    Object.defineProperty(Carousel.prototype, "ios", {
        get: function () {
            return this.nativeView;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(Carousel.prototype, "selectedPage", {
        set: function (value) {
            this._selectedPage = value;
            this.nativeView.selectedPage = value;
        },
        get: function () {
            return this._selectedPage ? this._selectedPage : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Carousel.prototype, "autoPagingInterval", {
        set: function (value) {
            console.log("nativeView", this.nativeView)
            this.nativeView.setAutoPagingForInterval(value);
        },
        enumerable: true,
        configurable: true
    });
    
    Object.defineProperty(Carousel.prototype, "showIndicator", {
        get: function () {
            return this.nativeView.indicatorIsVisible;
        },
        set: function (value) {
            this.nativeView.indicatorIsVisible = value;
            console.log("showIndicator native:", this.nativeView.indicatorIsVisible);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Carousel.prototype, "finite", {
        get: function () {
            return this.nativeView.finite;
        },
        set: function (value) {
            this.nativeView.finite = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Carousel.prototype, "bounce", {
        get: function () {
            return this.nativeView.bounce;
        },
        set: function (value) {
            this.nativeView.bounce = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Carousel.prototype, "scrollEnabled", {
        get: function () {
            return this.nativeView.scrollEnabled;
        },
        set: function (value) {
            this.nativeView.scrollEnabled = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Carousel.prototype, "indicatorColor", {
        set: function (value) {
            this.nativeView.indicatorTintColor = new colorModule.Color(value).ios;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Carousel.prototype, "indicatorColorUnselected", {
        set: function (value) {
            this.nativeView.indicatorTintColorUnselected = new colorModule.Color(value).ios;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Carousel.prototype, "indicatorOffset", {
        set: function (value) {
            var ar = value.split(',');
            var x = ar[0] ? ar[0] : 0;
            var y = ar[1] ? ar[1] : 0;
            this.nativeView.indicatorOffset = CGPointMake(x,y);
            //console.log("indicatorOffset", this.nativeView.indicatorOffset.x + " - " + this.nativeView.indicatorOffset.y);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Carousel.prototype, "indicatorAnimation", {
        set: function (value) {
            console.log("'indicatorAnimation' property not available for iOS");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Carousel.prototype, "indicatorAnimationDuration", {
        set: function (value) {
            console.log("'indicatorAnimationDuration' property not available for iOS");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Carousel.prototype, "indicatorAlignment", {
        set: function (value) {
            console.log("'indicatorAlignment' property not available for iOS");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Carousel.prototype, "indicatorRadius", {
        set: function (value) {
            console.log("'indicatorRadius' property not available for iOS");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Carousel.prototype, "indicatorPadding", {
        set: function (value) {
            console.log("'indicatorPadding' property not available for iOS");
        },
        enumerable: true,
        configurable: true
    });
    return Carousel;
}(absolute_layout.AbsoluteLayout));

Carousel.pageChangedEvent = "pageChanged";
Carousel.pageTappedEvent = "pageTapped";
Carousel.pageScrollingEvent = "pageScrolling";


Carousel.itemsProperty = new viewModule.Property({
    name: "items",
    defaultValue: undefined,
    valueChanged: function (target, oldValue, newValue) {
        target._onItemsPropertyChanged({
            object: target,
            oldValue: oldValue,
            newValue: newValue
        });
    }
});
Carousel.itemTemplateProperty = new viewModule.Property({
    name: "itemTemplate",
    defaultValue: undefined,
    valueChanged: function (target, oldValue, newValue) {
        target._onItemTemplatePropertyChanged({
            object: target,
            oldValue: oldValue,
            newValue: newValue
        });
    }
});

exports.Carousel = Carousel;
Carousel.itemsProperty.register(Carousel);
Carousel.itemTemplateProperty.register(Carousel);
