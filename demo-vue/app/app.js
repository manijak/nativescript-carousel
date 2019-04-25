import Vue from "nativescript-vue";
import Demo from "./components/Demo";

Vue.registerElement('Carousel', () => require('nativescript-carousel').Carousel);
Vue.registerElement('CarouselItem', () => require('nativescript-carousel').CarouselItem);

new Vue({
    template: `
        <Frame>
            <Demo />
        </Frame>`,

    components: {
        Demo
    }
}).$start();
