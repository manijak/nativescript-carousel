var observableModule = require("data/observable");
var pageData = new observableModule.Observable();
var myDataArray = [
	{title:"Slide 1", color: "#b3cde0", image:"~/res/01.jpg"},
	{title:"Slide 2", color: "#6497b1", image:"~/res/02.jpg"},
	{title:"Slide 3", color: "#005b96", image:"~/res/03.jpg"},
	{title:"Slide 4", color: "#03396c", image:"~/res/04.jpg"}
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