import { Carousel } from 'nativescript-carousel';
import { Observable } from 'tns-core-modules/data/observable';

let myCarousel: Carousel;
const pageData = new Observable();
pageData.set('myDataArray', [
  { title: 'Slide 1', color: '#b3cde0', image: '~/res/01.jpg' },
  { title: 'Slide 2', color: '#6497b1', image: '~/res/02.jpg' },
  { title: 'Slide 3', color: '#005b96', image: '~/res/03.jpg' },
  { title: 'Slide 4', color: '#03396c', image: '~/res/04.jpg' }
]);

exports.pageLoaded = args => {
  var page = args.object;
  page.bindingContext = pageData;
  myCarousel = page.getViewById('myCarousel');
};

exports.selectPageEvent = args => {
  if (!myCarousel) return;
  myCarousel.selectedPage = 2;
};

exports.myScrollingEvent = args => {
  console.log('Scrolling: ' + args.state.offset);
};
