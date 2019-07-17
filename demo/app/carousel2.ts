import { Carousel } from 'nativescript-carousel';
import { Observable } from 'tns-core-modules/data/observable';
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';

let myCarousel: Carousel;
const pageData = new Observable();
var items = new ObservableArray([{ title: 'Slide 1', color: '#b3cde0', image: '~/res/01.jpg' },
  { title: 'Slide 2', color: '#6497b1', image: '~/res/02.jpg' },
  { title: 'Slide 3', color: '#005b96', image: '~/res/03.jpg' },
  { title: 'Slide 4', color: '#03396c', image: '~/res/04.jpg' }]);

export function onNavigatedTo(args) {
  var page = args.object;
  page.bindingContext = pageData;
  pageData.set('myData', items);
  
  myCarousel = page.getViewById('myCarousel');
}

export function selectPageThree() {
  if (!myCarousel) return;
  myCarousel.selectedPage = 2;
}

export function myChangeEvent(args) {
  var changeEventText = 'Changed to slide: ' + (args.index+1);
  console.log(changeEventText);
}

export function myTapEvent(args) {
  console.log('Tapped page: ' + myCarousel.selectedPage);
}

export function addNewPage(){
  var pagenr = items.length + 1;
  var color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
  items.push({ title: `Slide ${pagenr}`, color: color, image: '' });
  pageData.set('myData', items);

  myCarousel.selectedPage = items.length-1;
}

