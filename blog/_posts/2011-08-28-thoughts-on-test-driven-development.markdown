---
layout: post
title: Thoughts on test-driven development
---

[Clean code](http://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882) is all the rage these days. It&rsquo;s what all the cool kids are doing. Which is a bit odd, because you would think that clean code should never have been a fad, but rather a staple of software development since the earliest days of FORTRAN. Such is not the case.

Instead, it took the recent rise in popularity of dynamically typed languages like Ruby and Python to make test-driven development (TDD) &mdash; and clean code by extension (or is it vice-versa?) &mdash; fashionable. Mostly out of sheer necessity. If you don&rsquo;t have a compiler to tell you when you made a mistake as simple as a misspelled variable name, you better have a suite of tests that will.

I&rsquo;m guessing here, but I get the sense that in the software industry TDD is still the exception rather than the rule.  Why?  Some software developers might say it comes down to a matter of priorities.  Software companies prioritize ship dates and over quality.  And writing fully tested code cleanly takes time &mdash; time which developers don&rsquo;t have.  This results in code that you might generously call &ldquo;quick and dirty.&rdquo;  In fact, in software development, &ldquo;quick&rdquo; and &ldquo;dirty&rdquo; are two adjectives you always find paired together. Like light and shadow, or peas and carrots, or Batman and Robin, or C and buffer overflows, where you find one you find the other.  The rule is: code written quickly is by necessity sloppy.  And, conversely, clean code takes time.

[Uncle Bob](http://en.wikipedia.org/wiki/Robert_Cecil_Martin), however, says otherwise. In order to go fast, your code has to be clean and it needs to have full test coverage.  If it does not, you&rsquo;ll spend too much time fixing bugs that could&rsquo;ve been caught with a proper test suite or made easier to find with proper naming conventions.  And you&rsquo;ll waste hours or days accidentally breaking the functionality of existing code when you try to refactor or add new features.

Recently, our team at Adobe XD invited Uncle Bob over to our office to spend three full days beating this philosophy into our craniums.  Since then, a few of us have been practicing employing clean code techniques in our day-to-day projects. I&rsquo;ve been sticking to it as rigorously as possible. A few takeaways from my own experience:

* **TDD is faster in the long-run, not the short-run.** There&rsquo;s no way around the fact that writing tests requires an upfront time commitment. But oftentimes the cost is worth it. Especially when it comes time to implement the next feature and you discover that &mdash; thanks to lack of forethought &mdash; code you just wrote needs to be refactored or re-architected. Suddenly re-architecture feels like no big deal. Well ... except that you often also have to modify all your tests in the process.

* **I&rsquo;ve found that I don&rsquo;t need log statements.** I used to do this all the time &mdash; sprinkle trace/log/printf statements throughout my code as a sanity check to ensure execution flow was correct. Now, log statements have become a rarity. I know the execution flow is correct; the tests say so.

* **I almost never find myself in the debugger.** I&rsquo;m not a fan of using debuggers anyway, except when tackling very serious bugs that can&rsquo;t be quashed by other means. Debuggers require too much work, overhead and tedium when often a simple trace statement will give you all the information you require. Thankfully, so far, with TDD I have yet to need one at all. 

* **A good suite of tests is like a pre-programmed [REPL](http://en.wikipedia.org/wiki/Read-eval-print_loop).** Which is great if the language you are working with doesn&rsquo;t have one (and ActionScript does not). It offers a convenient framework for trying out small ideas in a pain-free way, the same way you might if you did have a REPL, but without all the repetitive typing.

* **In non-interpreted languages, TDD works best when you have a decent compiler.** As a developer at Adobe XD, I currently work with ActionScript much of the day, and mxmlc is painfully slow.  Running tests is a bear because it takes so long to compile the test suite.  Comparatively, test compilation in Java is lightning quick and a pleasure to work with. And Ruby&rsquo;s [RSpec](http://relishapp.com/rspec) is even more of a joy to use.

Writing tests is not fun. Anyone who tells you otherwise is a liar. But, getting tests to pass is surprisingly addictive. And therein lies the power of TDD: it offers a kind of IV drip of continous daily victories.

But would I use TDD for every project I work on? Probably not. For personal &ldquo;one-off&rdquo; projects or projects I know will not see much future maintenance, the slower development time is simply not worth it. For serious, long-term projects however, TDD is now a must.

### Responses

* My friend Daniel Wanja [takes issue with me calling him a liar](http://www.onrails.org/2011/08/30/writing-tests-is-not-fun-anyone-who-tells-you-otherwise-is-a-liar) :)
