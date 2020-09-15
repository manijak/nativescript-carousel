<template>
  <Page class="page">
    <ActionBar title="Carousel Static Demo" />

    <GridLayout class="carousel-layout-fix">
      <Carousel
        id="carousel"
        @pageChanged="myChangeEvent"
        ios:indicatorOffset="0,-30"
        ios:finite="true"
        ios:bounce="false"
        showIndicator="true"
        indicatorAnimation="SWAP"
        indicatorColor="#66ccff"
        indicatorColorUnselected="#cceeff"
        height="100%"
        width="100%"
        debug="true"
      >
        <CarouselItem id="slide1" verticalAlignment="middle">
          <Label text="Each slide is defined in the XML." textWrap="true" margin="30" />
          <Label text="Slide 1" backgroundColor="#50000000" horizontalAlignment="center"></Label>

          <Label
            text="Wrap the Carousel in a GridLayout in order to place the indicator on top (android)"
            textWrap="true"
            margin="30"
            ios:visibility="collapsed"
          />
        </CarouselItem>

        <CarouselItem id="slide2" verticalAlignment="middle">
          <Label
            text="'finite' is set to True. Carousel will stop at the last slide."
            textWrap="true"
            margin="30"
            android:visibility="collapsed"
          />
          <Label text="Indicator animation type: 'swap'" textWrap="true" ios:visibility="collapsed" margin="30" />
          <Label text="Slide 2" backgroundColor="#50000000" horizontalAlignment="center"></Label>
        </CarouselItem>

        <CarouselItem id="slide3" verticalAlignment="middle">
          <Label text="Carousel can be used in fullscreen, just set height to 100%" textWrap="true" margin="30" />
          <Label text="Slide 3" backgroundColor="#50000000" horizontalAlignment="center"></Label>
        </CarouselItem>

        <CarouselItem id="slide4" verticalAlignment="middle">
          <Label text="Enjoy using the Carousel plugin :)" textWrap="true" margin="30" />
          <Label text="Slide 4" backgroundColor="#50000000" horizontalAlignment="center"></Label>
        </CarouselItem>
      </Carousel>
    </GridLayout>
  </Page>
</template>

<script>
const carousel = require('nativescript-carousel');

export default {
  data() {
    return {
      message: 'Fear not, young Skywalker'
    };
  },
  created() {},
  methods: {
    onTextRecognitionResult() {
      console.log('onTextRecognitionResult');
    },
    myChangeEvent: function(args) {
      var changeEventText = 'Page changed to index: ' + args.index;
      console.log(changeEventText);
    }
  }
};
</script>

<style scoped>
#slide1 {
  background: linear-gradient(45deg, #f06f7e, #f34a30);
  vertical-align: center;
}

#slide2 {
  background: linear-gradient(-45deg, #1d976c, #93f9b9);
  vertical-align: center;
}

#slide3 {
  background: linear-gradient(45deg, #1d2b64, #f8cdda);
  vertical-align: center;
}

#slide4 {
  background: linear-gradient(tobottom, #003973, #e5e5be);
  vertical-align: center;
}

.carousel-layout-fix {
  padding: 0.1 0;
  margin: -0.1 0;
}
</style>
