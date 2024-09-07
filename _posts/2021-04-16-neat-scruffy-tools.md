---
title: Neat and scruffy work in digital tools
description: Can we do better at building software that supports both neat and messy work?
category: blog
---

Sometimes creative work is neat, orderly, tidy, but most of the time it's not—it's scruffy, messy, disorganized. I have a hunch that computing environments for creative work don't support "scruffy" work very well, nor do they make it easy for neat and scruffy work to peacefully coexist. Can we do better?

<hr>

In 2001, David Kirsh, a professor of cognitive science at UCSD, published [The Context of Work](http://interactivity.ucsd.edu/articles/HCI/final.html), an 18-page analysis of the typical office environment and its impact on human cognition. I first read this paper over a decade ago, and I somehow manage to unwittingly revisit it every few years. It haunts my thoughts—not necessarily my thoughts about office design (I don't have many), but rather my thoughts on the design of software tools.

"The Context of Work" analyzes a office spaces through the lens of [distributed cognition](https://en.wikipedia.org/wiki/Distributed_cognition), a theory of cognition which posits that human thought doesn't just happen "inside our heads," but is instead distributed externally through our use of tools, social relationships, and artifacts in our immediate environment. According to distributed cognition, in order to fully understand human thought we must take into account how much we humans offload our thinking _to the world_—through notes, diagrams, models, maps, team collaboration, and other such externalities. 

Offices, as a complex ecology of work, often shared amongst many people working together towards common goals, are a rich evironment for the study of distributed cognition because the artifacts of thinking are everywhere: on whiteboards, papers, inboxes, post-its, posters, computer screens, even the arrangement of the physical space itself. But the placement, structure, and organization of these artifacts varies greatly from office to office. Depending on the predisposition of the occupants and the nature of the work performed therein, some offices tend to be well-organized, neat, tidy, perhaps even a sterile in their physical appearance. Other offices lie on the other end of the spectrum—a complete mess of papers, stacks of books, tools, posters, and other miscellaneous artifacts strewn about.

Kirsh divides these two types offices into two categories he calls "neat" and "scruffy" (terms [he borrows from the field of artificial intelligence](https://en.wikipedia.org/wiki/Neats_and_scruffies)). Depending where it lies on the neat to scruffy spectrum, an office can either support or interfere with different types of thinking and knowledge work in different ways. 

There are some parallels to draw here for digital tools and workspaces. 

## Like offices, digital tools are places for thinking

An office is an environment for thinking and creative expression. So is a design studio. So is a workshop. These places provide the support structure—the _scaffolding_—for the thinking and creative work that happens within their walls. In this context, what constitutes an office, or a studio, or a workshop is more than just the physical space, more than just the walls, the chairs, the desks—it also includes all of the tools, artifacts, people, information, and even social structures that support meaningful activity within the walls. An office is more than just a space, it's a _place_.

As Paul Dourish writes in [Where the Action Is](https://mitpress.mit.edu/books/where-action), "the distinction between space and place is, approximately, a distinction between the physical and the social." A place includes the social understandings that give meaning to the activities that happen within a space. The knowledge that imbues a sense of place emerges as part of collective behavior over time. So when we use terms like "environment for thought" we have to be careful; an environment, like a place, connotes more than just the physical structures or affordances.

I believe the same to be true for digital tools designed for thinking or creative expression—Photoshop, Figma, Notion, Google Docs, Excel. These too provide scaffolding for cognition, these too act as virtual places that don't simply offer virtual affordances for offloading cognition, but also—and increasingly so, as they become more collaborative—serve as loci for the development of social norms and shared meaning.

## Like office design, the design of digital tools affects how we think

There's a reason so many design studios and workshops and other creative places look and function the way that they do: perhaps a bit messy, with open floorplans, prototypes and models and other miscellanea visible on open shelves, ephemeral bits of in-progress work strewn on desks. As the researchers at Ink and Switch wrote [in their article on Muse Studio](https://www.inkandswitch.com/muse-studio-for-ideas.html):

> Creative people tend to nest. A professor in their classroom, a writer in their home office, a woodworker in their shop, an artist in their studio—these spaces are full of work surfaces like desks and drafting tables, drawers and pegboards full of tools, pinboards and chalkboards and whiteboards, scraps of paper, photos, books, printouts, works-in-progress, post-its, and more. They are messy, informal, mixed together, freeform, and personal.

The "nesting" and physical arrangement of these places typically supports creative work better than a spare, minimialist office, or a spartan row of individual, tidy cubicles branching out from a long corridor. Why is this? First, as Tore Kristensen notes in [The Physical Context of Creativity](https://onlinelibrary.wiley.com/doi/abs/10.1111/j.0963-1690.2004.00297.x), we humans move around a creative space the way we move around any other landscape, performing a "perceptual rehearsal," priming our imaginations for novel thoughts and new conceptual connections. Asymmetric spaces and interesting artefacts create a more challenging and exciting atmosphere for this imaginitive priming. We want creative places to feel inspiring. Second, particularly when it comes to collaborative environments, proponents of open floor plans are apt to point out the creative benefits of such an environment (albeit downplaying the many challenges): namely that coworkers are more likely to overhear and bump into each other, serendipitously conversing and sharing ideas. Consider the now well-known lore of Steve Jobs insisting on a central location for Pixar's cafeteria and bathrooms, the quintessential example of using architecture to shape culture and group cognition.

As places for knowledge work, digital workspaces also shape how we think. Poorly designed tools add cognitive overhead that may detract from the task at hand, impairing a user's ability to get in the "flow" and think deeply about a problem. Well-designed tools may more readily support a flow state, but the fidelity at which they allow a user to operate may be too high or too low for the task at hand. The tool may feel too constraining, or it may not support the right type of representations for the problem, leading users towards down the wrong path. The tool may allow for collaboration with others, but the communications mechanisms it supports might not be rich enough, or they might be too high-bandwidth, too overwhelming.

## Digital tools tend to be neat

Most digital tools don't readily afford messy, scruffy, creative work. The researchers at Ink and Switch also noted this phenomenon:

> Compare these [creative places] to our digital workspaces: what we see on the screens of our computers, tablets, and phones. Lists and grids of items, neatly arranged by the computer (perhaps sorted by date or name). Media types are often siloed (text notes in one place, web pages in another, PDFs and their highlights in still another) and difficult to view together. We don’t entirely choose what goes into our workspaces and things don’t tend to stay where we left them. In short, digital workspaces are structured, sterile, and impersonal." 

I'm not entirely sure why this is true. Is it the result of bias on the part of interaction designers who tend to prefer neat, organized environments? Is this the result of the technological constraints—perhaps low-fidelity display technology or low-bandwidth input devices? Is this the natural outcome of a history of computing that tended to impose order on things for the sake of the machine's own efficiency? (i.e. File hierarchies over search.) 

Whatever the reason, this tendency towards neatness, of imposing order too early in a process that demands scruffiness, stifles divergent thinking.

## Neatness stifles creativity

In "The Context of Work," Kirsh contrasts neat and scruffy places by quantity and visibility of _entry points_—structures or cues in the environment that act as an "invitation to do something." An entry point might be a todo list on a sticky note, a piece of mail sitting in an inbox, or an intentionally-placed book or memo. Neatly-organized offices err towards placing entry points at standard, canonical locations like filing cabinets, journals, organizers, folders. As such, work tends to be hidden away, less visible, and requires more cognitive overhead in remembering the canonical locations for the various entries into different kinds of available work.

The advantage of neatness lies in its propensity to induce focus. With fewer entry points visible, neat places have fewer distractions, and fewer options visible means less cognitive overhead in deciding "what to do next." Neatness promotes convergent thinking. Scruffy places, however, offer the distict advantage of providing more opportunities for serendipitous encounters with information. As Kirsh writes:

> In the office environment the greater the number of entry points the greater the chance that looking for information needed for one task will prove useful for another task not currently in the immediate goal stack ... Because scruffies are more likely to keep entry points of other tasks around, invariably with less than clear demarcation between them, there is a higher chance of accidentally stumbling on material useful to Task 2 when looking for material useful for Task 1.

In short, scruffy places promote _divergent_ thinking.

## We need both neat and scruffy places

Software has historically been quite good at imposing order and organization on information. It has been less successful at supporting scruffiness, at allowing for messiness and free association of disparate or unlike types of data or pieces of information. A spreadsheet is wonderful for organizing and displaying numeric or textual information in tabular format; it is not-so-good for connecting two previously unconnected ideas into a novel insight. 

Even a screen design tool like Figma or Adobe XD, with its open and infinite canvas seemingly lying in wait for a mess of sketches and ideas to fill its pixels, tends towards orderliness by virtue of the functionality it provides. Artboards and canvases impose boundaries, layers panels demand organization, and high-fidelity drawing tools nudge designers quickly towards high-fidelity, pixel-perfect compositions. Most screen design tools are thus not particularly well-suited for the early phases of the creative process, where ideation demands messiness and the order of things is generally unclear. They can be used in this way—certainly people use Figma as a tool for early-stage ideation—but by virtue of the fidelity in which they operate and types of representations they support, they tend to be better for expressing solutions to design problems rather than thinking about poorly-understood problem spaces.

This is why many people still rely on analog tools—large pieces of paper and sticky notes and pens and printouts. With these tools you can make a mess; you can see many disparate concepts and ideas together at once. You can leave them on the table, visible for hours or days, and come back to them later.

I feel there is a place for more tools to support creative, divergent thinking and the messy nature of the early creative process. I feel there is a place for more scruffy software. Places for multiple collaborators to come together and make a mess—pull in disparate types of content, arrange it, rearrange it, mark it up, leave it in "piles" for future reference as entry points for tomorrow's thinking. [Muse](https://museapp.com/) is a step in this direction. Bottom-up, networked notetaking tools like [Roam](https://roamresearch.com) _could_ also be a step in this direction, particularly if they embrace more content types, more visual "mess" through spatial hypertext.

But beyond this, I also feel there is a place for tools to support both neat _and_ scruffy ways of working. Unlike an office or a studio or a workshop, the arrangement of a digital workspace is instantly malleable—we can change it on a whim. We can have both scruffy and neat views into the exact same data. Neat and scruffy work can happen simultaneously in the exact same place by different collaborators. Where one person might be trying to impose order on a set of notes and references in order to assemble it into the outline for a text, another might be working with the same notes in search of patterns and connections, hastily jotting ideas or pulling in outside content without much thought to organization. It's possible to support both modes of working in the same place <sup><a href="#1">1</a></sup>.

This has implications for how well software can support all phases of the creative process, as well as different stakeholders working together during those different phases. True, some people are naturally "scruffier" or "neater" than others, but certain types of work demand mess, and other types of work demand precise organization, often during the course of the same project. In the beginning of many creative projects, things are messy, ill-defined, poorly-understood, and the work is about surveying a vast knowledge space, making connections, pulling in content and ideas. Later, as things begin to crystalize and congeal, solutions are proposed, and work becomes more about pulling and presenting structure from the chaos. Oftentimes, projects cycle through these phases multiple times.

Is it possible for a single tool or cohesive suite of tools to support both ways of working? Perhaps.

<aside class="footnote">
<p><a name="1"></a>[1] Kirsh calls the structured environment in which specific tasks unfold an "activity landscape." It is a kind of conceptual construct describing the tight coupling between how an environment scaffolds or supports a person's work, and how a person projects structure and meaning onto that scaffolding. But the interesting thing about activity landscapes, even in the physical world, is that they may be superimposed on top of each other. A single place can support multiple, parallel activity landscapes. Two office workers can exist in the same space, engaged in vastly different activities, using the same equipment and materials, trying to accomplish different tasks. The same can be true in virtual workspaces.</p>
</aside>
