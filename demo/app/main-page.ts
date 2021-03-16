import { Frame } from '@nativescript/core';

export function onNavigatedTo() {}

export function carousel1() {
  Frame.topmost().navigate({
    moduleName: 'carousel1',
  });
}

export function carousel2() {
  Frame.topmost().navigate({
    moduleName: 'carousel2',
  });
}

export function carousel3() {
  Frame.topmost().navigate({
    moduleName: 'carousel3',
  });
}
