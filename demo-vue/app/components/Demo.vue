<template>
  <Page class="page">
    <ActionBar class="action-bar" title="Carousel Vue Demo"/>

    <GridLayout rows="40, auto, 400, 50">
      <Label row="0" text="Text on the page in row 1 of grid" color="green" textWrap="true"></Label>
      
      <GridLayout row="2">
          <Carousel #carousel @pageChanged="myChangeEvent" ios:indicatorOffset="0,-10" ios:finite="true" ios:bounce="false" showIndicator="true" indicatorAnimation="SWAP"
              indicatorColor="#66ccff" indicatorColorUnselected="#cceeff">
              
              <CarouselItem backgroundColor="green">
                  <Label class="h2 text-center" color="white" textWrap="true" text="Page 1"></Label>
              </CarouselItem>
              <CarouselItem backgroundColor="orange">
                  <Label class="h2 text-center" color="white" textWrap="true" text="Page 2"></Label>
              </CarouselItem>

          </Carousel>
      </GridLayout>
      
      <!-- <Label row="3" text="After 5 seconds the indicator animation will change to WORM on ANDROID" textWrap="true"></Label> -->
    </GridLayout>
  </Page>
</template>

<script>
  const carousel = require("nativescript-carousel");

  export default {
    data() {
      return {
        message: "Fear not, young Skywalker"
      }
    },
    created() {
      
    },
    methods: {
      onTextRecognitionResult() {
        console.log("onTextRecognitionResult");
      },
	  myChangeEvent: function(args) {
		var changeEventText = 'Page changed to index: ' + args.index;
		console.log(changeEventText);
      },
    }
  }
</script>

<style scoped>
  ActionBar {
    background-color: #53ba82;
    color: #ffffff;
  }
  .message {
    font-size: 17;
    margin: 17;
    color: #53ba82;
  }
  Button.btn {
    font-size: 14;
    border-radius: 3;
    border-width: 2;
    border-color: #63d4a5;
    color: #63d4a5;
    padding: 12;
    margin: 16;
  }
</style>