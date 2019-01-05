---
layout: post
title: Why Haskell?
---

<p style="text-align:center;"><small>(This post is also available in <a href="http://science.webhostinggeeks.com/zasto-haskell">Serbo-Croatian</a>. Translation by Jovana Milutinovich.)</small></p>

I&rsquo;m learning [Haskell](http://www.haskell.org). Maybe you should too. Here&rsquo;s why:

Every programmer has something to say on what other programmers should know in order to be standouts in their field. Back in 2004, for instance, when Python was more obscure than it is now, Paul Graham wrote an essay about something he called the [Python paradox](http://www.paulgraham.com/pypar.html). In that essay, Graham summarized the paradox as follows:

> &hellip; if a company chooses to write its software in a comparatively esoteric language, they&rsquo;ll be able to hire better programmers, because they&rsquo;ll attract only those who cared enough to learn it &hellip; [Thus] the language to learn, if you want to get a good job, is a language that people don&rsquo;t learn merely to get a job.

I won&rsquo;t go into the details of Graham&rsquo;s reasoning behind the paradox (you can read the essay for that), but I think it has legs.  The best programmers are those who love their craft &mdash; the ones who love it so much they&rsquo;ll learn unpopular languages just for the fun of it.  Simple enough. As an addendum to Graham&rsquo;s advice, however, I&rsquo;d add the following: The best programmers should also have a high- or expert-level competence in at least one language from each of the three following groups: the large-scale object-oriented languages (Java, C++, C#, ActionScript, etc.), the dynamically-typed &ldquo;scripting&rdquo; languages (Ruby, Python, Perl, etc.), and the functional languages (Scheme, OCaml, Haskell, Clojure, F# and friends). 

Thus, if you&rsquo;re going to learn a new language, pick one from the group that is least represented in your repertoire. If you&rsquo;re like me, this means the language to learn is a functional language. An esoteric functional language. Yes, it&rsquo;s time to leave your comfort zone.

At the beginning of 2011, I decided to make Haskell my programming language of the year. This was not without significant deliberation. Learning a new language requires a substantial investment of time and mental energy. And Haskell is certainly not the most popular functional language. (Clojure and Scala &mdash; both of which run on the JVM &mdash; have seen a rapid surge of popularity as of late.) But I don&rsquo;t learn new things simply to retain employment. I learn them because they&rsquo;re interesting. Here&rsquo;s why I found Haskell to be the most interesting of them all:

### Elegance
Syntax matters, and I prefer to write in a language that looks and feels elegant. Elegance was the allure of Ruby when a first started learning it five years ago. Elegance is the allure of Haskell for me now. Certainly there are different types of elegance. Lisp and its kin (Scheme, Clojure) are elegant in their simplicity (everything&rsquo;s a list!), but not in brevity. I&rsquo;m happy to learn more syntax if it means I type less (and don&rsquo;t have to manage parentheses). And I like languages that allow syntactic variations for accomplishing the same task. As Larry Wall, the creator of Perl, [notes](http://world.std.com/~swmcd/steven/perl/linguistics.html), syntactic variety has an anthropological analogue in human languages. Perhaps that&rsquo;s why, at least to me, the weird syntactic nooks and crannies, and &ldquo;polyexpressiveness&rdquo; of languages like Ruby and Haskell just feel right. That, and it&rsquo;s just more fun.

The canonical example used to illustrate Haskell&rsquo;s elegance is quicksort. Here it is ([original source](http://www.haskell.org/haskellwiki/Why_Haskell_matters)):

{% highlight haskell %}
qsort []     = []
qsort (x:xs) = qsort less ++ [x] ++ qsort more
  where less = filter (<x)  xs
        more = filter (>=x) xs
{% endhighlight %}

Four lines! And it reads just like how you would describe the algorithm: A list is sorted if all the elements smaller than the front of the list are moved to the front list (and sorted), and all the elements greater than the front are moved to the end (and sorted).

### Laziness
There are few areas of life where laziness can be considered a virtue. Computation is one of them. Haskell is lazy in the sense that it only evaluates code when it&rsquo;s absolutely necessary &mdash; allowing you to avoid wasting precious CPU cycles. And make use of some fairly nifty code tricks, like using infinitely long lists. Consider the following:

{% highlight haskell %}
take 10 $ filter even [0..]
{% endhighlight %}

This will result in a list consisting of the first 10 even integers from 0 to infinity. Because Haskell is lazy, it will never try to create an infinite list (impossible anyway), but only create the elements of the list it actually needs. 

Consider also [this example](http://stackoverflow.com/questions/265392/why-is-lazy-evaluation-useful) based on quicksort from above:

{% highlight haskell %}
minimum list = head $ qsort list
{% endhighlight %}

This defines a function that gets the smallest element of a quicksorted list. In a non-lazy language, the entire list would be sorted first, then the head (the first element) of that sorted list would be returned. That&rsquo;s a lot of wasted work.  In Haskell, the list is only sorted enough to give the correct answer, and that means you only need to sort the elements that are lesser in value than the first element of the original list.

### Purity
Like all functional languages, Haskell has no [side-effects](http://en.wikipedia.org/wiki/Side_effect_(computer_science). Side-effect free programming is rapidly becoming a necessity as we move to writing code that runs well on multiple cores. It also means fewer bugs. Purity is where it&rsquo;s at in the 21st century. And unlike some other functional languages, Haskell pursues purity as strictly as possible. &ldquo;Pure&rdquo; code and &ldquo;impure&rdquo; code (like code used for IO) remain neatly and permanently separated (through the use of monads) so that you can continue to reason about your pure code without it being &ldquo;tainted&rdquo; by side-effects.

### Type inference
Type inference permits all the benefits of strong typing without all the typing (no pun intended). This means that you get type safety, without having to explicitly declare the types of everything (unless you want to). The Haskell compiler is smart enough to infer what the types of things should be, and you can continue to code on your merry way knowing that the compiler has got your back. 

Coming from languages like ActionScript and Java, this is perhaps one of my most favorite features of Haskell. The amount of key banging it saves is enormous, and the code looks as simple and elegant as any dynamically typed language.

### Getting Started
By far the best resource for getting started with Haskell is the freely available book, [Learn You a Haskell for Great Good](http://learnyouahaskell.com/). It&rsquo;s friendly, approachable, and easy to follow. Those coming from the Ruby community will find it reminiscent of the playful style of [_why&rsquo;s Poignant Guide to Ruby](http://mislav.uniqpath.com/poignant-guide/). I can&rsquo;t recommend it enough.

Those looking for something more traditional may prefer the (also freely available) [Real World Haskell](http://book.realworldhaskell.org). It&rsquo;s another great book from O&rsquo;Reilly, but not nearly as fun.

&nbsp;

Learning Haskell may not get you a job programming in Haskell, but as Paul Graham postulates, it may still get you a job. Personally, I find that irrelevant. Learning the language has proven to be fun and rewarding and I plan to continue my Haskell adventures into 2012.
