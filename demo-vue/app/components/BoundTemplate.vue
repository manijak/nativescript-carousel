<template>
    <CarouselItem :backgroundColor="color" verticalAlignment="middle">
        <GridLayout @tap="myTapPageEvent">
            <Image :src="image" stretch="aspectFill" />
            <Label :text="title" horizontalAlignment="center" backgroundColor="#50000000" height="30" />
        </GridLayout>
    </CarouselItem>
</template>

