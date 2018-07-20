import { topmost } from 'tns-core-modules/ui/frame';

exports.pageLoaded = () => {
  const image1 = 'https://raw.githubusercontent.com/NativeScript/sample-PhotoAlbum/master/app/res/05.jpg';
  const image2 = 'https://raw.githubusercontent.com/NativeScript/sample-PhotoAlbum/master/app/res/06.jpg';
  const image3 = 'https://raw.githubusercontent.com/NativeScript/sample-PhotoAlbum/master/app/res/07.jpg';
  const image4 = 'https://raw.githubusercontent.com/NativeScript/sample-PhotoAlbum/master/app/res/08.jpg';
  const myImages = [image1, image2, image3, image4];
};

exports.carousel1 = () {
  topmost().navigate({
    moduleName: 'carousel1'
  });
};

exports.carousel2 = () => {
  topmost().navigate({
    moduleName: 'carousel2'
  });
};

exports.carousel3 = () => {
  topmost().navigate({
    moduleName: 'carousel3'
  });
};
