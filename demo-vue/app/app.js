import Vue from 'nativescript-vue';
import Menu from './components/Menu';

Vue.config.silent = false;

Vue.registerElement('Carousel', () => require('nativescript-carousel').Carousel);
Vue.registerElement('CarouselItem', () => require('nativescript-carousel').CarouselItem);

new Vue({
  template: `
        <Frame>
            <Menu />
        </Frame>`,

  components: {
    Menu
  }
}).$start();
