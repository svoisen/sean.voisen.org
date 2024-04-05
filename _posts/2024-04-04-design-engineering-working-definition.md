---
title: Design engineering, a working definition
description: A few thoughts on how we define the role of "design engineer."
---

Design engineering seems to be, as [Chris Coyier has noted](https://frontendmasters.com/blog/design-engineers/), "having a moment." 

It could just be the [frequency illusion](https://en.wikipedia.org/wiki/Frequency_illusion) at play, but I've noticed a recent uptick in the number of blog posts discussing the design engineering and its impact on the software design and development process. Here's a sample of some of the articles I've run across in the past few weeks:

- David Hoang describing [the role of the design engineer](https://www.proofofconcept.pub/p/design-engineering) in his newsletter
- Folks at Vercel writing about [how design engineering works there](https://vercel.com/blog/design-engineering-at-vercel)
- Emil Widlund explaining [why a design engineer career is an investment for your future](https://polar.sh/emilwidlund/posts/becoming-a-design-engineer-is-a-career-investment)
- Jim Nielson adding [parts II](https://blog.jim-nielsen.com/2024/the-case-for-design-engineers-pt-ii/) [and III](https://blog.jim-nielsen.com/2024/the-case-for-design-engineers-pt-iii/) to his ongoing [case for design engineers](https://blog.jim-nielsen.com/2022/the-case-for-design-engineers/)
- Maggie Appleton sharing [a list of public-facing design engineers and their work](https://maggieappleton.com/design-engineers)
- Chris Coyier giving [his take on design engineers](https://frontendmasters.com/blog/design-engineers/)

Given that I currently earn my living leading teams of design engineers inside [Adobe's Design organization](https://adobe.design), and that I spent a good chunk of my earlier career working as a design engineer, I have *some thoughts* on the matter. In particular, I have thoughts on how we collectively *define* the design engineering role, and I feel I'd be remiss if I didn't add my voice to the conversation.

---

Like any interdisciplinary or multidisciplinary role, the role of the design engineer eludes easy definition. Though the title "design engineer" seems to be gaining in popularity, we can't even unanimously agree on what to call it. In the industry you're likely to encounter many synonymous or nearly-synonymous titles: UI engineer, UX engineer, design technologist, experience developer, design prototyper, creative technologist, just to name a few. The challenge with *design engineer* is that [this title already exists in other engineering industries](https://en.wikipedia.org/wiki/Design_engineer), and means something radically different in those industries compared with how we've defined it for software. Nevertheless, design engineer seems to be the label with the most sticking power. I'm fine with that.

The frequently-cited shorthand definition of design engineer is simply: Someone who specializes in the intersection of software design and engineering. You'll often hear that design engineers are "designers who code" or "engineers with design skills." While all this is mostly true, as definitions they're semi-tautological and not particularly helpful. You can't accurately describe the role without describing what design engineers actually *do.*

So, I have my own working definition. I qualify it with *working* because by no means do I mean to imply that my definition of design engineering is the canonical one. But it is often what I use to describe my own teams' work and position within our broader organization, and I've found it valuable in this respect. 

### What is design engineering?
Here's my working definition.

> Design engineers solve the particular problems that arise where design and engineering overlap. Specifically, design engineering enhances, improves and supports user experience design through three primary activities:
> 
>  - **Prototyping new product experiences** to help designers learn about designs and validate design assumptions
>  - **Building tools and infrastructure** that allows design to operate at scale and smooths designer-developer workflows (e.g. design systems)
>  - **Building user interfaces and product experiences** that other engineers can't or won't (for various reasons) be able to build while staying true to design intent

I'll expound upon these three primary activities in the remainder of this post, but first some pretext about my particular bias and framing.

### What design engineering is, and isn't, about
#### Design engineering is about design
I believe the "design" in design engineer comes first for a reason. Design engineering exists to support design and to help ensure the output of product development stays true to design intent. While design engineers may partner closely with other engineers to help them get their jobs done—that is, they *engage* with with other engineering practitioners—they do not necessarily *serve* the practice of engineering. But design engineers *do* serve the practice of design. This stands in contrast with other types of engineers—SREs or DevOps engineers for instance—whose roles clearly exist to serve and improve engineering processes.

I don't mean to imply that design engineering doesn't benefit the process of product engineering. It always does, and often to a significant degree. A well-built UI component library is a piece of high-leverage front-end infrastructure that will always increase the development velocity of any team that wields it well. Design engineers also often work on features that other engineers won't or can't take on, bringing a level of polish and fidelity to user experiences that would otherwise be neglected. And in the course of prototyping, design engineers will often solve specific technical problems, or have written bits of reusable code, that product engineers can reference or use during production. But still, design engineering done well means design first, engineering second.

#### Design engineering isn't just about the web
I've noticed a bias in many articles and blog posts about design engineering that focus exclusively on web and web technologies. Perhaps this has happened because design engineering as a title arose to prominence out of discourse within the web development community. But design engineering need not be confined to a particular technology or tech stack. 

Design engineers may build native mobile experiences, or VR or AR experiences, or desktop application experiences. And some of the most prolific design engineers in the industry have the skills to work across different platforms and tech stacks, sometimes equally adept at writing Swift code as they are working on the web.

#### A brief aside on career path and organizational design
A design-first perspective on design engineering has certain organizational implications. Specifically, it implies that design engineers may be better served operating within the design organization at their company, assuming one exists. This is because the work of design engineers is likely to be most valued by design and by designers. User experience prototyping and design systems building, in particular, are fundamentally about making design better, more scalable and more effective, after all.

But this design-side focus also introduces a challenge: design engineering *is* a kind of software engineering. The practice of design engineering entails writing code. Oftentimes, design engineers write code or build libraries that other engineers heavily rely upon. Many design organizations are not set up to serve the career development of those whose primary job function is coding. Should design engineers report to design leaders who may not fully understand their technical work and unique skillset? Or would they be better served operating as isolated experts within engineering? And what do management and senior IC levels of design engineering leadership look like in each arrangement?

These are challenging questions that have no single correct answer. Good organizational design is always dependent upon the context of the given organization you happen to be organizing. (For anyone interested in organizational design, I recommend [Org Design for Design Orgs](https://orgdesignfordesignorgs.com/) and Chapter 4 of the [Design Engineering Handbook](https://marketing.invisionapp-cdn.com/www-assets.invisionapp.com/epubs/InVision_DesignEngineeringHandbook.pdf), the latter of which provides a few insights into the pros and cons of different organizational models for design engineering.)

### The three activities of design engineering
#### Prototyping
Prototyping is a topic so vast that it deserves its own post, or probably a book. I'll have to make do with a few paragraphs. 

There are many things designers cannot learn or understand about their designs without a working prototype. And there are many types of designs for which a click-through style prototype, such as those you can build in Figma, are insufficient. This is where design engineering as a prototyping comes into play. The benefits of high-fidelity, working prototypes written in code are numerous: they help to eliminate unspoken assumptions between design and engineering, they reduce time wasted in meetings and help drive consensus, they prevent expensive mistakes that would otherwise be uncovered after product development, they help teams explore technical capabilities and limitations, and they help uncover new design directions and possibilities.

The prototyping of novel or delightful user interactions is what most people often think of when they think of high-profile or highly-visible design engineers. Most of the folks from Maggie Appleton's [collection of design engineers](https://maggieappleton.com/design-engineers), for instance, are people who design and prototype these kinds of interactions in out in the open. These are often people with the taste, design and programming skills to conceive an idea for a new interaction pattern and build a working version of it for public demonstration. Some of them even shepherd their ideas beyond the prototyping phase, and have the engineering skills to take them all the way through to production.

I include under the umbrella of prototyping early-stage new product incubation, or what David Hoang [calls in his post on design engineering](https://www.proofofconcept.pub/p/design-engineering), 0-1 R&D. The skills that make for successful prototypes largely overlap with the skills necessary to kickstart a new product idea in the R&D phase: scrappiness, good design sense, the ability to learn new technologies quickly, and a willingness to write lots of throwaway code.

Perhaps it's worth noting that prototypers who skew heavily towards the design side of the design-engineering spectrum may bristle at the title "design engineer." After all prototyping is *not* engineering in the traditional sense. If anything, *prototyping is designing with code*. (Or, as one person on my team likes to say: "designing by typing.") In some companies, prototyping specialists are sometimes called UX engineers or UI engineers or experience developers in an attempt to distinguish them from the design engineers who build design systems. Honestly, I'm not sure these title differences adequately distinguish the difference, and if anything, simply engender more confusion.

#### Building tooling and infrastructure
Most of the work of building design tooling and infrastructure is part of the purview of design systems engineering. Design systems engineering, like prototyping, probably deserves its own book. But, again, for now I'll have to stick with a brief summary.

Design systems engineers typically engage in the following activities:

- Designing and building design system infrastructure like token systems and associated transformation tools or pipelines
- Designing, building and maintaining design system documentation and infrastructure for publishing the documentation
- Designing, building and maintaining design tool plugins or other custom tooling used by designers
- Building design system implementations (i.e. component libraries)

And there's a long list of other things that design engineers do related to [glue work](https://noidea.dog/glue) like writing documentation or regularly interfacing with cross-functional teams—all of which are implied, but are not specifically called out above.

What design system engineering shares in common with prototyping is its role in smoothing designer-developer collaboration and workflows. Where working prototypes are often the best-possible artifact for communicating design intent to engineers, design systems implementations codify that intent into reusable components that, when done well, accelerate the work of other engineers.

Passion for sweating the details shines in design systems engineering, where design engineers strive to build reusable, accessible components with delightful microinteractions that are well-crafted, well-tested and easy to integrate.

#### Building UI
Sometimes design engineers are simply the best people at the company for building a particular bit of UI or entire experience in a product. Sometimes this work entails taking what started as a prototype and seeing it all the way through to release. Other times, however, design engineers are called upon to build a certain piece of user interface functionality because it requires strong design sense and willingness to finesse the details. Interactions related to direct manipulation, for example—where users will immediately notice dropped frames, imprecise timing or minor glitches in positioning—are the kinds of projects where design engineers excel.

There's a risk here in conflating design engineers who build UI with front-end engineers. After all, when it comes to building UI, isn't the work for each role largely the same? The line is blurry but the distinction remains: design engineers are there in the service of great design. Design engineers may be embedded within a front-end engineering team, but their remit should be to focus on the parts of the user experience that require not just building UI to spec, but actually helping figure out the interaction patterns, animation nuance and other details that cannot be easily specified by designers in the first place.

---

Despite the relative clarity of this three-part working definition, what I actually love most about design engineering is the *ambiguity* of its interdisciplinary nature. Design engineers possess a unique ability to thrive within the liminal space between two otherwise well-established disciplines, and therein serve as a bridge between worlds, fostering greater collaboration between design and engineering which, ultimately, leads to better experiences for users. 