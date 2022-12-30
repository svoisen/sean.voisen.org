---
title: Thoughts on speed
description: Why we need software to be fast.
image:
    path: /assets/images/speed@640.gif
    height: 320
    width: 640
    alt: "A top-down view of a motorcycle speedometer and tachometer."
---

<figure>
<img src="/assets/images/speed@640.gif" srcset="/assets/images/speed@1280.gif 1280w, /assets/images/speed@1920.gif 1920w" class="post-splash" alt="A top-down view of a motorcyle speedometer and tachometer.">
<figcaption>
Photo by <a href="https://unsplash.com/@planetwirth?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Alexa  Wirth</a> on <a href="https://unsplash.com/photos/18IuER9udWc?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
</figcaption>
</figure>

Fast software is more delightful to use than slow software. This fact is so obvious as to be a tautology; everyone loves and prefers to use speedy software. We expect computers to be fast. We _need_ them to be fast. **Fast software is fun!** In fact, speed and responsiveness are such critical aspects of all great user experiences that we often take them for granted. But to disregard this human need for speed is folly. The pains that software development teams sometimes endure to shave mere milliseconds off of application load time, or tune the timing of a particular user interaction, or ensure rendering frame rates are buttery smooth might astonish the average computer user. Fast is hard, and the work necessary to make software fast is often non-trivial <sup><a href="#1">1</a></sup>. But it must be done.

Why must we go to such great lengths to make software fast? What is it about speed that is so fundamental to the experience of computing? And what might we be able to do to make it a little easier to attain?

This essay explores these questions in two parts: first philosophically, then practically.

---

My MacBook Pro is currently afflicted with a condition of which I have yet to figure out nor remedy. Occasionally, upon waking from sleep, I will find that typing latency for all applications has suddenly increased by a marginal but not insignificant amount—perhaps 75ms at most. The response time from when I press a key to when the character corresponding to that key appears on the screen has lengthened by an amount that is just perceivable enough to be a nuisance.  While typing, I quickly become irritated.  Rather than focus on the task at hand, whether that be writing some code or composing a message, I instead suddenly find myself one step removed from my task, performing a kind of meta-analysis on the tool I use to perform my work instead of just _doing my work_. While the computer is in this state I cannot attain any sense of flow. My only option (until I take the time to diagnose and fix the root cause) is to reboot. (For first-hand experience on how frustrating typing latency can be, [try this typing latency simulator](https://aresluna.org/keyboard-secrets/typing-delay/). You will likely find that any delay above 100ms becomes particularly annoying.)

This jarring transition from tool _use_ to tool _annoyance_ is called—in the [Heideggerian](https://en.m.wikipedia.org/wiki/Heideggerian_terminology) sense of the word—a “breakdown.” A breakdown is “…a disruption in the normal functioning of things forcing the individual to adopt a more reflective or deliberative stance toward ongoing activity." <sup><a href="#2">2</a></sup>

The failure of a software system to respond in a timely fashion to user input is a type of breakdown. “Timely” here is subjective and context-dependent but we know it when we experience it.  We’re often accepting of a website that takes a few hundred milliseconds to load, but would balk at such a delay in, say, opening a system menu or toggling browser tabs. (This isn’t an excuse for slow-loading web sites or web applications, many of which are so bloated as to be unusable except on the fastest machines with the fastest connections.)

Heidegger employed the neologisms _ready-to-hand_ and _present-at-hand_ to describe the different attitudes toward a tool before and after a breakdown. Before a breakdown, a well-designed tool in a state of use is more or less transparent to its user. Take a hammer,  for instance. In the hands of an experienced carpenter, a well-designed, well-balanced hammer becomes an extension of the carpenter’s body. It is ready-to-hand, not a subject of inspection but a tool in use, nearly unnoticed by its user. As noted by Winograd and Flores in [Understanding Computers and Cognition](https://www.worldcat.org/title/understanding-computers-and-cognition-a-new-foundation-for-design/oclc/257175673):

> To the person doing the hammering, the hammer as such does not exist. It is part of the background … taken for granted without explicit recognition or identification as an object. It is part of the hammerer’s world, but it is not present any more than are the tendons of the hammerer’s arm.

But if the head of the hammer starts to come loose, or if the wood of the handle starts the split, breakdown occurs and the illusion is shattered. Flow becomes unattainable as the wonky hammer interrupts the fluidity of the hammering activity with every strike. The hammer is now present-at-hand, a subject of inspection instead of an object of use.

Unresponsive or slow software is a wonky hammer. You may still be able to use it to accomplish your task, but you’ll often find yourself distracted by the shoddy state of the tool throughout the job. Sometimes, though, it's utterly useless. It becomes, as [Heidegger notes](https://en.wikipedia.org/wiki/Being_and_Time), unusably _conspicuous_:

> We discover its unusability, however, not by looking at it and establishing its properties, but rather by the circumspection of the dealings in which we use it. When its unusability is thus discovered, equipment becomes conspicuous.

Conspicuous-ness comes in degrees. Not all slowdowns result in breakdowns. Slow responsiveness to user input—such as the direct manipulation of objects, or interacting with widgets or menus—almost always results in a breakdown. This is because—like dancing with a clumsy or hobbling partner—the user is unable move at a natural pace in the midst of their task. The awkward slowness directly interferes with or actively prevents getting work accomplished.

Slow application load times, on the other hand, while irksome, do not always result in a breakdown. If an application I open once or twice a day, such as a photo editor or 3D graphics program, takes a long time to load, I might find myself impatient at the delay, but the long load time doesn’t greatly impinge upon my workflow. Once the application has opened I can begin my work without further delay (hopefully!) That said, if an application like a note taking tool takes long to load, all is lost. The loading delay will rob me of the fleeting moment I have to capture my thoughts before they fade from short-term memory. All good note taking applications should load near-instantaneously.

Responsiveness and speed are especially critical for creativity and productivity applications—any application where a user thinks by directly manipulating a model or representation of something. Design tools, spreadsheets, CAD programs, code editors and word processors are all examples of such tools. Using these tools often involves a very intimate, cyclic feedback loop between tool and tool user. For such tools to be effective, this feedback loop must be tight—**the tool must move and respond at the speed of thought.** This loop is thus fragile; easily broken by a tool’s failure to respond or behave in a timely manner. David Kirsh, in [explaining the role of such a loop](https://www.researchgate.net/publication/233641298_Distributed_Cognition_A_Methodological_Note) through the theory of [distributed cognition](https://en.wikipedia.org/wiki/Distributed_cognition), calls it a “close coupling” between mind and tool. Citing the simple example of thinking by writing with pen and paper, he notes:

> When a person writes on paper, the two form a reciprocal system. The person causes paper changes, paper changes partially cause person changes. This reciprocal interaction allows the person to find expressions, to represent and explore ideas using the persistent state of the paper that would otherwise be impossible. There is a dynamic between the two.

It’s when a slowdown shatters this close coupling that a breakdown occurs. The beauty of pen and paper as a tool is that it is always fast and responsive. Only when the pen runs out of ink in the middle of a thought does the tool suddenly become conspicuous, present-at-hand.

Our aim, as software designers and developers, should be to never break this coupling.

---

Speed is not a feature; you don’t build software and then tack on speed as an enhancement later. Sure, you can speed it up through refactoring or optimizations, but you will inevitably hit the limits of what is achievable—a limit imposed on you by the inertia of earlier decisions. Pushing beyond this limit often involves rebuilding large swaths of the entire system.

Speed is thus the byproduct of numerous architectural, product and design decisions on the macro and micro scale throughout the development and maintenance of a system. Achieving speed means considering it as a factor in each and every one of these decisions. 

On the macro scale, it means wise platform, framework and other technology choices at the outset of a new project. But it also means smart—nay, ruthless—design and product decisions. Simple software is easier to make fast than complex software. The more features you add to a system, the less likely it is to be fast or remain fast in the future. This isn’t because computers have trouble with complexity; it’s because humans have trouble with complexity. You can’t optimize a system you don’t understand, and the more complex it is the less likely anybody is able to understand it. Worse yet is the complexity lurking in third-party libraries and other dependencies written and maintained by people who have equal trouble understanding their own systems. As Craig Mod [once wrote](https://craigmod.com/essays/fast_software/):

> If a piece of software is becoming taurine-esque, unwieldy, then perhaps it shouldn’t be a single piece of software. Ultimately, to be fast is to be light. 

On the micro scale, achieving speed means understanding and appreciating how targeted, tiny optimizations scattered throughout a code base can sometimes add up to significant gains. There is an adage in software development: avoid premature optimization. But, taken to extremes, such avoidance will bite you, and you will have to decide what, when and where to optimize. Many optimizations will have no noticeable effect for users. But there is some subset of optimizations hidden within the code that, taken together, could have dramatic impact. Identifying which optimizations matter, and which are red herrings, is hard work—the time for which must be specifically allocated or it’s likely to never happen.

To address this problem, software organizations sometimes assemble entire teams of engineers dedicated to software performance. The common misperception is that it is such a team’s job to make the software go faster by performing these types of optimizations. In reality, the performance team’s job should be to help ensure that _everyone else_ in the organization can help make the software go faster, and that the software stays fast. They are the torch-bearers for speed, but they shouldn’t be the only team with their foot on the accelerator. Typically, such a team can help achieve speed by instead designing metrics and building tools—test infrastructure, profilers, performance regression monitors, baseline metrics, and the like. They can also help identify exactly what should be optimized by employing these tools and paying attention to user feedback. Rarely should they be doing the actual work of optimizing.

Performance is not just speed. People sometimes conflate speed and performance, but there is a difference. You achieve speed by paying attention to performance, which involves the efficient use of computer resources, from memory to power to bandwidth to CPU usage. But some facets of performance may have no effect on speed, or maybe even affect it adversely (e.g. reducing power consumption or limiting cache sizes). Sometimes we must sacrifice speed for performance elsewhere.

Speed is fundamentally a perceptual phenomenon. You can speed up software by making absolutely no performance improvements at all, simply by making alternative design decisions that affect the human perception of responsiveness. Often this may be achieved by delaying or reprioritizing work performed by the computer. The classic example of this involves aligning the prioritization of what gets drawn on the screen first with that which the user cares about the most. In the end, no performance characteristics have changed—all rendering work performed by the computer is the same—but the order in which it is performed can make a significant difference in how users perceive the speed in which it happens <sup><a href="#3">3</a></sup>.

---

Speed is fascinating precisely because it _is_ perceptual, because it sits at the nexus of design and engineering, philosophy and implementation. To care for speed—to make and maintain fast tools—is fundamentally to care for and nurture the relationships that people build with the tools we create. It’s not just about efficiency, or respecting peoples’ time—it’s about building things people love to use. Nobody, after all, wants a wonky hammer.

<aside class="footnote">
<p><a name="1"></a>[1] This is just a singular example, but thousands of engineer-hours are spent by web browser developers just to optimize page scrolling responsiveness alone. This fact is often under-recognized. Page scrolling responsiveness is one of the primary metrics (after page load and render) that many Internet users use to subjectively determine whether a browser is fast or not. Scrolling is the most common action one performs in a web browser, and humans are highly-sensitive to “jank” and dropped frames while scrolling.</p>
<p><a name="2"></a>[2] From <a href="https://doi.org/10.1207/s15327884mca0501_3">The Concept of Breakdown in Heidegger, Leont'ev, and Dewey and Its Implications for Education</a></p>
<p><a name="3"></a>[3] A common metric used in evaluating rendering performance is called time-to-first-paint. Time-to-first-paint is irrelevant if the first thing being painted is unimportant to the person looking at it. In web browsers, more relevant metrics have been introduced: First contentful paint and <a href="https://developers.google.com/web/tools/lighthouse/audits/first-meaningful-paint">first meaningful paint</a>, the latter of which best addresses the issue of perceived relevance when painting pixels, but as such is difficult to standardize across browsers.</p>
</aside>