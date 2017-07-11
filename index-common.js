"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var absolute_layout = require('ui/layouts/absolute-layout');
var stack_layout = require('ui/layouts/stack-layout');
var viewModule = require("ui/core/view");
var weakEvents = require("ui/core/weak-event-listener");
var observableArray = require("data/observable-array");
var types = require("utils/types");
var colorModule = require('color');

var CarouselItem = (function (_super) {
    __extends(CarouselItem, _super);
    function CarouselItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        return _this;
    }
    return CarouselItem;
}(stack_layout.StackLayout));
exports.CarouselItem = CarouselItem;

var CarouselCommon = (function (_super) {
    __extends(CarouselCommon, _super);
    function CarouselCommon() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        return _this;
    }
    CarouselCommon.prototype.onLoaded = function () {
        _super.prototype.onLoaded.call(this);
    };
    return CarouselCommon;
}(absolute_layout.AbsoluteLayout));
CarouselCommon.pageChangedEvent = "pageChanged";
CarouselCommon.pageTappedEvent = "pageTapped";
CarouselCommon.pageScrollingEvent = "pageScrolling";
CarouselCommon.pageScrollStateChangedEvent = "pageScrolled";
exports.CarouselCommon = CarouselCommon;

// Common
exports.itemTemplateProperty = new viewModule.Property({
    name: "itemTemplate", 
    affectsLayout: true, 
    valueChanged: function (view, oldValue, newValue) {
        view.refresh();
    }
});
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
exports.selectedPageProperty = new viewModule.Property({
    name: "selectedPage",
    defaultValue: 0,
    valueConverter: function (value) { return +value; },
    valueChanged: function (view, oldValue, newValue) {
        view.selectedPage = newValue;
    }
});
exports.showIndicatorProperty = new viewModule.Property({
    name: "showIndicator",
    defaultValue: true,
    valueConverter: viewModule.booleanConverter,
    valueChanged: function (view, oldValue, newValue) {
        view.showIndicator = newValue;
    }
});
exports.indicatorColorProperty = new viewModule.Property({
    name: "indicatorColor",
    equalityComparer: colorModule.Color.equals,
    valueConverter: function (value) { return new colorModule.Color(value); },
    valueChanged: function (view, oldValue, newValue) {
        view.indicatorColor = newValue;
    }
});
exports.indicatorColorUnselectedProperty = new viewModule.Property({
    name: "indicatorColorUnselected",
    equalityComparer: colorModule.Color.equals,
    valueConverter: function (value) { return new colorModule.Color(value); },
    valueChanged: function (view, oldValue, newValue) {
        view.indicatorColorUnselected = newValue;
    }
});
exports.indicatorOffsetProperty = new viewModule.Property({
    name: "indicatorOffset",
    defaultValue: "0,0",
    valueChanged: function (view, oldValue, newValue) {
        view.indicatorOffset = newValue;
    }
});

// iOS only
exports.autoPagingIntervalProperty = new viewModule.Property({
    name: "autoPagingInterval",
    defaultValue: 0,
    valueConverter: function (value) { return +value; },
    valueChanged: function (view, oldValue, newValue) {
        view.autoPagingInterval = newValue;
    }
});
exports.finiteProperty = new viewModule.Property({
    name: "finite",
    valueConverter: viewModule.booleanConverter,
    valueChanged: function (view, oldValue, newValue) {
        view.finite = newValue;
    }
});
exports.bounceProperty = new viewModule.Property({
    name: "bounce",
    valueConverter: viewModule.booleanConverter,
    valueChanged: function (view, oldValue, newValue) {
        view.bounce = newValue;
    }
});
exports.scrollEnabledProperty = new viewModule.Property({
    name: "scrollEnabled",
    valueConverter: viewModule.booleanConverter,
    valueChanged: function (view, oldValue, newValue) {
        view.scrollEnabled = newValue;
    }
});


// Android only
exports.indicatorAnimationProperty = new viewModule.Property({
    name: "indicatorAnimation",
    affectsLayout: true,
    valueChanged: function (view, oldValue, newValue) {
        view.indicatorAnimation = newValue;
    }
});
exports.indicatorAnimationDurationProperty = new viewModule.Property({
    name: "indicatorAnimationDuration",
    affectsLayout: true,
    valueConverter: function (value) { return +value; },
    valueChanged: function (view, oldValue, newValue) {
        view.indicatorAnimationDuration = newValue;
    }
});
exports.indicatorAlignmentProperty = new viewModule.Property({
    name: "indicatorAlignment",
    defaultValue: "BOTTOM",
    valueChanged: function (view, oldValue, newValue) {
        view.indicatorAlignment = newValue.toUpperCase();
    }
});
exports.indicatorRadiusProperty = new viewModule.Property({
    name: "indicatorRadius",
    affectsLayout: true,
    valueConverter: function (value) { return +value; },
    valueChanged: function (view, oldValue, newValue) {
        view.indicatorRadius = newValue;
    }
});
exports.indicatorPaddingProperty = new viewModule.Property({
    name: "indicatorPadding",
    affectsLayout: true,
    valueConverter: function (value) { return +value; },
    valueChanged: function (view, oldValue, newValue) {
        view.indicatorPadding = newValue;
    }
});

exports.itemsProperty.register(CarouselCommon);
exports.itemTemplateProperty.register(CarouselCommon);

exports.selectedPageProperty.register(CarouselCommon);
exports.autoPagingIntervalProperty.register(CarouselCommon);
exports.showIndicatorProperty.register(CarouselCommon);
exports.finiteProperty.register(CarouselCommon);
exports.bounceProperty.register(CarouselCommon);
exports.scrollEnabledProperty.register(CarouselCommon);
exports.indicatorColorProperty.register(CarouselCommon);
exports.indicatorColorUnselectedProperty.register(CarouselCommon);
exports.indicatorOffsetProperty.register(CarouselCommon);
exports.indicatorAnimationProperty.register(CarouselCommon);
exports.indicatorAnimationDurationProperty.register(CarouselCommon);
exports.indicatorAlignmentProperty.register(CarouselCommon);
exports.indicatorRadiusProperty.register(CarouselCommon);
exports.indicatorPaddingProperty.register(CarouselCommon);