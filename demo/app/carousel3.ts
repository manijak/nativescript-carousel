import { Carousel, IndicatorAnimation } from 'nativescript-carousel';
import { Observable } from 'tns-core-modules/data/observable';
import { isAndroid } from 'tns-core-modules/platform';
import * as dialogs from 'tns-core-modules/ui/dialogs';

let myCarousel: Carousel = null;
const pageData = new Observable();
var myDataArray = [
  { title: 'Slide 1', color: '#b3cde0', image: '~/res/01.jpg' },
  { title: 'Slide 2', color: '#6497b1', image: '~/res/02.jpg' },
  { title: 'Slide 3', color: '#005b96', image: '~/res/03.jpg' },
  { title: 'Slide 4', color: '#03396c', image: '~/res/04.jpg' }
];
pageData.set('myDataArray', myDataArray);

exports.pageLoaded = args => {
  const page = args.object;
  page.bindingContext = pageData;
  myCarousel = page.getViewById('myCarousel');

  // Change the indicator animation on Android after 5 seconds
  setTimeout(() => {
    if (isAndroid) {
      myCarousel.indicatorAnimation = IndicatorAnimation.THIN_WORM;
      dialogs.alert({
        message: 'Indicator Animation changed to THIN_WORM.',
        okButtonText: 'Okay'
      });
    }
  }, 5000);
};

exports.myChangeEvent = args => {
  pageData.set('changeEventText', `Page changed to index = ${args.index}`);
};

exports.mySelectedEvent = args => {
  pageData.set('tappedViewText', `Tapped index = ${args.index}`);
};

let indicatorEnabled = true;
exports.toggleIndicator = args => {
  if (!myCarousel) return;
  myCarousel.showIndicator = !indicatorEnabled;
  indicatorEnabled = !indicatorEnabled;
};

exports.toggleColor = args => {
  if (!myCarousel) return;
  myCarousel.indicatorColor = '#FED700';
  myCarousel.indicatorColorUnselected = '#50FED700';
};
