<template>
  <Page class="page" @onloaded="onLoaded">
    <ActionBar title="Carousel Binding Demo" />

    <StackLayout>
      <Label
        text="Define a single CarouselItem element with the 'v-for' tag pointed at your array."
        textWrap="true"
        margin="10,0,50,0"
      />

      <GridLayout height="350">
        <Carousel
          ref="myCarousel"
          debug="true"
          height="100%"
          width="100%"
          color="white"
          @pageChanged="myChangePageEvent"
          android:indicatorAnimation="slide"
          indicatorColor="#fff"
          indicatorOffset="0, -10"
          showIndicator="true"
        >
          <CarouselItem
            v-for="(item, i) in myData"
            :key="i"
            :backgroundColor="item.color"
            verticalAlignment="middle"
            @tap="myTapPageEvent"
          >
            <GridLayout>
              <Image :src="item.image" stretch="aspectFill" />
              <Label :text="item.title" horizontalAlignment="center" backgroundColor="#50000000" height="30" />
            </GridLayout>
          </CarouselItem>
        </Carousel>
      </GridLayout>

      <Label text="Indicator animation type: 'slide'" textWrap="true" ios:visibility="collapsed" margin="10,0,0,0" />

      <Button text="Select page 3" @tap="selectPageThree" margin="10,10,0,10" />
      <Button text="Add page" @tap="addNewPage" margin="10,10,0,10" />
      <Label text="Tap the button to add more pages" textWrap="true" margin="10,10,0,10" />
    </StackLayout>
  </Page>
</template>

<script>
const carousel = require('nativescript-carousel');
import { Platform } from '@nativescript/core';

export default {
  data() {
    return {
      myData: [
        { title: 'Slide 1', color: '#b3cde0', image: '~/assets/images/01.jpg' },
        { title: 'Slide 2', color: '#6497b1', image: '~/assets/images/02.jpg' },
        { title: 'Slide 3', color: '#005b96', image: '~/assets/images/03.jpg' },
        { title: 'Slide 4', color: '#03396c', image: '~/assets/images/04.jpg' }
      ]
    };
  },
  computed: {
    hasItems() {
      return this.myData.length > 0;
    }
  },
  watch: {
    async myData(to) {
      await this.$nextTick();
      this.$refs.myCarousel.nativeView.refresh();
    }
  },
  methods: {
    onLoaded() {},
    myChangePageEvent(args) {
      var changeEventText = 'Changed to slide: ' + (args.index + 1);
      console.log(changeEventText);
    },
    myTapPageEvent: function(args) {
      console.log('Tapped page: ' + this.$refs.myCarousel.nativeView.selectedPage);
    },
    selectPageThree: function(args) {
      this.$refs.myCarousel.nativeView.selectedPage = 2;
    },
    addNewPage: function(args) {
      let itemList = [...this.myData];
      var pagenr = this.myData.length + 1;
      var color = '#' + ((Math.random() * 0xffffff) << 0).toString(16);
      itemList.push({ title: `Slide ${pagenr}`, color: color, image: '' });
      console.log('push item, update array');
      this.myData = itemList;

      this.$refs.myCarousel.nativeView.selectedPage = this.myData.length - 1;
    }
  }
};
</script>

<style scoped>
Page {
  background: linear-gradient(-45deg, #1d976c, #93f9b9);
}
</style>
