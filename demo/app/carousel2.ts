import { Observable, ObservableArray } from '@nativescript/core';
import { Carousel } from 'nativescript-carousel';

let myCarousel: Carousel;
const pageData = new Observable();

var items = new ObservableArray([
  { title: 'Slide 1', color: '#b3cde0', image: '~/assets/01.jpg' },
  { title: 'Slide 2', color: '#6497b1', image: '~/assets/02.jpg' },
  { title: 'Slide 3', color: '#005b96', image: '~/assets/03.jpg' },
  { title: 'Slide 4', color: '#03396c', image: '~/assets/04.jpg' },
]);

export function pageLoaded(args) {
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
  var changeEventText = 'Changed to slide: ' + (args.index + 1);
  console.log(changeEventText);
}

export function myTapEvent(args) {
  console.log('Tapped page: ' + (myCarousel.selectedPage + 1));
}

export function addNewPage() {
  var pagenr = items.length + 1;
  var color = '#' + ((Math.random() * 0xffffff) << 0).toString(16);
  items.push({ title: `Slide ${pagenr}`, color: color, image: '' });

  myCarousel.selectedPage = items.length - 1;
}
