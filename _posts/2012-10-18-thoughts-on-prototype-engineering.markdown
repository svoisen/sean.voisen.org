---
layout: post
title: Thoughts on prototype engineering
---

In software, prototype engineering is a necessity of innovation, but many organizations do it wrong. They do it wrong because they look at prototypes not as prototypes, but as new alpha- or beta-version products. As a result, they over-design and they over-engineer. It's worth emphasizing: **prototypes are not products.** The value of a prototype lies in the experience and knowledge gained through rapidly investigating a problem-space, not in the final output. 

At a recent Adobe "Create the Web" event (caveat: I work at Adobe), the Adobe Pipeline team opened [its talk](http://www.youtube.com/watch?v=IiXnazocB30) about prototyping with this quote from Albert Einstein:

> If I had an hour to solve a problem I'd spend 55 minutes thinking about the problem and 5 minutes thinking about solutions.

Einstein knew how to solve problems because he knew how to ask questions. Prototyping is not problem solving; it is the art of asking the right questions.

I've spent a lot of my career building prototypes &mdash; writing code that oftentimes is never executed by a single user. Code that sometimes never even sees the light of day. It's a different kind of path compared to that followed by many software developers. On the one hand, it offers a large variety of interesting projects with short timelines, and on the other hand, the results are often ephemeral and rarely tangible. 

As such, prototype engineering requires a particular kind of personality and skillset. Firstly, you have to enjoy exploring designs, architectures and ideas perhaps more than you enjoy building products that see significant use. Secondly, you have to be willing and able to pick up new skillsets quickly, skimming the surface of a breadth of technologies while often forsaking depth of knowledge in any particular one.

It is part of the prototype engineer's job to ensure that a prototype remains a prototype. This means to resist over-engineering and over-optimization. It means to push back on designs that are too high in fidelity, or ideas that are too broad in scope. It means working rapidly and pushing builds early and often. And it means continually refining your processes and skillsets to maximize your ability to know when to push forward, and know when to cut your losses and give up on an idea.

The goals of prototyping are as varied as the organizations that produce them, but they nearly always seek to ask and answer questions like:

* Is the idea feasible?
* Will potential customers find it usable, useful and desireable?
* In what areas of design and production can we mitigate risk?
* What technology choices make the most sense?
* What design directions are most appropriate?
* Can the team work effectively together?

Prototyping is a process of thinking through doing, and the only way to answer these questions is to do the work.

Here are a few processes, skillsets and mindsets I've found worth cultivating as a prototype engineer. I can't say I always (or even often!) succeed in their application, but I certainly try.

Code Like a Sculptor
--------------------
Software is called "soft" for a reason; it's malleable. When prototyping, code like a sculptor. Work roughly, using large approximations to get the "shape" of the idea. Build the entirety of a story from end to end (a skeleton application or what Dave Thomas calls a [tracer bullet](http://www.artima.com/intv/tracerP.html)), then add and refine. It's important to come at prototyping from the standpoint that maybe it's not engineering at all, but instead a kind of play &mdash; a creative exploration of a problem space using the medium of code. At no point should any code you write for any prototype be considered sacred. Instead, all code should be eligible for deletion and refactoring at any time.

Cultivate a Beginner's Mind
---------------------------
Do not marry yourself to a particular technology or framework; approach each prototype as if you've never built anything like it before. Let go of all pre-conceived notions of what it means to build a web app or a tablet app or whatever you happen to be building, explore the range of possible options, then dive in. Be wary of ever labeling yourself as a "Rails developer," or a "JavaScript developer" or a "Cocoa developer." Just be a person willing to make (and break) things.

Work Outside In
---------------
Do not build more than you have to. More often than not, the goal of a prototype is to test the "feel" of a particular interaction model. Use mocks to fake the data layer. Use frameworks and boilerplate to get a skeleton built quickly. Focus the majority of your energy on the user interface, but don't polish early or as much as your design team would like you to. Chances are it's going to change. Instead continue returning to the 10,000ft. view of the UI. Can it work smoothly within the technological constraints of the chosen technology and platform? Does the flow make sense? Is it natural to implement? Let the UI guide the architecture; not the inverse.

Part of the prototype engineer's job is to act as a designer. When you're "in the weeds" working deeply on implementing a particular idea, oftentimes you come to understand it better than other members of the team. If a design becomes difficult or cumbersome to implement in code, it may be because it's simply a bad design. Speak up and talk about it.

Use Source Control Effectively
------------------------------
Become friends with [git](http://git-scm.com/). Git's branching model makes experimentation easy and safe. When you're less afraid to just try something out, then you're more likely to do it. 

Create a git branch for every single tiny feature or idea you intend to implement. The smaller the branch scope, the more likely you are to remain focused. And because git asks you to name every branch at creation, it forces you to start every branch with intention and purpose. Think carefully with each "git branch" command: What is the question you are trying to ask? What is the problem you are trying to solve?

Test Early and Often
--------------------
Testing allows for rapid and safe refactoring during pivots. While the testing overhead may mean you proceed more slowly in the beginning of a project, it also means that you can more quickly proceed in new design directions with less fear. It also forces you to keep your code [DRY](http://en.wikipedia.org/wiki/Don't_repeat_yourself).

This is perhaps the most difficult of these tips to stick with, for the simple reason that when prototyping you want to feel like you're moving quickly. Testing often feels superfluous when all you're testing is throw-away code. The goal, then, is to gain a sense of what's worth testing, and what's worth ignoring. Prototype testing is not about 100% test coverage; its about making you as nimble as possible. Usually this means light testing of the application core &mdash; things like data models, frequently used utility functions, helpers, or data layers &mdash; and avoiding the UI.

Prototype Your Process
----------------------
Of course, not all of the above applies in every situation. Learn what works best for you and your team. Try out new processes and be willing to throw away old ones. Try out new tools and let go of tools that simply get in the way, even if they're the tools that "everybody uses."

I've started to view my prototyping process less as an attempt to crystallize perfection, and more as a continually evolving practice of mastery. This is how I 've come to accept that it's OK to write throw-away code &mdash; even for most of my career. It's simply been my 55 minutes of thinking.
