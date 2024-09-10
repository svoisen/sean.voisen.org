---
title: The Low Road as a metaphor for building sticky software
description: In which I ponder Stewart Brand's Low Road architecture as a metaphor for approaching software design.
category: blog
---

Some of the world's most beloved software tools—those with rabid cult followings and low user turnover—are often the most extensible. Tools that support rich plug-in ecosystems and strong interoperability, tools that allow you as a user to modify their behavior—these tools often exhibit the unusual property of incredible *stickiness*. While such tools may require time to love, users are reluctant to abandon them once they have dedicated the energy to customizing, configuring, hacking, or extending them to fit their workflow. 

These are "Low Road" tools.

---

In his book [How Buildings Learn](https://en.wikipedia.org/wiki/How_Buildings_Learn), Stewart Brand describes “Low Road” buildings as inexpensive, adaptable buildings that can be readily configured for multiple purposes over their lifetime. Think warehouses, loft spaces, industrial parks, cheaply fabricated modular units—buildings typically characterized by open interiors, minimal design, exposed infrastructure. The spartan construction and minimalism of Low Road buildings encourages hacking; they can often be readily and affordably modified to suit their inhabitants needs. Because of this, Low Road buildings are where creative people naturally gravitate to do amazing things. Brand writes:

> Low Road buildings are low-visibility, low-rent, no-style, high-turnover. Most of the world’s work is done in Low Road buildings, and even in rich societies, the most inventive creativity, especially youthful creativity, will be found in Low Road buildings taking full advantage of the license to try new things.

Perhaps the most famous Low Road building is MIT's Building 20, hastily slapped together in 1943 for the purpose of radar research during WWII:

> Unusual flexibility made the building ideal for laboratory and experimental space. Made to support heavy loads and of wood construction, it allowed a use of space which accommodated the enlargement of the working environment either horizontally or vertically. Even the roof was used for short-term structures to house equipment and test instruments.

Over the years, Building 20 served as incubator for a variety of scientific and creative experiments, startups, and other organizations. Some of the most famous of uses of the building included housing the [Tech Model Railroad Club](https://en.wikipedia.org/wiki/Tech_Model_Railroad_Club), providing space for [Amar Bose's](https://en.wikipedia.org/wiki/Amar_Bose) early research into loudspeakers and audio reproduction, as well as serving as an early home for [DEC](https://en.wikipedia.org/wiki/Digital_Equipment_Corporation), early research in high-speed photography, and even Noam Chomsky's linguistics lab.

The secret to all of this success? [Adaptive design](https://medium.com/a-chair-in-a-room/architecture-and-interaction-design-via-adaptation-and-hackability-a51204564a1d). Hackability. *"Low Road-ness."*

As one professor said of Building 20:

> If you wanted to run a wire from one lab to another, you didn't ask anybody's permission — you just got out a screwdriver and poked a hole through the wall.

## Low Road means low ego

I love Low Road as a metaphor for hackability in software design because the name implies a low ego approach. Low Road buildings are simple, humble, utilitarian, not ostentatious. They have been designed, of course, but no more than necessary, and certainly not in a way that would discourage alteration. Poke a hole in the wall and run a few wires if you need to, or rip out walls, re-route the HVAC, attach entire additions. You won't be offending some architect's vision of perfection!

And it is precisely this removal of ego that allows these tools to be so sticky. Brand quotes Brian Eno:

> An important aspect of design is the degree to which the object involves you in its own completion. Some work invites you into itself by not offering a finished glossy, one-reading-only surface.

In [The Timeless Way of Building](https://en.wikipedia.org/wiki/The_Timeless_Way_of_Building), Christopher Alexander makes similar observations about architecture:

>  When a place is lifeless or unreal, there is almost always a mastermind behind it. It is so filled with the will of the maker that there is no room for its own nature.

And thus ...

> ... we can only make a building live when we are egoless.

A building that "lives" is a sticky building, one that people *want* to inhabit.

In [Architecture and interaction design, via adaptation and hackability](https://medium.com/a-chair-in-a-room/architecture-and-interaction-design-via-adaptation-and-hackability-a51204564a1d), Dan Hill also notes the value of the designer removing themselves from the end product of the design, putting the creative power in the hands of the user instead:

> There’s a theme of humility running through adaptive design; of making the ‘designer-as-personality’ invisible, foregrounding the design itself, as a shared terrain. This also invites the non-designer in. This partnership aims to nurture well-designed solutions from people, rather than attempting to complete generalised products.

Hill is talking here about _adaptive design_, a specific approach to design that encompasses hackability. That is, hackability might be thought of as one approach for making a design more adaptable, but it's not the only facet of adaptability. (In his essay, for instance, Hill discusses other attributes of adaptability, such as the possibility for a digital product to learn from the behaviors of its user over time and shape itself accordingly. [It's absolutely worth a read!](https://medium.com/a-chair-in-a-room/architecture-and-interaction-design-via-adaptation-and-hackability-a51204564a1d))

All of this runs counter to the "Apple way" of building products, in which everything is polished, glossy, complete—so "filled with the will of the maker" that there's no room for individualization or _personality_. But humans feel a much stronger sense of identification with or ownership over those things in which we have taken part in even some small aspect of their completion. Those things that they have made uniquely *their own.*

A tiny example: A few months ago I assembled a [ClockworkPi DevTerm](https://www.clockworkpi.com/home-devterm) mini computer with my son. I can't begin to describe how fond I am of this little device. Much of this fondness derives from the fact that we built it together (memories!) and from the thought and work I put into hacking the Linux system afterwards. It is uniquely *ours*.

## Low Road is more than customization

I would be remiss to imply that Low Road is just customization, though. Customization is the equivalent of a coat of paint or rearranging the furniture; it's certainly not poking holes in walls and running new wiring.

Low Road tools aren't just customizable. They are also extensible. To borrow from Dan Hill, their "seams" are purposefully exposed.

Extensibility implies the ability to change a software's capabilities in amount, but not necessarily in kind. An extensible software architecture typically provides an API surface upon which extensions may be built. Such API surface carefully limits the scope of what can and cannot be done. Generally an extensibility API aligns thematically the base functionality already provided by the tool. A spreadsheet, for instance, is highly unlikely provide an API to support the creation of drawing tools.

This is not dissimilar from physical buildings though! A building, too, provides a kind of API surface in the existing structure, foundation, and site. These are constraints that are difficult, if not impossible, to change, and thus limit the scope of how a building's "capabilities" might be altered.

But at least a Low Road building *can* be altered and in obvious ways. It too has its seems exposed.

---

Where do we see Low Road tools in the wild? A few examples: Spreadsheets of all kinds, [Visual Studio Code](https://code.visualstudio.com/), [WordPress](https://wordpress.org), [Vim](https://www.vim.org/), [Obsidian](https://obsidian.md), and [Raycast](https://www.raycast.com), just to name a few.

While they each of these tools provides basic functionality for accomplishing a particular class of tasks, they derive much if not all of their usefulness from user modification—either through installing or creating lightweight extensions, or through user scripting. They also serve as the focal point of interest for strong communities and cult followings. People tend to love them.

---

Anyway, why am I writing about all this?

Unfortunately, we live in an era rife with the technological equivalent of what Stewart Brand calls "Magazine Architecture" or "No Road." As Brand describes it, Magazine Architecture is shiny, beautiful, artistic—think I.M Pei buildings—but outright hostile to modification. 

The technological equivalents of this are web applications that own your data with no possibility of [credible exit](https://subconscious.substack.com/p/credible-exit), social networks acting as walled garden aggregators, glossy single-purpose mobile apps, hardware you cannot open up and fix yourself. This approach to technology is disempowering and anti-convivial. 

No Road tools are—sadly—everywhere, but the Low Road is where the love is.
