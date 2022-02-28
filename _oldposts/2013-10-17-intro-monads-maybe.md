---
layout: post
title: A gentle intro to monads … maybe?
---

Monads: they're incredibly useful, and also maybe a little intimidating. Beginner functional programmers often cringe when they hear the term. JavaScript legend [Douglas Crockford once said that monads are cursed](http://www.youtube.com/watch?v=dkZFtimgAcM) – that once you understand monads for yourself you lose the ability to explain them to others. In the programming language F#, monads are called “computational expressions” mostly so people aren’t scared away. 

But I think all this fear and mysticism around the dreaded “M-word” need not be so. So in this post, I’m going to attempt to put a small crack in the curse, not by attempting to explain all of monad theory in general, but instead by thoroughly diving into a concrete example of a monad in a specific language: the Maybe monad in JavaScript[[1](#1)]. 

If you’ve been putting off learning about monads – or maybe have never even heard of them until now – then this post is for you. It will provide _just enough_ material to give you a sense of what monads are and what they can do. From there you should have a solid stepping off point from which you can jump into reading something like [this](http://www.haskell.org/haskellwiki/Monad) without trepidation.

If you're a seasoned developer, chances are you have already used monads in your daily practice without even realizing it. For instance, a [jQuery Deferred](http://api.jquery.com/category/deferred-object/) object is a monad. So is [jQuery Ajax](http://api.jquery.com/jQuery.ajax/), as well as [Bacon.js EventStream](https://github.com/baconjs/bacon.js). So this shouldn't be too hard to follow. 

On occasion, I will reference similarities between the JavaScript example and its counterparts in the programming language [Haskell](http://www.haskell.org/haskellwiki/Haskell). I do this only because most formal literature on monads references Haskell, and it helps to become familiar with the language. Feel free to skip these parts if you prefer.

## Maybe We Have a Problem

After the Identity monad, the Maybe monad is perhaps one of the simplest examples of a monad available. It’s also quite useful. 

The Maybe monad provides an elegant solution to the common problem of multiple nested ```null``` checks in code. Consider the following trivial example:

{%highlight javascript%}
var person = {
  "name":"Homer Simpson", 
  "address": {
    "street":"123 Fake St.",
    "city":"Springfield"
  }
};

if (person != null && person["address"] != null) {
  var state = person["address"]["state"];
  if (state != null) {
    console.log(state);
  }
  else {
    console.log("State unknown");
  }
}	
{%endhighlight%}

All those ```null``` checks are fairly ugly. They’re tedious to write and annoying to read, an unfortunate side-effect of working in a language in which ```null``` was implemented rather poorly. Is there perhaps a way to factor them out? Yes there is.

## Maybe We Have a Solution

What we want is to embed the computation of ```!= null``` into a function or type or class that we can easily re-use so that we don’t have to spatter our code with ```null``` checks. This is exactly what the Maybe monad provides. In Haskell, the [definition of type Maybe](http://hackage.haskell.org/package/base-4.6.0.1/docs/Data-Maybe.html) is rather succinct:

{%highlight haskell%}
data Maybe t = Just t | Nothing
{%endhighlight%}

All this means is that an object of type Maybe either has some value (```Just t```) or no value (```Nothing```). What is meant by ```Nothing``` depends on the context. In JavaScript the only things that mean “nothing” are ```null``` and ```undefined```. But as you will see, with the Maybe monad, we can change the semantics of “nothing” to suit our needs.

We can begin to model the Haskell definition in JavaScript as follows:

{%highlight javascript%}
Maybe = function(value) {
  var Nothing = {};

  var Something = function(value) { 
    return function() {
      return value; 
    };
  };

  if (typeof value === 'undefined' || value === null)
    return Nothing;

  return Something(value);
};
{%endhighlight%}

Now we have a function ```Maybe``` (in monadic terms, our _unit function_) that returns an object ```Nothing``` if the value provided to it is ```null``` or ```undefined``` and returns a function ```Something``` that returns the original value if the value is not ```null``` or ```undefined```. (For clarity, I’ve renamed Haskell’s ```Just``` with ```Something```, as I find this terminology a bit easier to follow when first being introduced to the concept.)

What can we do with the above? Let’s try it out:

{%highlight javascript%}
Maybe(null) == Nothing; // true
typeof Maybe(null); // 'object'

Maybe('foo') == Nothing; // false
Maybe('foo')(); // 'foo'
typeof Maybe('foo'); // 'function'
{%endhighlight%}

So now we’ve put all of our ```!= null``` checks into a single function, which is the constructor for the new ```Maybe``` type. But is this enough to solve our problem? Unfortunately, no. Let’s try it out:

{%highlight javascript%}
if (Maybe(person) != Nothing && Maybe(person["address"]) != Nothing) 
{
  var state = Maybe(person["address"]["state"]);
  if (state != Nothing) {
    console.log(state);
  }
  else {
    console.log("State unknown");
  }
}
{%endhighlight%}

So far, all we have done is replace a ```null``` check with a check for ```Nothing```. This is not quite what we want.

## Maybe We Need Composition

One of the defining characteristics of a monad is that it may be combined with other monads of the same type. That is, we should be able to sequence monads together through composition. You may remember that function composition is the application of one function to the result of another. Mathematically, given two functions ```g``` and ```f```, the composition of ```g``` of ```f``` is:

<div class="highlight">
<pre><code>(g ∘ f)(x) = g(f(x))</code></pre>
</div>

In the case of Maybe, we need some way to take multiple Maybes and combine, chain or _bind_ them together in a meaningful way. This way, if one Maybe is ```Nothing``` we can short-circuit our computation and stop at ```Nothing```, otherwise we can continue on our way, essentially replicating what the ```&&``` provides in our first example. (Technically, in JavaScript the computation does not short-circuit as it would in a lazy language like Haskell, but the effect is the same.)

We can do this by introducing a method on Maybe called ```bind``` (in Haskell, this is the ```>>=``` operator) that makes specific use of function composition. This ```bind``` method applies a function to the value contained by a Maybe and returns a new Maybe that contains the value of the function application. Since ```Nothing``` has no value, anything bound to a ```Nothing``` should simply return ```Nothing``` (our short-circuit).

{%highlight javascript%}
Maybe = function(value) {
  var Nothing = {
    bind: function(fn) { return this; }
  };

  var Something = function(value) { 
    return {
      bind: function(fn) { return Maybe(fn.call(this, value)); }
    };
  };

  if (typeof value === 'undefined' || value === null)
    return Nothing;

  return Something(value);
};
{%endhighlight%}

With this new ```bind``` method we can more elegantly re-write our code:

{%highlight javascript%}
var state = Maybe(person).bind(function(p) { 
  return p["address"];
}).bind(function(a) {
  return a["state"];
});

if (state == Nothing) {
  console.log("State unknown");
}
else {
  console.log(state);
}
{%endhighlight%}

Certainly this is better than before, but can we do better?

> (Note: If you’re keeping score, then you’ll note the type signature of our ```bind``` differs from Haskell’s ```>>=```. Haskell’s bind operator is of type ```m a -> (a -> m b) -> m b```, whereas ours is ```m a -> (a -> b) -> m b```. That is, we should pass in a function ```fn``` that returns a non-monadic – non-Maybe – value. I do this because JavaScript’s type system is, understatedly, quite weak, so I prefer to enforce the wrapping of the function’s return value in the Maybe monad myself. You can of course elect not to do this, and instead ensure that any function you pass to ```bind``` always returns a Maybe.)

## Maybe We Can Do Better

It would be nice if we could eliminate the final ```if ... else``` statement in the example above. It would also be nice if we could sequence multiple Maybes together without the need for ```bind``` in the case when we don’t plan on using the result of the bind. Fortunately, with our new Maybe type we can do all this and more. Here’s the final Maybe code with a few new methods (```isNothing```, ```val``` and ```maybe```) that provide some additional utility:

{%highlight javascript%}
Maybe = function(value) {
  var Nothing = {
    bind: function(fn) { 
      return this; 
    },
    isNothing: function() { 
      return true; 
    },
    val: function() { 
      throw new Error("cannot call val() nothing"); 
    },
    maybe: function(def, fn) {
      return def;
    }
  };

  var Something = function(value) { 
    return {
      bind: function(fn) { 
        return Maybe(fn.call(this, value));
      },
      isNothing: function() { 
        return false; 
      },
      val: function() { 
        return value;
      },
      maybe: function(def, fn) {
        return fn.call(this, value);
      }
    };
  };

  if (typeof value === 'undefined' || value === null)
    return Nothing;

  return Something(value);
};
{%endhighlight%}

### isNothing() and val()

The ```isNothing``` and ```val``` functions are rather self-explanatory. The ```isNothing``` function returns true if the Maybe is ```Nothing``` and false otherwise. The ```val``` function simply returns the value inside the Maybe monad if it is “something,” similar to Haskell’s ```fromJust``` function. If the Maybe is ```Nothing``` then ```val``` will throw an error. We don’t require these methods for our example (or even for Maybe to be a monad), but they often prove useful elsewhere.

### maybe(def, fn) 

The ```maybe``` function is the most useful for our purposes, and is identical to the ```maybe``` function for [Haskell’s Maybe monad](http://hackage.haskell.org/package/base-4.6.0.1/docs/Data-Maybe.html). It takes a default value (```def```) and a function ```fn``` and if the Maybe is ```Nothing```, returns the default value, otherwise it applies the function to the contents of the Maybe and returns the result. We can use this handy function to rid ourselves of the final ```if ... else``` statement in our example:

{%highlight javascript%}
console.log(Maybe(person).bind(function(p) { 
  return p["address"];
}).bind(function(a) {
  return a["state"];
}).maybe("State unknown", function(s) { 
  return s; 
}));
{%endhighlight%}

_And now we have our final solution._

## But is Maybe a Monad?

Thus far, I’ve been calling our Maybe implementation a monad without really proving it. Nevertheless, hopefully you now have at least a vague sense of what a monad _is_, even if I haven’t presented any kind of formal definition.

So, what is a monad? Perhaps the most intuitive way to think about monads is as **chainable computations**, or even “programmable semicolons.” They allow us to wrap up computations and sequence them in meaningful ways. In the case of the Maybe monad, the computations that we choose to wrap up are our ```!= null``` checks, and we sequence them through our chained use of ```bind```.

Of course, monads may also be defined more formally. For our Maybe example to truly be a monad it must have three particular properties and obey three particular laws. Of the three properties it must:

* Have a _type constructor_ that defines its type.
* Have a _unit function_ that converts a value of some type to its corresponding monadic type. This is the ```Maybe``` function.
* Have a _binding operation_ that takes a monad, a function that takes a some type and returns a monad, and returns a monad. This is our ```bind``` function. (Again, note that in our example, the function type signature varies slightly from this definition, as we automatically wrap the result of our binding function in Maybe.)

As for the three laws, these are known as: left identity, right identity, and associativity. In JavaScript, _with our example_, these laws may be written as follows:

### Left identity
{%highlight javascript%}
Maybe(x).bind(fn) == Maybe(fn(x)); // for all x, fn
{%endhighlight%}

### Right identity
{%highlight javascript%}
Maybe(x).bind(function(x){return x;}) == Maybe(x); // for all x
{%endhighlight%}

### Associativity
{%highlight javascript%}
Maybe(x).bind(fn).bind(gn) == Maybe(x).bind(function(x) {
  return gn(fn(x));
}); // for all x, fn, gn
{%endhighlight%}

Feel free to try these laws out with a few examples to see that they hold true.

## Redefining Nothing

We’re almost finished, but I want to take things one step further. Thanks to JavaScript readily allowing us to manipulate an object’s ```prototype```, we can perform some additional tricks that make Maybe even more useful.

Consider the following alteration to our running example:

{%highlight javascript%}
var person1 = {
	"name":"Homer Simpson", 
	"address": {
		"street":"123 Fake St.",
		"city":"Springfield"
	}
};

var people = [person1];

if (people != null && people.length > 0) {
  console.log(people[0]);
}
{%endhighlight%}

It would be nice if we could wrap up our check for an empty array as part of our Maybe monad. Fortunately we can. First, we will “mix in” a new function called ```isNothing``` on the ```prototype``` of ```Array```:

{%highlight javascript%}
Array.prototype.isNothing = function() {
  return self.length == 0;
}
{%endhighlight%}

Next, we will extend the Maybe constructor to check for this function on all provided values:

{%highlight javascript%}
Maybe = function(value) {
  // Nothing and Something definitions go here ...

  if (typeof value === 'undefined' || 
      value === null || 
      (typeof value.isNothing !== 'undefined' && value.isNothing()))
  {
    return Nothing;
  }

  return Something(value);
};
{%endhighlight%}

Now we can refactor our ```null``` and empty array checks using ```bind``` as before:

{%highlight javascript%}
console.log(Maybe(people).bind(function(people){return people[0]}).maybe("No person", function(person) {
  return person;
}));
{%endhighlight%}

Using the same trick, we can change the definition of ```Nothing``` for any object type we choose.

## Conclusion

Hopefully this short introduction to Maybe and the world of monads has proven that the dreaded “M-word” need not be as intimidating as it sounds. Hopefully it has also shown that monads like Maybe can be quite useful, even in imperative languages like JavaScript.

Remember, a monad is really nothing more than a **chainable computation**. It is simply a functional way to sequence things. That’s it. 

So, if you haven’t already, I encourage you to try the above Maybe examples for yourself, and perhaps even implement them in another language (I have an [Objective-C implementation](https://github.com/svoisen/SVMaybe), for instance). Then, go forth and try making other monads using Maybe as a template. It’s not as hard as it sounds and the rewards may be some very, very useful code.


> <a name="1"></a><small>[1] Crockford also provides a [lengthy description of JavaScript monads](http://www.youtube.com/watch?v=dkZFtimgAcM) in a recorded talk at YUIConf, using Maybe as an example. However, I find his implementation using macroids more difficult to follow than the one I present here.</small>
