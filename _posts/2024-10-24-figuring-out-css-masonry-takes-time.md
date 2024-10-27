---
title: CSS masonry will take time, and that's just fine
description: Reflections on CSS masonry's early origins and the slow evolution of the web.
category: blog
image:
  path: /assets/images/ivy_bricks@1200x630.jpg
  width: 1200
  height: 630
---

Back when I was managing the CSS and layout team for Firefox, one of the engineers on my team — Mats, our resident grid layout expert — approached me with the idea for what is now [CSS grid layout level 3](https://drafts.csswg.org/css-grid-3/), aka CSS masonry layout.

At the time, working on masonry was _definitely not_ what Mats should have been doing; we had a backlog of performance bugs and printing improvements we were trying to tackle, and I really wanted Mats to focus on those. But, I knew he was just going to work on it anyway. I also felt that Firefox should've been dedicating more resources to paving the way for new web platform features, not always following in the other browsers' footsteps. Of course, being the first to prototype and ship _any_ new platform feature is usually not to Firefox's strategic advantage; Mozilla is just too small. It's generally better to let the other browser vendors spend engineering dollars on the expense of the prototyping phase. Then, when things are close to standardized and the details have been solidified, quickly implement and ship.

But, I told Mats to run with it. It was a small political risk — spending precious engineering resources on something so unlikely to move the needle in user retention or adoption for Firefox — but nobody above me complained (much). And soon enough we had an explainer document and Firefox was the first to release masonry behind a feature flag in Nightly. Being relatively new to browser engine development, I naively thought masonry might get standardized and shipped across all browsers in the next year or two.

Silly me ... it's been four years and it _still hasn't shipped._

I'm reflecting on all this now because [Miriam's write-up on the masonry syntax debate](https://www.oddbird.net/2024/10/01/grid-masonry-nuance/) is sooo good. It's about masonry, of course. But what it's _also_ about is the extreme care and thought that goes into standardizing and shipping new web platform features, especially for CSS. As an engineering manager, I was never too deeply involved in W3C standards — that wasn't my job — but I developed a deep appreciation for the work involved in the standards process. This stuff just takes time.

In [Weaving the Web](https://bookshop.org/a/106240/9780062515872), Tim Berners-Lee wrote:

> The Web has to be able to change slowly, one step at a time, without being stopped and redesigned from the ground up.

Slow change on the web is a feature, not a bug. The web platform sits low on the [pace layer](https://jods.mitpress.mit.edu/pub/issue3-brand/release/2) stack. Unshipping things is basically impossible, so you have to take the time to get them right the first time.

This is echoed in something [Dave Rupert once wrote when reflecting on browser engine diversity](https://daverupert.com/2020/09/the-value-of-browser-diversity/):

> There’s a lot of value in slow thinking. You use the non-lizard side of your brain. You make more deliberate decisions. You prioritize design over instant gratification. You can check your gut instincts and validate your hypothesis before incurring mountains of technical debt.
>
> I think just enough iteration before a release produces better products. Because once it’s out, it’s out. There’s no turning back or major API changes.

Personally, I have no strong opinions on the masonry syntax debate. But watching it from the sidelines has reminded me to be grateful for the deliberate, slow thinking and hard work that goes into making the web platform as great as it is. I'll be excited to use masonry whenever it is widely available in every browser, but until then I'm also more than willing to be patient.
