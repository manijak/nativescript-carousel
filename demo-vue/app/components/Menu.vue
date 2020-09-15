<template>
  <Page class="page">
    <ActionBar class="action-bar" title="Carousel Vue Demo" />

    <StackLayout>
      <Label text="Tap buttons to see Carousel in action" textWrap="true" margin="10,0,20,0" />
      <Button class="btn" text="Static Carousel" @tap="carouselStatic" />
      <Button class="btn" text="Data-Bound Carousel" @tap="carouselBound" />
      <Button class="btn" text="Extras & Events" @tap="carouselExtras" />

      <Image src="~/assets/images/vue-logo.png" width="66" margin="20,0,0,0"></Image>
    </StackLayout>
  </Page>
</template>

<script>
import StaticDemo from './StaticDemo';
import BoundDemo from './BoundDemo';
import ExtrasDemo from './ExtrasDemo';

export default {
  //data() {},
  created() {},
  methods: {
    carouselStatic() {
      this.$navigateTo(StaticDemo);
    },
    carouselBound() {
      this.$navigateTo(BoundDemo);
    },
    carouselExtras() {
      this.$navigateTo(ExtrasDemo);
    }
  }
};
</script>

<style scoped>
ActionBar {
  background-color: #53ba82;
  color: #ffffff;
}
label {
  text-align: center;
}
.btn {
  font-size: 16;
  border-radius: 2;
  background-color: #63d4a5;
  color: #fff;
  margin: 16;
}
</style>
