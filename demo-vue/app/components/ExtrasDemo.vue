<template>
  <Page class="page">
    <ActionBar title="Carousel Extras Demo" />

    <ScrollView>
      <StackLayout>
        <StackLayout android:visibility="collapsed">
          <Label text="Auto-paging enabled with an interval of 3 seconds." textWrap="true" margin="10,5,0,5"></Label>
          <Label
            text="You can add the tap and change events. Tap event can be on any element innside the Carousel"
            textWrap="true"
            margin="10,5,0,5"
          ></Label>
          <Label
            text="Page-indicator can be turned on/off and its color changed"
            textWrap="true"
            margin="10,5,20,5"
          ></Label>
        </StackLayout>
        <StackLayout ios:visibility="collapsed">
          <Label
            text="You can add the tap and change events. Tap event can be on any element innside the Carousel"
            textWrap="true"
            margin="10,5,0,5"
          ></Label>
          <Label
            text="Page-indicator can have different animations and change color"
            textWrap="true"
            margin="10,5,20,5"
          ></Label>
        </StackLayout>

        <GridLayout height="300">
          <Carousel
            ref="myCarousel"
            debug="true"
            height="100%"
            width="100%"
            :items="myData"
            colow="white"
            @pageChanged="myChangePageEvent"
            indicatorColor="#9b5504"
            indicatorColorUnselected="#609b5504"
            ios:autoPagingInterval="3"
            android:indicatorAnimation="swap"
          >
            <CarouselItem
              v-for="(item, i) in myData"
              :key="i"
              verticalAlignment="middle"
              :backgroundColor="item.color"
              @tap="myTapPageEvent"
            >
              <GridLayout>
                <Image :src="item.image" stretch="aspectFill"></Image>
                <Label :text="item.title" horizontalAlignment="center" backgroundColor="#50000000" height="30"></Label>
              </GridLayout>
            </CarouselItem>
          </Carousel>
        </GridLayout>
        <Label
          text="Indicator animation type: 'swap'"
          textWrap="true"
          ios:visibility="collapsed"
          margin="10,0,0,0"
        ></Label>

        <Button
          text="Toggle indicator"
          @tap="toggleIndicator"
          margin="10,10,0,10"
          android:visibility="collapsed"
        ></Button>
        <Button text="Change indicator color" @tap="toggleColor" margin="10,10,0,10"></Button>
        <Label :text="'Selected page index: ' + currentPage" textWrap="true" margin="10,0,0,0"></Label>
        <Label :text="'Tapped page index: ' + tappedPage" textWrap="true" margin="0,0,0,0"></Label>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>
const carousel = require('nativescript-carousel');

export default {
  data() {
    return {
      myData: [
        { title: 'Slide 1', color: '#b3cde0', image: '~/assets/images/01.jpg' },
        { title: 'Slide 2', color: '#6497b1', image: '~/assets/images/02.jpg' },
        { title: 'Slide 3', color: '#005b96', image: '~/assets/images/03.jpg' },
        { title: 'Slide 4', color: '#03396c', image: '~/assets/images/04.jpg' }
      ],
      currentPage: 0,
      tappedPage: 0,
      indicatorEnabled: false
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
  created() {},
  methods: {
    myChangePageEvent(args) {
      console.log('current page: ', args.index);
      this.currentPage = args.index;
    },
    myTapPageEvent: function(args) {
      console.log('tap page: ', this.$refs.myCarousel.nativeView.selectedPage);
      this.tappedPage = this.$refs.myCarousel.nativeView.selectedPage;
    },
    toggleIndicator: function() {
      this.$refs.myCarousel.nativeView.showIndicator = !this.indicatorEnabled;
      this.indicatorEnabled = !this.indicatorEnabled;
    },
    toggleColor: function() {
      this.$refs.myCarousel.nativeView.indicatorColor = '#FED700';
      this.$refs.myCarousel.nativeView.indicatorColorUnselected = '#50FED700';
    }
  }
};
</script>

<style scoped>
p {
  color: #9b5504;
}
</style>
