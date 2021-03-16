@NativeClass()
declare class DKCarouselItem extends NSObject {

	static alloc(): DKCarouselItem; // inherited from NSObject

	static new(): DKCarouselItem; // inherited from NSObject

	userInfo: any;
}

@NativeClass()
declare class DKCarouselURLItem extends DKCarouselItem {

	static alloc(): DKCarouselURLItem; // inherited from NSObject

	static new(): DKCarouselURLItem; // inherited from NSObject

	imageUrl: string;
}

@NativeClass()
declare class DKCarouselView extends UIView {

	static alloc(): DKCarouselView; // inherited from NSObject

	static appearance(): DKCarouselView; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): DKCarouselView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): DKCarouselView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): DKCarouselView; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): DKCarouselView; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): DKCarouselView; // inherited from UIAppearance

	static new(): DKCarouselView; // inherited from NSObject

	bounce: boolean;

	defaultImage: UIImage;

	finite: boolean;

	indicatorIsVisible: boolean;

	indicatorOffset: CGPoint;

	readonly indicatorSize: CGSize;

	indicatorTintColor: UIColor;

	indicatorTintColorUnselected: UIColor;

	readonly numberOfItems: number;

	readonly pageControl: UIPageControl;

	pause: boolean;

	scrollEnabled: boolean;

	selectedPage: number;

	setAutoPagingForInterval(timeInterval: number): void;

	setDidChangeBlock(didChangeBlock: (p1: DKCarouselView, p2: number) => void): void;

	setDidScrollBlock(didScrollBlock: (p1: DKCarouselView, p2: number) => void): void;

	setDidSelectBlock(didSelectBlock: (p1: DKCarouselItem, p2: number) => void): void;

	setItems(items: NSArray<any> | any[]): void;
}

declare class DKCarouselViewItem extends DKCarouselItem {

	static alloc(): DKCarouselViewItem; // inherited from NSObject

	static new(): DKCarouselViewItem; // inherited from NSObject

	view: UIView;
}

declare var DKCarouselViewVersionNumber: number;

declare var DKCarouselViewVersionString: interop.Reference<number>;
