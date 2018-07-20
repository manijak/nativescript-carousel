import * as common from './index.common';
export class Carousel extends common.CarouselCommon {}
export class CarouselItem extends common.CarouselItem {}

/**
 * ** ANDROID ONLY ** - Enum to indicator animation type.
 */
export enum IndicatorAnimation {
    'NONE' = 'NONE',
    'COLOR' = 'COLOR',
    'SLIDE' = 'SLIDE',
    'WORM' = 'WORM',
    'SCALE' = 'SCALE',
    // 'SCALE_DOWN' = 'SCALE_DOWN', // available with native lib 1.0.0 version
    'THIN_WORM' = 'THIN_WORM',
    'DROP' = 'DROP',
    'SWAP' = 'SWAP'
  }
  