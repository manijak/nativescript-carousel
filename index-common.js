"use strict";
var absolute_layout = require('ui/layouts/absolute-layout');
var viewModule = require("tns-core-modules/ui/core/view");
var weakEvents = require("ui/core/weak-event-listener");
var observableArray = require("data/observable-array");
var types = require("utils/types");
var colorModule = require('color');

var CarouselCommon = (function (_super) {
    __extends(CarouselCommon, _super);
    function CarouselCommon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CarouselCommon;
}(absolute_layout.AbsoluteLayout));
exports.CarouselCommon = CarouselCommon;

// Common
exports.itemTemplateProperty = new viewModule.Property({
    name: "itemTemplate", 
    affectsLayout: true, 
    valueChanged: function (target) {
        target.refresh();
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
    valueConverter: function (value) { return +value; }
});
exports.showIndicatorProperty = new viewModule.Property({
    name: "showIndicator",
    defaultValue: true,
    valueConverter: viewModule.booleanConverter
});
exports.indicatorColorProperty = new viewModule.Property({
    name: "indicatorColor",
    defaultValue: undefined,
    valueConverter: function (value) { return new colorModule.Color(value); }
});
exports.indicatorColorUnselectedProperty = new viewModule.Property({
    name: "indicatorColorUnselected",
    defaultValue: undefined,
    valueConverter: function (value) { return new colorModule.Color(value); }
});

// iOS only
exports.autoPagingIntervalProperty = new viewModule.Property({
    name: "autoPagingInterval",
    defaultValue: 0,
    valueConverter: function (value) { return +value; }
});
exports.finiteProperty = new viewModule.Property({
    name: "finite",
    defaultValue: undefined,
    valueConverter: viewModule.booleanConverter
});
exports.bounceProperty = new viewModule.Property({
    name: "bounce",
    defaultValue: undefined,
    valueConverter: viewModule.booleanConverter
});
exports.scrollEnabledProperty = new viewModule.Property({
    name: "scrollEnabled",
    defaultValue: undefined,
    valueConverter: viewModule.booleanConverter
});

exports.indicatorOffsetProperty = new viewModule.Property({
    name: "indicatorOffset",
    defaultValue: undefined
});


// Android only
exports.indicatorAnimationProperty = new viewModule.Property({
    name: "indicatorAnimation",
    defaultValue: undefined
});
exports.indicatorAnimationDurationProperty = new viewModule.Property({
    name: "indicatorAnimationDuration",
    defaultValue: undefined,
    valueConverter: function (value) { return +value; }
});
exports.indicatorAlignmentProperty = new viewModule.Property({
    name: "indicatorAlignment",
    defaultValue: "BOTTOM"
});
exports.indicatorRadiusProperty = new viewModule.Property({
    name: "indicatorRadius",
    defaultValue: undefined,
    valueConverter: function (value) { return +value; }
});
exports.indicatorPaddingProperty = new viewModule.Property({
    name: "indicatorPadding",
    defaultValue: undefined,
    valueConverter: function (value) { return +value; }
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