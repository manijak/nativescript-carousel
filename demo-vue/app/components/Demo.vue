<template>
  <Page class="page">
    <ActionBar class="action-bar" title="Carousel Vue Demo"/>

    <GridLayout class="grid-layout-fix" rows="*">
        <Carousel #carousel @pageChanged="myChangeEvent" ios:indicatorOffset="0,-10" ios:finite="true" ios:bounce="false" showIndicator="true" indicatorAnimation="SWAP"
            indicatorColor="#66ccff" indicatorColorUnselected="#cceeff" height="100%" width="100%" backgroundColor="#fed700" debug="true">
            
            <CarouselItem #slide1 verticalAlignment="middle">
                <Label text="Each slide is defined in the XML." textWrap="true" margin="30" />
                <Label text="Slide 1" backgroundColor="#50000000" horizontalAlignment="center"></Label>
            </CarouselItem>

            <CarouselItem #slide2 verticalAlignment="middle">
                <Label text="'finite' is set to True. Carousel will stop at the last slide." textWrap="true" margin="30" android:visibility="collapsed" />
                <Label text="Slide 2" backgroundColor="#50000000" horizontalAlignment="center"></Label>
            </CarouselItem>

            <CarouselItem #slide3 verticalAlignment="middle">
                <Label text="Indicator animation type: 'swap'" textWrap="true" ios:visibility="collapsed" margin="30"/>
                <Label text="In order to use the Carousel in full height & widt, wrap in in a Layout and add slight padding (check the css class)." textWrap="true" android:visibility="collapsed" margin="30"/>
                <Label text="Slide 3" backgroundColor="#50000000" horizontalAlignment="center"></Label>
            </CarouselItem>

            <CarouselItem #slide4 verticalAlignment="middle">
                <Label text="Enjoy using the Carousel plugin :)" textWrap="true" margin="30"/>
                <Label text="Slide 4" backgroundColor="#50000000" horizontalAlignment="center"></Label>
            </CarouselItem>

        </Carousel>
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

  #slide1 {
    background: linear-gradient(45deg, #eb3349, #f45c43);
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

  .carousel-layout-fix{
    padding: 0.1 0;
    margin: -0.1 0;
  }
</style>