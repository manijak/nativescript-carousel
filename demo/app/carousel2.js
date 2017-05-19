var observableModule = require("data/observable");
var pageData = new observableModule.Observable();
var myDataArray = [
	{title:"Slide 1", color: "#b3cde0", image:"https://raw.githubusercontent.com/manijak/nativescript-photoviewer/master/demo/res/01.jpg"},
	{title:"Slide 2", color: "#6497b1", image:"https://raw.githubusercontent.com/manijak/nativescript-photoviewer/master/demo/res/02.jpg"},
	{title:"Slide 3", color: "#005b96", image:"https://raw.githubusercontent.com/manijak/nativescript-photoviewer/master/demo/res/03.jpg"},
	{title:"Slide 4", color: "#03396c", image:"https://raw.githubusercontent.com/manijak/nativescript-photoviewer/master/demo/res/04.jpg"}
	/*{title:"Slide 5", color: "#011f4b", image: ""}*/
];
var myCarousel = null;
pageData.set("myDataArray", myDataArray);

function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = pageData;
	myCarousel = page.getViewById("myCarousel");
}
exports.pageLoaded = pageLoaded;

exports.selectPageEvent = function(args){
    if(!myCarousel) return;
    myCarousel.selectedPage = 2;
}

exports.myScrollingEvent = function(args){
	console.log("Scrolling: " + args.state.offset);
}