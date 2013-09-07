---
layout: post
title: Functional Reactive Programming with Bacon.js
---

If you are a front-end developer – that is, someone who builds user interfaces for a living – and you haven’t yet explored [Functional Reactive Programming (FRP)](http://en.wikipedia.org/wiki/Functional_reactive_programming), perhaps now is the time to take a look. Never mind the fact that FRP has been labeled a [hipster development trend](http://hipsterdevstack.tumblr.com/post/39558331788/frp-yeah-we-were-doing-that-in-2012) for 2013, it is still a time-saving, bug-preventing programming paradigm worthy of all developers, mustachioed or otherwise.

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

But suppose we changed the way that we interpreted “=” such that it meant what we learned in mathematics, namely the concept of equivalence. Then the variable ```y``` would be equivalent to whatever the value of ```x``` is at any given time, incremented by 1. In this case we‘d expect different console output – the number 3.

Without data binding or event dispatching – in fact, without any special work on our part – what we have now is a new kind of super variable ```y```, one that represents a time-based relationship, and will continually change as ```x``` changes over time.  This is the kind of programming power that Reactive Programming provides.

*Functional* Reactive Programming is simply reactive programming using functional programming style and concepts for a [side-effect free](http://en.wikipedia.org/wiki/Side_effect_(computer_science\)) implementation. The functional style allows us to better understand and reason about our reactive code.

## Diving in With Bacon.js

Perhaps the best way to get a better understanding is just to dive in and write some code. Let’s build a very simple Wikipedia Ajax search tool.

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


