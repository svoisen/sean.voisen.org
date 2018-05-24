---
layout: post
title: Learning FRP with Bacon.js by Way of Underscore
---

[Functional Reactive Programming](http://en.wikipedia.org/wiki/Functional_reactive_programming) (FRP) can be difficult subject matter to grasp, particularly for programmers new to both functional and reactive concepts. 

Using it effectively requires something of a radical shift not only in the way you think about both the architecture of your program, but also in the very act of computation itself. While traditional programming encourages thinking of computation as the linear execution of statements in the standard Von Neumann style, FRP – particularly the *reactive* part of FRP – encourages a higher-level, more abstract approach. In reactive programming, thinking about computation requires, first and foremost, thinking about the _flow of data_ through a system.

Having explored FRP on and off for the past year or so, I continue to remain enthralled by the concept and evangelize for it. I do this because I remain convinced that – especially for developers focused on software domains fraught with the perils of asynchronicity (for instance, user interfaces) – it can lead to cleaner, easier-to-understand, and less error-prone code.

Because of this, I recently gave a short presentation introducing Functional Reactive Programming to our small group of engineers in [XD](https://www.behance.net/adobeXD) at [Adobe](http://www.adobe.com). My goal was to introduce the concept using a single programming language (JavaScript) and a single FRP library ([Bacon.js](http://baconjs.github.io/)), through analogy and comparison with a library that most of the attendees were already familiar with, namely [Underscore](http://underscorejs.org/).

The beauty of using Underscore lies in the fact that it provides many of the fundamental primitives for functional programming in a relatively easy-to-use package. In our group at Adobe, we regularly employ Underscore (or it’s competitor, [Lo-Dash](https://lodash.com/)) in many of the JavaScript-based applications we develop. Most JavaScript developers are already familiar with its varied and many uses. 

To start, let’s consider one of the most fundamental: ```map.```

## Map and EventStream

Much of functional programming involves the manipulation of data stored in a series of lists. Lists, often stored as arrays, are the most basic and foundational tool of the functional programmer. Underscore provides a wide variety of methods for working with lists (the documentation for these methods is filed under “arrays” and “collections”).

Consider the following array:

{% highlight javascript %}
var arr = [1, 2, 3, 4, 5];
{% endhighlight %}

Let’s say we want to square each number in the array. The functional way to accomplish this task requires applying a function to the array that in turn applies a squaring function to each item in the array sequentially. Developers familiar with Underscore already know that such a function exists. This function is called ```map.```

{% highlight javascript %}
var squared = _.map(arr, function(x) {
    return x * x;
});
{% endhighlight %}

In FRP libraries like Bacon.js, an equivalent ```map``` primitive exists. But rather than operate on arrays, Bacon’s primitives operate on and return **Observable** objects like **EventStreams.** 

What, exactly, is an EventStream? I wrote about this topic in more detail in a [previous blog post](https://sean.voisen.org/blog/2013/09/intro-to-functional-reactive-programming/). But, perhaps **the easiest way to think about an EventStream is as an array that changes _over time_.** With an EventStream, new items may be added to the stream at any time (that is, asynchronously) until the stream ends, and you can choose to be notified whenever this occurs.

<img src="https://sean.voisen.org/images/event_stream_1.svg" width="100%" class="framed" />

For all of the subsequent examples, we will use Bacon.js to create an EventStream that emits the items in our array every 500ms. We will use the ```Bacon.sequentially``` method to do so. (It may help to note that EventStreams need not necessarily emit events at regular intervals, but I’m using these clock-like EventStreams for sake of simplicity.)

{% highlight javascript %}
var stream = Bacon.sequentially(500, arr);
{% endhighlight %}

Once we have a an EventStream, we can use Bacon’s ```map``` method to create a new stream that squares each item as it arrives and then logs that value:

{% highlight javascript %}
stream.map(function(x) {
    return x*x;
}).onValue(function(val) {
    console.log(val);
});
{% endhighlight %}

It may help to try [this JSFiddle](http://jsfiddle.net/svoisen/fw6451xw/), which shows both the Underscore and Bacon.js examples in action.

## Reduce

Of course, many other primitives besides ```map``` exist. For instance, if we wanted to sum all of the items in the array we could use Underscore’s ```reduce``` function:

{% highlight javascript %}
var sum = _.reduce(arr, function(x, acc) {
    return acc + x;
}, 0);
{% endhighlight %}

In Bacon.js, we have two primitives analogous to ```reduce.``` The first is ```fold```.

{% highlight javascript %}
 stream.fold(0, function(x, acc) {
    return x + acc;
 }).onValue(function(val) {
    console.log(val);
});
{% endhighlight %}

The challenge with ```fold``` is that it waits for the stream to end before a value is returned. In this example, the stream with 5 elements being pushed out every 500ms means that we have to wait the full 2.5s before ```onValue``` is executed. We can get around this problem by using the ```scan``` method instead, which will execute ```onValue``` as the sum is calculated in real-time:

{% highlight javascript %}
stream.scan(0, function(x, acc) {
    return x + acc;
}).onValue(function(val) {
    console.log(val);
});
{% endhighlight %}

And, again, [here is the JSFiddle](http://jsfiddle.net/svoisen/nmspL37e/) showing it all in action.

## Zip

“Zipping” is the act of taking two arrays and, item by item in alternating sequence, combining them into a single array. Consider the two arrays:

{% highlight javascript %}
var arr1 = [1, 2, 3, 4, 5];
var arr2 = ['a', 'b', 'c', 'd', 'e'];
{% endhighlight %}

The Underscore code to produce the zipped combination of the two arrays is as follows:

{% highlight javascript %}
var zipped = _.zip(arr1, arr2);
// Contains [1, 'a', 2, 'b', 3, 'c', 4, 'd', 5, 'e']
{% endhighlight %}

Bacon.js of course has an analogous ```zip``` function that produces a zipped EventStream, with the caveat that because EventStreams operate over time, it will wait until it has new items from _both_ streams before outputting a value in the new stream:

{% highlight javascript %}
var stream1 = Bacon.sequentially(500, arr1);
var stream2 = Bacon.sequentially(500, arr2);
stream1.zip(stream2).onValue(function(val) {
    console.log(val);
});
{% endhighlight %}

Here's [the JSFiddle](http://jsfiddle.net/svoisen/5z9ggqdc/).

## Filter

Underscore also provides a ```filter``` method that takes a single array, and given a predicate function, outputs a new array that contains only the items for which the predicate holds true. For instance, if we wanted to filter an array containing all the numbers from 1-10 to an array containing only the even values:

{% highlight javascript %}
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var evens = _.filter(arr, function(x) {
    return x % 2 == 0;
});
{% endhighlight %}

Again, Bacon.js provides an analogous method operating on EventStreams:

{% highlight javascript %}
var stream = Bacon.sequentially(500, arr);
stream.filter(function(x) {
    return x % 2 == 0;
}).onValue(function(val) {
    console.log(val);
});
{% endhighlight %}

And here’s [the JSFiddle](http://jsfiddle.net/svoisen/wy34z314/).

## Creating EventStreams

Bacon.js provides a wide variety of ways for producing EventStreams. ```Bacon.sequentially``` is just the tip of the iceberg. All of the methods are too numerous to list here (see the [documentation](http://baconjs.github.io/api.html#creating-streams)), but here are a few of the most useful:

### $.asEventStream

The ```$.asEventStream``` method creates an EventStream from jQuery objects that emit events. This handy for quickly creating EventStreams from sources of user input, like buttons or text fields.

{% highlight javascript %}
var stream = $('#myButton').asEventStream('click');
{% endhighlight %}

### fromArray

```fromArray``` operates similarly to ```Bacon.sequentially```, but will emit all items in an array immediately (as if ```Bacon.sequentially``` were provided with an interval of 0).

{% highlight javascript %}
var arr = [1, 2, 3, 4, 5];
var stream = Bacon.fromArray(arr);
{% endhighlight %}

### fromCallback

```fromCallback``` will create an EventStream that will emit one event and then end the stream when a given callback is called. This can be quite useful for wrapping existing methods that expect a callback into something more friendly to a FRP-based approach. For instance, consider the following example that creates an EventStream from the ```setTimeout``` function

{% highlight javascript %}
Bacon.fromCallback(function(callback) {
    setTimeout(function() {
        callback("Bacon!");
    }, 1000);
}).onValue(function(val) {
    console.log(val);
});
{% endhighlight %}

### fromPromise

Finally, ```fromPromise``` creates EventStreams from a Promise object. The stream will emit a single event when the promise succeeds, an error event if the promise fails, and will end immediately thereafter in either case. Here’s an example that creates an EventStream from a jQuery Ajax call to the Wikipedia API:

{% highlight javascript %}
function doSearch(query) {
    var url = 'http://en.wikipedia.org/w/api.php?action=opensearch'
        + '&format=json' 
        + '&search=' + encodeURI(query);
    return Bacon.fromPromise($.ajax({
        url:url, 
        dataType:"jsonp"
    }));
}
doSearch('Aardvark').onValue(function(val) {
    console.log(val[1]);
});
{% endhighlight %}

Here’s [the JSFiddle](http://jsfiddle.net/svoisen/y6rz9fLw/) for all of the previous examples.

## Conclusion

Hopefully this short post shows that diving into FRP is not as difficult as it first may seem; many developers are already familiar with many of the concepts used in FRP through other functional libraries like Underscore. 

Becoming familiar with the functional building blocks that FRP libraries like Bacon.js provide is an important first step to working effectively with FRP. The next step, of course, requires thinking in a functional reactive way. That is, how do we use these building blocks to make something truly useful? I provided one example [in a previous blog post](https://sean.voisen.org/blog/2013/09/intro-to-functional-reactive-programming/). In upcoming posts, I hope to expand on this with a few more. Stay tuned.

