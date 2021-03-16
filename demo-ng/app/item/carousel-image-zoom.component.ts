import { Component, OnInit } from '@angular/core';
import { PanGestureEventData, PinchGestureEventData, Size, View, GestureEventData, Page } from '@nativescript/core';
import { animationFrameScheduler, interval, defer, Subscription } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';

// animation stuff
const cubicInOut = (t) => t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

const timeElapsed = defer(() => {
  const start = animationFrameScheduler.now();
  return interval(1).pipe(map(() => Math.floor((Date.now() - start))));
});

const duration = (totalMs) =>
  timeElapsed.pipe(
    map(elapsedMs => elapsedMs / totalMs),
    takeWhile(t => t <= 1)
  )
  
@Component({
  selector: 'ns-carousel-image-zoom',
  moduleId: module.id,
  templateUrl: './carousel-image-zoom.html'
})
export class CarouselImageZoomComponent implements OnInit {
    
  protected readonly MAX_SCALE: number = 4;
  protected startScale: number = 1;
  protected currentPageIndex: number = 0;
  protected prevDeltaX: number = 0;
  protected prevDeltaY: number = 0;
  public scrollEnabled: boolean = false;

  constructor(private page: Page) {}

  ngOnInit() {}

  /**
   * Sample images 
   * Thanks to https://picsum.photos/
   */
  public getImages(): string[] {
    return [
      'https://picsum.photos/id/237/1600/1200',
      'https://picsum.photos/id/511/1200/1600',
      'https://picsum.photos/id/33/1600/1200',
      'https://picsum.photos/id/22/1600/1200',
      'https://picsum.photos/id/77/1600/1200'
    ];
  }


  /**
   * Just pinch zooming.
   * Max ZoomFactor can be specified by MAX_SCALE
   * @param args 
   */
  protected onPinch(args: PinchGestureEventData) {
    const imageView = this.page.getViewById<View>('image'+this.currentPageIndex);
    if (args.state === 1) {
      this.startScale = imageView.scaleX;
    } else if (args.scale && args.scale !== 1) {
      let scale = Math.min(Math.max(this.startScale * args.scale, 1), this.MAX_SCALE);
      imageView.scaleX = scale;
      imageView.scaleY = scale;
    }
  }

  /**
   * DoubleTap to Zoom to MAX_SCALE or Initial scale
   * @param args 
   */
  protected onDoubleTap(args: GestureEventData) {
    const imageView = this.page.getViewById<View>('image'+this.currentPageIndex);

    const startScale = imageView.scaleX;
    const targetScale = startScale !== 1 ? 1 : this.MAX_SCALE;
    const startTranslateX = imageView.translateX;
    const startTranslateY = imageView.translateY;

    this.animate(300,
      current => {
        let scale = this.lerp(startScale, targetScale, current);
        imageView.scaleX = scale;
        imageView.scaleY = scale;
        imageView.translateX = this.lerp(startTranslateX, 0, current);
        imageView.translateY = this.lerp(startTranslateY, 0, current);
      }, () => {
        imageView.scaleX = targetScale;
        imageView.scaleY = targetScale;
        imageView.translateX = 0;
        imageView.translateY = 0;
      },
      err => console.error(err),
    );

  }

  /**
   * Pan the image in its container
   * @param args 
   */
  protected onPan(args: PanGestureEventData) {
    const container = args.view as View;
    const imageView = this.page.getViewById<View>('image'+this.currentPageIndex);

    if (args.state !== 2) {
      this.prevDeltaX = 0;
      this.prevDeltaY = 0;
    } else {
      const desiredX = imageView.translateX + (args.deltaX - this.prevDeltaX);
      const desiredY = imageView.translateY + (args.deltaY - this.prevDeltaY);

      const { x, y } = this.calcClampedImageCoordinates(
        desiredX,
        desiredY,
        container.getActualSize(),
        imageView
      );

      imageView.translateX = x;
      imageView.translateY = y;

      this.prevDeltaX = args.deltaX;
      this.prevDeltaY = args.deltaY;
    }
    
  }

  /**
   * on page change reset the previous image scale/translate
   * @param args 
   */
  public pageChangedEvent(args) {  
    const imageView = this.page.getViewById<View>('image'+this.currentPageIndex);
    const startScale = imageView.scaleX;
    const startTranslateX = imageView.translateX;
    const startTranslateY = imageView.translateY;

    this.animate(300,
      current => {
        const scale = this.lerp(startScale, 1, current);
        imageView.scaleX = scale;
        imageView.scaleY = scale;
        imageView.translateX = this.lerp(startTranslateX, 0, current);
        imageView.translateY = this.lerp(startTranslateY, 0, current);
      }, () => {
        imageView.scaleX = 1;
        imageView.scaleY = 1;
        imageView.translateX = 0;
        imageView.translateY = 0;
      },
      err => console.error(err),
    );

    this.currentPageIndex = args.index;
  }

  /**
   * Clamp the image translation to its container borders
   * Enable Carousel swipe when element touches "edge of container"
   * @param x the translate factor in x direction
   * @param y the translate factor in y direction
   * @param containerSize the actual size of the image container
   * @param imageView the image
   */
  protected calcClampedImageCoordinates(
    x: number,
    y: number,
    containerSize: Size,
    imageView: View
  ): { x: number; y: number } {

    let imageSize = imageView.getActualSize();
    const currWidth = imageSize.width * imageView.scaleX;
    const currHeight = imageSize.height * imageView.scaleY;

    const xOffset = Math.max(0, (currWidth - containerSize.width) * 0.5);
    const translateXmax = +xOffset;
    const translateXmin = -xOffset;

    const yOffset = Math.max(0, (currHeight - containerSize.height) * 0.5);
    const translateYmax = +yOffset;
    const translateYmin = -yOffset;

    if (x <= translateXmin) {
      this.scrollEnabled = true;
    } else if (x >= translateXmax) {
      this.scrollEnabled = true;
    } else {
      this.scrollEnabled = false;
    }

    return {
      x: Math.min(Math.max(x, translateXmin), translateXmax),
      y: Math.min(Math.max(y, translateYmin), translateYmax)
    };
  }

  /**
   * Small helper to do an animation
   * @param animationDuration duration of the animation in MS
   * @param step is called during animation
   * @param finished is called when animation finished
   * @param error is called in case of error
   */
  protected animate(animationDuration: number, step: (number) => void, finished: () => void, error: (any) => void): Subscription {
    return duration(animationDuration).pipe(
      map(cubicInOut)
    ).subscribe({ next: step, error: error, complete: finished });
  }

  /**
   * Interpolates from start to end using factor
   * @param start start value
   * @param end to value
   * @param factor interpolation factor
   */
  protected lerp(start: number, end: number, factor: number): number {
    return (1 - factor) * start + factor * end;
  }
}
