import { Injectable } from '@angular/core';
import { SlideItem } from './slideItem';

@Injectable()
export class ItemService {
  private items = new Array<SlideItem>(
    { pageNr: 1, title: 'Page 1', color: '#b3cde0', image: '~/assets/01.jpg' },
    { pageNr: 2, title: 'Page 2', color: '#6497b1', image: '~/assets/02.jpg' },
    { pageNr: 3, title: 'Page 3', color: '#005b96', image: '~/assets/03.jpg' },
    { pageNr: 4, title: 'Page 4', color: '#03396c', image: '~/assets/04.jpg' }
  );

  getItems(): SlideItem[] {
    return this.items;
  }

  getItem(id: number): SlideItem {
    return this.items.filter((item) => item.pageNr === id)[0];
  }
}
