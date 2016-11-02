var observableModule = require("data/observable");
var colorModule = require("color");
var Color = colorModule.Color;
var pageData = new observableModule.Observable();
var myDataArray = [
	{title:"Slide 1", color: "#b3cde0", image:"https://raw.githubusercontent.com/manijak/nativescript-photoviewer/master/demo/res/01.jpg"},
	{title:"Slide 2", color: "#6497b1", image:"https://raw.githubusercontent.com/manijak/nativescript-photoviewer/master/demo/res/02.jpg"},
	{title:"Slide 3", color: "#005b96", image:"https://raw.githubusercontent.com/manijak/nativescript-photoviewer/master/demo/res/03.jpg"},
	{title:"Slide 4", color: "#03396c", image:"https://raw.githubusercontent.com/manijak/nativescript-photoviewer/master/demo/res/04.jpg"}
];
pageData.set("myDataArray", myDataArray);
var myCarousel = null;

exports.pageLoaded = function(args) {
    var page = args.object;
    page.bindingContext = pageData;

    myCarousel = page.getViewById("myCarousel");
}

exports.myChangeEvent = function(args){
    var changeEventText = "Page changed to index: " + args.index;
    pageData.set("changeEventText", changeEventText);
}

exports.mySelectedEvent = function(args){
    var tappedViewText = "Tapped index: " + args.index;
    pageData.set("tappedViewText", tappedViewText);
}
var indicatorEnabled = true;
exports.toggleIndicator = function(args){
    if(!myCarousel) return;
    myCarousel.showIndicator = !indicatorEnabled;
    indicatorEnabled = !indicatorEnabled;
}
exports.toggleColor = function(args){
    if(!myCarousel) return;
    myCarousel.indicatorColor = "#FED700";
    myCarousel.indicatorColorUnselected = "#50FED700";
}