---
layout: post
title: High-performance image loading in OS X 
---

> I’ve been diving into some heavy Mac OS X programming with Cocoa for the past few weeks, so I thought I should start sharing some of the many tips and techniques I’ve discovered along the way.

Many – if not most – Mac applications involve the loading and display of images. The difference in how you author such applications depends on how many images you have to load, and how frequently you have to move or display them. If all you have to do in your application is display a few static local images, then you can probably use `NSImageView` on the main thread and call it a day. This tutorial isn’t for you. 

If, however, you have to rapidly load and display hundreds or thousands of remote images on a moving canvas, `NSImageView` simply won’t cut it. Instead, you need multiple threads and the power of Core Graphics and Core Animation. These are amazing tools, but the strategies and techniques you employ in their use can mean the difference between a stuttering, unresponsive UI and the kind of smooth, fluid application experience Mac users have come to expect and love.

Here are four simple techniques I’ve found that can help ensure your app is as performant as possible when it comes to loading and displaying images:

## Use Core Animation Layers
Apple advises against large display list trees. This means that using hundreds of `NSImageViews` at once is simply a poor choice if you’re looking for any kind of performance. Instead, use [`CALayers`](https://developer.apple.com/library/mac/#documentation/graphicsimaging/reference/CALayer_class/Introduction/Introduction.html). `CALayers` are much lighter than `NSViews`, and more importantly, they are mapped to the GPU, which means that the graphics processor will do all of the heavy lifting, freeing the CPU for other things.

Displaying an image in a `CALayer` is relatively easy. Create a layer-backed `NSView` (using `setWantsLayer:`), then add as many sublayers to your view’s layer as you like.

In Snow Leopard, Apple added the ability to set `CALayer`’s contents property an `NSImage` instance, making it stupid simple to draw an image to a layer. *But beware:* this simple functionality comes at a cost, and is only advisable for smaller images. I’ll explain more in a bit.

## Load in the Background
The main thread of your application is responsible for responding and rendering the user interface. This means that any intensive processing that happens on the main thread will make your app slow or unresponsive. When it comes to loading and displaying the images in your `CALayers`, push as much work as you can off of the main thread. This means, first and foremost, *do not* load your images on the main thread. `NSImage` and `NSData`’s loading methods are synchronous and blocking. Instead, load your images in the background. The best and easiest way to do this is to use `NSOperationQueue.`

`NSOperationQueue` allows you to batch your background work into individual “operations” and then send submit them to a magical queue that will take care of prioritizing the tasks and executing them in a series of background threads. As of Snow Leopard, `NSOperationQueue` makes use of [“Grand Central Dispatch (GCD),”](http://developer.apple.com/library/ios/#documentation/Performance/Reference/GCD_libdispatch_Ref/Reference/reference.html) Apple’s system for multicore support in iOS and OS X, so there’s really no reason not to use it if you can. 

The code to use `NSOperationQueue` for image loading looks something like this (assuming you’re using ARC):

{% highlight objc %}
NSImage *image;
NSOperationQueue *loadQueue = [[NSOperationQueue alloc] init];
[loadQueue setMaxConcurrentOperationCount:2];

- (void)startLoad:(NSURL *)url
{
  [loadQueue setSuspended:YES];

  NSInvocationOperation *operation;
  operation = [[NSInvocationOperation alloc] 
    initWithTarget:self 
          selector:@selector(loadImage:)
            object:url];

  [itemLoadQueue addOperation:operation];
  [itemLoadQueue setSuspended:NO];
}

- (void)loadImage:(NSURL *)url
{
  image = [[NSImage alloc] initWithContentsOfURL:url]; 
  [self performSelectorOnMainThread:@selector(displayImage) 
                          withObject:nil
                       waitUntilDone:NO];
}

- (void)displayImage
{
  [someLayer setContents:image]; 
}
{% endhighlight %}

A few things to note here:

* None of the above handles error checking in case of corrupted or incomplete image downloads. As they say in textbooks, I’ll leave that as an exercise for the reader. Hopefully this is enough to get started. 
* I’ve set the `maximumConcurrentOperationCount` on the queue to a relatively low number. Without being set, the queue will create as many concurrent operations as possible, spawning off so many threads that it often becomes a performance bottleneck if there are many items in the queue. You many want to tweak this value to your particular use case.
* Pay attention to the use of `performSelectorOnMainThread.` **UI updates must happen on the main thread,** and this includes setting a layer’s contents property. If you don’t, the layer will not update immediately, and will instead update at some unknown time (or not at all). Alternatively, you can use `[CATransaction flush]` after setting the contents on the background thread to achive the same effect. This will force the layer to render (on the main thread), but I find `performSelectorOnMainThread` to be both a better practice and more explicit.

For more information on `NSOperationQueue`, see [Ray Wenderlich’s extensive tutorial](http://www.raywenderlich.com/19788/how-to-use-nsoperations-and-nsoperationqueues).

## Use Core Graphics Images Where Necessary
Remember when I said that setting a `CALayer`’s contents property to a large `NSImage` is unadvisable? Here’s why:

When you set a `CALayer`’s contents property, you are replacing the layer’s the “backing store” with your image content, immediately changing the appearance of the layer. Prior to OS X 10.6, you had to set the contents of a layer to a Core Graphics image (`CGImageRef`) in order for this to work. With Snow Leopard and later, you can now set the contents to an `NSImage` instance.

While this is a nice feature, it has a flaw: `CALayers` “live” on the GPU, while `NSImages` do not. There seems to be a performance cost as the `NSImage` is “pushed” to the GPU in order to be rendered. For small images, this cost is often unnoticeable. But for large images it becomes readily apparent.

Because a `CALayer`’s contents have to be set on the main thread, setting them to a sufficiently large `NSImage` will cause the UI to “hiccup” as the data is pushed to the GPU. The trick instead is to do this “pushing” in the background by generating a `CGImageRef` as part of your `NSInvocationOperation` task. How do you do this? Put something like the following in your image loading method:

{% highlight objc %}
NSGraphicsContext *context;
context = [[NSGraphicsContext currentContext] graphicsPort];
NSRect rect = NSMakeRect(0, 0, image.width, image.height);
cgImage = [image CGImageForProposedRect:&rect
                                 context:context
                                   hints:NULL];
{% endhighlight %}

Then, in the main thread, set the contents of your `CALayer` to the `CGImageRef` instance instead of the `NSImage` instance. You will need to use a bridged-cast:

{% highlight objc %}
[layer setContents:(__bridge id)(cgImage)]
{% endhighlight %}

Note that `CGImageForProposedRect` manages the `CGImageRef` for you, so there is no need to manually free it. This means do not use `CFBridgingRelease` when setting the contents.

## Cheat with CAAnimation’s Fill Mode
Even with small images, sometimes the performance penalty of using an `NSImage` for a `CALayer`’s contents is noticeable. One “hack” I’ve discovered is to use Core Animation to set the contents as part of an animation’s `fillMode`. I’m not entirely sure why this works, but it does. 

Generally speaking, using Core Animation’s `fillMode` and and `removedOnCompletion` properties to retain the effects of an animation is bad practice. It causes the presentation layer of the layer to permanently hang around, and can give unexpected results when checking a layer’s `frame` or `bounds` after animating its position or transform. Perhaps not surprisingly, this is probably why this hack works: the presentation layer’s backing store is changed instead of the layer’s actual backing store. (Experts: feel free to enlighten me.)

So if all you are changing is a layer’s contents, this may be a worthwhile hack. Use it in the main thread:

{% highlight objc %}
CABasicAnimation *crossFadeAnimation;
crossFadeAnimation = [CABasicAnimation animationWithKeyPath:@"contents"];
[crossFadeAnimation setDuration:0.25];
[crossFadeAnimation setFromValue:self.contents];
[crossFadeAnimation setToValue:image];
[crossFadeAnimation setFillMode:kCAFillModeForwards];
[crossFadeAnimation setRemovedOnCompletion:NO];
[layer addAnimation:crossFadeAnimation forKey:@"contents"];
{% endhighlight %}

And there you have it. Just a few tips and tricks I have learned in the past few weeks. If you find any errors or misinformation, feel free to write. 
