---
layout: post
title: Functional Reactive Programming with Bacon.js
---

If you are a front-end developer – that is, someone who builds user interfaces for a living – and you haven’t yet explored [Functional Reactive Programming (FRP)](http://en.wikipedia.org/wiki/Functional_reactive_programming), perhaps now is the time to take a look. Never mind the fact that it has been labeled a [hipster development trend](http://hipsterdevstack.tumblr.com/post/39558331788/frp-yeah-we-were-doing-that-in-2012) for 2013, FRP is a time-saving, bug-preventing programming paradigm worthy of all developers, mustachioed or otherwise.

This post is intended to be a gentle introduction to Functional Reactive Programming using examples from a specific implementation, [Bacon.js](https://github.com/baconjs/bacon.js). If you are a seasoned developer with at least some familiarity with JavaScript, you should have no problem following along.

## What is FRP and Why Bother?

FRP’s primary strengths involve helping you eliminate complexity in two key areas: dealing with user input, and dealing with asynchronous operations. If you’ve ever had to deal with the twisted chains of callback spaghetti that can quickly arise when handling either problem, then FRP may be for you.

So, what exactly is FRP? You could read the [formal academic paper](http://conal.net/papers/icfp97/) on the subject, but I’ll attempt to simplify the matter. Let’s start with Reactive Programming first. We’ll add the functional part afterwards.

At its most generic, Reactive Programming is simply an alternative way to think about what is meant by this simple symbol: “=.” As you will likely remember, in mathematics the equals sign (=) means “equivalent to.” But in most programming languages, “=” has different semantics. It means “assign what is on the left of the symbol to what is on the right.” (There is a [nice explanation](http://stackoverflow.com/a/10756617/670428) along the same lines on Stack Overflow.)

Consider the following JavaScript snippet:

{% highlight javascript %}
var x = 1;
var y = x + 1;
x = 2;
console.log(y);
{% endhighlight %}

Because of the way “=” works in traditional programming, we expect to see the number 2 printed in the console. The variable ```y``` was assigned the value 1 + 1, which is 2. The third line (```x = 2;```) has no effect on the output. 

But suppose we changed the way that we interpreted “=” such that it meant what we learned in mathematics, namely the concept of equivalence. Then the variable ```y``` would be equivalent to whatever the value of ```x``` is at any given time, incremented by 1. In this case we’d expect different console output – the number 3.

Without data binding or event dispatching – in fact, without any special work on our part – what we have now is a new kind of super variable ```y```, one that represents a time-based relationship, and will continually change as ```x``` changes over time.  This is the kind of programming power that Reactive Programming provides.

*Functional* Reactive Programming is simply reactive programming using functional programming style and concepts for a [side-effect free](http://en.wikipedia.org/wiki/Side_effect_(computer_science\)) implementation. The functional style allows us to better understand and reason about our reactive code.

## Diving in With Bacon.js

Perhaps the best way to get a better understanding is just to dive in and write some code. Let’s build a very simple Wikipedia search tool.

Download [Bacon.js](https://github.com/baconjs/bacon.js) and set up a simple page using Bacon and jQuery. Add an input field and search button:

{% highlight html %}
<input type="text" id="searchInput" />
<button id="searchButton">Search</button>
{% endhighlight %}

And for the JavaScript:

{% highlight javascript %}
function setup()
{
  var buttonStream = $("#searchButton").asEventStream("click");
  buttonStream.onValue(function(e) {
    console.log("Hello from Bacon.js");
  });
}

$(document).ready(setup);
{% endhighlight %}

Nothing terribly exciting here; clicking the button should print to the browser console. But it does expose us to the first and most important building block of FRP: the Event Stream.

### Event Streams

An event stream is a representation of a time-based series of discrete events. Think of it as a channel that you may subscribe to in order to be notified about some kind of happening in your program. Events in the stream may happen at any time and need not occur in a regular synchronous fashion (i.e. like the ticking of a clock).

<img src="http://sean.voisen.org/images/event_stream_1.svg" width="100%" class="framed" />

Unlike traditional events (like those provided by the browser or jQuery), the power of event streams is that they may be merged, filtered, or mapped (transformed) in any number of ways before you handle and act on the events conveyed within.

<img src="http://sean.voisen.org/images/event_stream_2.svg" width="100%" class="framed" />

A concrete example may help illustrate the point. Suppose we would like to initiate a search from our form by either clicking the search button or simply pressing the enter key while in the search input field. The standard way of doing so in jQuery requires creating separate event handlers for each input event, performing necessary logic to extract the search input, then calling a separate function to initiate a search. 

{% highlight javascript %}
function setup()
{
  $("#searchButton").click(function() {
    doSearch($("#searchInput").val());
  }

  $("#searchInput").keyUp(function(e) {
    if (e.keyCode == 13) {
      doSearch($("#searchInput").val());
    }
  }
}
{% endhighlight %}

In the above example, refactoring is already cumbersome because we have two callbacks that can initiate a search. If we changed the search function’s name or argument signature, then even with this simple example we’d already have to change our code in two places. And we haven’t even written any logic to handle the search results yet. If ```doSearch``` performs a search via Ajax, it too will need a callback to return results or errors.

With FRP we can work more declaratively and, in turn, design the program such that the logic is easier to follow. 

Here’s how it would work with Bacon.js:

{% highlight javascript %}
function setup()
{
  var buttonStream = $("#searchButton").asEventStream("click");
  var enterStream = $("#searchInput").asEventStream("keyup")
    .filter(function(e) {
      return e.keyCode == 13;
    }
  );

  var searchStream = Bacon.mergeAll(buttonStream, enterStream)
    .map(function(){return $("#searchInput").val()})
    .flatMapLatest(doSearch);
}
{% endhighlight %}

Here, we create two streams, one for the button clicks and one for key up events in the input field. We filter the key up events such that the stream only emits events when the key up happens to be the enter key. Next we merge the two streams and apply a map (transformation) so that our new ```searchStream``` emits events that contain the value of the search input field. Finally, we do another map that will take the results from our Ajax search function and only emit events when the asynchronous Ajax call is complete. Let’s take a look at that search function:

{% highlight javascript %}
function doSearch(query)
{
    var url = 'http://en.wikipedia.org/w/api.php?action=opensearch'
      + '&format=json' 
      + '&search=' + encodeURI(query);
    return Bacon.fromPromise($.ajax({url:url, dataType:"jsonp"}));
}
{% endhighlight %}

This simple Wikipedia search returns an event stream built on the jQuery promise object returned by the ```ajax``` function. This stream will only emit a single event when the promise is complete, either the search results or an error.

At this point, all of our application logic is essentially composed of combining, filtering and mapping the flow of event streams. Button clicks and key presses are converted into streams that are then merged into a single stream that is then mapped into another stream that is then transformed into a final stream ```searchStream``` that only emits events when a search is complete. One linear flow. No callback spaghetti.

You may be wondering about the function ```flatMapLatest.``` The ```flatMapLatest``` function takes a stream and returns a new stream that contains only events from the last spawned stream, in our case the stream created by ```Bacon.fromPromise``` in the ```doSearch``` function. To get the results of our search, we simply use ```onValue``` on our search stream:

{% highlight javascript %}
searchStream.onValue(function(results) {
  console.log(results);
}
{% endhighlight %}

### Properties

The magic of FRP and Bacon.js does not end with event streams. Remember those “super variables” I promised that would magically change over time in response to events. In Bacon.js those are called “properties.”

You create properties from event streams using either the ```scan``` function or the ```toProperty``` function. A property will always have a value (though not necessarily initially), and that value may change over time depending on what happens with its related event stream.

As a simple example, let’s create a property that keeps track of the number of searches we perform with our new Bacon-powered search field.

{% highlight javascript %}
var totalSearches = searchStream.scan(0, function(value) { 
  return ++value; 
});
{% endhighlight %}

Here, we use the ```scan``` function to create a property that increases by 1 every time the ```searchStream``` emits an event. If you’re not familiar with ```scan``` from other functional programming experience, think of it as a kind of accumulator function that takes an initial value, and then for each event in the stream calls some function that takes the value as an argument. In our case, we start with 0 in the accumulator, then increment it by 1. The ```totalSearches``` property will always contain whatever is in the accumulator.

Like event streams, we can use ```onValue``` to get the value in our property:

{% highlight javascript %}
totalSearches.onValue(function(value) {
  console.log(value);
}
{% endhighlight %}

Notice what we did not do that we would have to do using standard jQuery and imperative programming: we did not create a global variable that would have to store our total search count. We did not have to remember to increment that variable in our ```doSearch``` callback. And, most importantly, if we wanted to display that variable on the page, we would not have to manually check when it updated and then display it – we can use the ```onValue``` function instead to be updated of any changes.

We could also use ```toProperty``` to create another property that contains the number of search results returned by Wikipedia.

{% highlight javascript %}
var totalResults = searchStream.map(function(value){return value[1].length;}).toProperty();
{% endhighlight %}

<a name="bugfix"></a>Finally, it turns out that **we also need properties in order to fix a small bug in our example.** [[1](#1)] Because Bacon.js uses lazy evaluation, there’s no guarantee that the value of the ```searchInput``` we return as part of our mapping in the ```searchStream``` will be what we expect at the time we expect it. If we were to use our ```searchStream``` with buffering combinators in the Bacon.js library like ```zipWith``` or ```when```, then we might run into trouble. We can fix this by creating a property that updates whenever our input changes on key down, and then use Bacon’s ```sampledBy``` function to ensure our stream passes along the value of the property at the time it was sampled instead:

{% highlight javascript %}
var queryProperty = $("#searchInput").asEventStream("keydown")
    .map('.target.value').toProperty();
{% endhighlight %}

Here’s the final program in its entirety:

{% highlight javascript %}
function setup()
{
  var queryProperty = $("#searchInput").asEventStream("keydown")
    .map('.target.value').toProperty();
  var buttonStream = $("#searchButton").asEventStream("click");
  var enterStream = $("#searchInput").asEventStream("keyup")
    .filter(function(e){
      return e.keyCode == 13;
    }
  );

  var searchStream = queryProperty
    .sampledBy(Bacon.mergeAll(buttonStream, enterStream))
    .flatMapLatest(doSearch);

  var totalSearches = searchStream.scan(0, function(value) { 
    return ++value; 
  });

  totalSearches.onValue(function(total) {
    console.log("Total searches: " + total);
  });

  var totalResults = searchStream.map(function(value){return value[1].length;}).toProperty();

  totalResults.onValue(function(total) {
    console.log("Search result count: " + total);
  });
}

function doSearch(query)
{
  var url = 'http://en.wikipedia.org/w/api.php?action=opensearch'
      + '&format=json' 
      + '&search=' + encodeURI(query);
  return Bacon.fromPromise($.ajax({url:url, dataType:"jsonp"}));
}

$(document).ready(setup);
{% endhighlight %}

### Conclusion

This short post really only scratches the surface of what is available in FRP libraries like [Bacon.js](https://github.com/baconjs/bacon.js). I suggest you take the time to explore and see more of what FRP offers before deciding if it’s right for you. Indeed, Bacon.js is not the only FRP library available for JavaScript developers: [RxJS](https://github.com/Reactive-Extensions/RxJS) is the original and popular alternative. But whatever you choose, I think you’ll find FRP is a handy tool – even in imperative languages – for writing cleaner, simpler, more elegant code.

> <a name="1"></a>[1] Bug fix courtesy of [@ali_pang](https://twitter.com/ali_pang)
