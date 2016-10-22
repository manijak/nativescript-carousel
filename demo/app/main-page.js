var frameModule = require("ui/frame");
var imageModule = require("ui/image");

function pageLoaded(args) {
	var image1 = "https://raw.githubusercontent.com/NativeScript/sample-PhotoAlbum/master/app/res/05.jpg";
	var image2 = "https://raw.githubusercontent.com/NativeScript/sample-PhotoAlbum/master/app/res/06.jpg";
	var image3 = "https://raw.githubusercontent.com/NativeScript/sample-PhotoAlbum/master/app/res/07.jpg";
    var image4 = "https://raw.githubusercontent.com/NativeScript/sample-PhotoAlbum/master/app/res/08.jpg";
	var myImages = [image1, image2, image3, image4];
}
exports.pageLoaded = pageLoaded;


exports.carousel1 = function(args){
	var topmost = frameModule.topmost();
    var navigationEntry = {
        moduleName: "carousel1"
    };
    topmost.navigate(navigationEntry);
};

exports.carousel2 = function(args){
	var topmost = frameModule.topmost();
    var navigationEntry = {
        moduleName: "carousel2"
    };
    topmost.navigate(navigationEntry);
};

exports.carousel3 = function(args){
	var topmost = frameModule.topmost();
    var navigationEntry = {
        moduleName: "carousel3"
    };
    topmost.navigate(navigationEntry);
};
