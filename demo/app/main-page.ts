import { topmost } from 'tns-core-modules/ui/frame';

export function onNavigatedTo() {}

export function carousel1() {
  topmost().navigate({
    moduleName: 'carousel1'
  });
}

export function carousel2() {
  topmost().navigate({
    moduleName: 'carousel2'
  });
}

export function carousel3() {
  topmost().navigate({
    moduleName: 'carousel3'
  });
}
