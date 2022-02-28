---
layout: post
title: Design for fidgeting
---

> We are not minds that happen to have bodies to do their physical work. Rather, we are bodies that seem to have minds. We are bodies in motion that happen to produce a subjective sensation we call _consciousness_, which gives us the impression that we are something more than, or something other than, bodies. This is the remarkable illusion we call _mind._ — Simon Penny, [Making Sense](http://www.worldcat.org/oclc/1102348448)

I believe software should be delightful to use. That it should not simply help us accomplish tasks—communication, collaboration, design, creation, thinking—but that it should _feel_ pleasant, joyful, even fun to use while accomplishing these tasks. The challenge of designing and building software that actually meets this criteria, of course, is notoriously difficult. There is no formula to follow when building ["non-boring" apps](https://www.andy.works/words/no-more-boring-apps). Delight is a feeling; you know it when you feel it.

A few months ago, the Metamuse podcast featured an [interview with Jason Yuan](https://podcasts.apple.com/us/podcast/17-rethink-the-os-with-jason-yuan/id1504506097?i=1000498277608), designer of [MercuryOS](https://www.mercuryos.com/), which includes a wonderful take on the need for more fun and physicality in modern user interfaces, particularly in productivity tools. At one point in the podcast (around 35:50), Yuan comments on the original iPod and its unforgettable click-wheel:

> It was fun. And because it was fun, people cared about it. But it was also great for fidgeting ... With my computer I can't really fidget. The interface itself is not designed to let you fidget ... I feel like play and fidgeting are my tools for thought. I can't think if I'm strapped to a chair somewhere ..."

And, a few minutes later into the conversation, he implores:

> I want to see more tools for thought that happen to be playful and fun and really unapologetic about it.

The word "unapologetic" is critical here. In the quest to build and ship software that works well, that performs its function, it's easy to let delightfulness fall to the wayside, to morph into some lesser principle like responsiveness or performance. An unapologetic adherence to play may be one tactic for ensuring the joy and spark of an original, delightful vision isn't lost through the months or years of planning, building, testing, iterating, execution. 

Fun and playfulness are perfectly acceptable design principles. Sometime it's easy to forget that we are, after all, in the words of Huizinga, "[Homo Ludens](https://en.wikipedia.org/wiki/Homo_Ludens)"—people who play. But if we are going to create software for Homo Ludens, then it would behoove us to follow [Bill Gaver's advice](http://www.paulos.net/teaching/2011/AO/readings/homoludens.pdf), and seek "intrigue and delight at all levels of design," even in the most minuscule levels, the tiniest of details. Even where it feels at first inconsequential, because likely it isn't.

This is where I feel Yuan's passing comment about fidgeting fits in. Could "fidgetability" serve as a kind of metric for delight?

The need to _fidget_ doesn't get much attention in product design, yet I love this framing of fidgeting as a kind of "play for thinking." I feel there's something worth exploring in the idea of _design for fidgetability_. Not just to support playfulness for play's sake, and not just to accommodate the fidgeters of the world, but because there's a coupling between play, fidgeting and thinking that feels simultaneously alluring and elusive.

Postcognitivist schools of thought—namely [embodied cognition](https://en.wikipedia.org/wiki/Embodied_cognition)—recognize the role of the body in thinking and creative expression. In certain contexts, we think and create as much with our bodies as with our minds. It's sometimes easy to forget this when so much thinking and creative output these days happens _through software_, sitting on a chair, poking at a keyboard or clicking a mouse. Our bodies hardly seem to enter the picture; there's an impedence mismatch between the expressiveness of the human body and what standard computer input modalities can accommodate. And there's a reason that so much great thinking doesn't happen at the desk or on a computer, and instead when we are in motion—pacing, walking, showering, standing at a chalkboard, or sketching with paper and pen. In these moments of movement, we have engaged our bodies as well as our brains, bringing our whole being into the picture, honing our focus.

Fidgeting offers a way of engaging the body—albeit minimally—while still sitting in a chair. Rather than pointless or harmful motion, or even just a sign of waning attention, fidgeting appears to actually [help us _sustain_ attention](https://www.frontiersin.org/articles/10.3389/fpsyg.2013.00619/full). It may even [benefit our health](https://www.nytimes.com/2016/09/14/well/move/why-fidgeting-is-good-medicine.html). So if we're serious about designing and building better "tools for thought" or "tools for creativity"—and making them fun in the process—then maybe, just maybe, it's worth considering the need for, and joy of, fidgeting. At the very least, fidgetability might serve as a first-level indicator of playfulness, a baseline metric of fun. 

Besides, people will often try and fidget with an interface, whether or not it was designed to support it. 

A brief anecdote: A few years ago, when I was in the design organization at Adobe, we distributed a customized version Photoshop to a few of our designers. We equipped this version of Photoshop with additional telemetry for tracking individual tool usage, which we had hoped would give us a better idea of how our designers used the tool in their regular, day-to-day work. After a few days, a member our team noticed some irregularities in the data—odd tool usage patterns that didn't make any sense. At first we thought our telemetry was broken, but we soon deemed that not to be the case. Instead, closer observation of our "test subjects" (i.e. our colleagues) revealed the mystery: the strange tool usage patterns were caused by one of our designers rapidly oscillating between two tools (the selection tool and one other) while he was working. The reason: he was _fidgeting._ The rapid tapping at the keyboard shortcut keys for the two tools helped him think!

Of course, other than the sound and tactility of clicking keys, keyboard tapping is hardly a satisfying way to fidget. Touch-based interfaces offer far more interesting possibilities, particularly when coupled with direct manipulation. In the Metamuse interview, Yuan comments on the joy of direct manipulation and physics-based interfaces, how in the way they emulate real physical phenomena, provide a delightfulness that cannot be replicated with pre-rendered transitions or animations.

For instance, consider scroll "rubber banding." Rubber banding is the now common physical simulation of spring force resistance and snap-back during scroll overflow that was first pioneered on iOS. This effect [serves a real purpose](https://www.cultofmac.com/489256/bas-ording-rubber-band-effect-iphone/), particularly on touch-based interfaces: it indicates when you have reached the end of a scrollable area without the jarring stop that would otherwise make the software feel like it has suddenly gone unresponsive. But, from bus stops and conference rooms, I've witnessed plenty of Mac and iOS users playing with rubber banding too—bouncing it up and down, fidgeting with it while reading an article or waiting for something to load. I often do the same. Rubber banding happens to be wonderful for fidgeting because it simulates the physics of a real-world object: a spring.

What does this all mean? I have no idea. But there's some validity in taking play seriously in software design, and that includes play for thinking, fidgeting, creating opportunities to engage our bodies in the process of using our machines. It's going to take an unapologetic commitment to fun. As Bill Gaver [wrote in "Designing for Homo Ludens"](https://www.researchgate.net/profile/William_Gaver/publication/242529258_Designing_for_Homo_Ludens/links/5446e65c0cf2d62c30504f8b/Designing-for-Homo-Ludens.pdf):

> The designer’s role in this is not like that of a doctor, pre-scribing cures for people’s ills; nor is the designer a kind of servant, developing technologies that
people know they want. Instead, designers should be provocateurs, seeking out new possibilities for play and crafting technologies that entice people to explore them.