---
layout: post
title: Thoughts on the design of conversational UIs
---

**Designers! Take heed!**

In recent years — and especially in the last few months — this curious notion about “conversational UIs” (CUIs) has [permeated](http://ben-evans.com/benedictevans/2015/3/24/the-state-of-messaging) the [human-computer interaction](http://www.wired.com/2015/06/future-ui-design-old-school-text-messages/) [zeitgeist](http://www.wired.com/2013/03/conversational-user-interface/). [Multiple](http://whoo.ps/2015/02/23/futures-of-text) [pundits](http://www.interconnected.org/home/2015/06/16/conversational_uis) have [suggested](https://medium.com/@mg/there-s-a-chat-for-that-apple-s-biggest-platform-opportunity-yet-19d5b1870857), in various forms, that we may have finally entered the era of the “conversational UI” (CUI). There is some talk that the CUI is, in essence, the new GUI. Maybe it was the release of the movie [Her](https://en.wikipedia.org/wiki/Her_(film)), or the rise of Siri, Cortana, Alexa and Google Now, but I think many of us (self-included) have become infatuated with the idea of simply “talking” with our computers. It sounds like a beautiful future.

But is it? Perhaps it could be if we make it so. 

To open, I present the following straw-man: Are the GUI’s days as the dominant method for which we interact with information technology truly numbered? On Medium, Matt Galligan recently asked:

> Do we really believe that the GUI is the end-all-be-all way to interface with a computer? With each new app we need to learn how to use it. Sometimes this can be quick, and intuitive, but oftentimes there is a learning curve associated with it … What if instead of installing an app, we might instead allow a service to chat with us … ?

A compelling idea, though nothing new. In WIRED, *way* back in 2013, [Ron Kaplan wrote](http://www.wired.com/2013/03/conversational-user-interface/):

> … the GUI, though it’s served us well for a long time, is beginning to fray around the edges. We’re now grappling with an unintended side effect of ubiquitous computing: a surge in complexity that overwhelms the graphical-only interface … I believe it’s finally time for the conversational user interface, or “CUI.” … This is the interface of the future …

In some ways, I think he's right. The CUI may indeed play a significant role in future user interfaces, but it&rsquo;s also safe to say that the GUI is firmly here to stay for the long-term. Still, there is something to be said for these proclamations.

Artificial intelligence has long promised — and just as long failed to deliver — a kind of mythical reality of computational servitude. For decades we have pursued a Jetsons-like futurama permeated by intelligent agents ready and willing to do our bidding, where all we have to do is say the word.

A convergence of factors, only coming to fruition in the past few years, has started to bring this once-mythical reality within our grasp. Consider the following:

First, the proliferation of mobile phones means that virtually everyone now has access to a computational device equipped with a speaker and a microphone. Not only does this enable speech-based input and interaction, it has also allowed companies like Microsoft and Google to collect massive amounts of speech training data over the past decade, data it has used to drastically improve speech recognition technology.

Second, the rise of &ldquo;cloud computing&rdquo; means that we not only have the processing power with which to handle speech recognition off-device, but we also have the centralization in which to take advantage of machine learning at massive scale. Systems are no longer isolated. Siri learns from interactions with the millions of people using the service, and what she learns is soon made available to everyone, almost instantaneously.

Third, the massive roll-out of mobile broadband means that more people than ever before have access to these services at rapid speed. This has rendered it possible to send speech data to &ldquo;the cloud&rdquo; for processing and have data return to the device with nary a pause (most of the time).

## Impact on Design

Researchers have been thinking about conversational UIs for decades. As such, this isn’t particularly new territory. But practically, it&rsquo;s only in the past two years or so that conversational UIs have reached commercial viability on large scale.

This has certain implications for design. We are going to require tools and methodologies and patterns with which to design these things. What do we mean when we say “conversation?” For instance, is a conversation limited to language and text only? And, how do you design a system to *elegantly* converse with a human being?

[This article on conversational alignment](http://www.dubberly.com/articles/conversational-alignment.html) from Dubberly offers a great place to start. And so does [this one](http://www.dubberly.com/articles/what-is-conversation.html). We will certainly need deep insight on the dynamics of human-human conversations. But we will have to go deeper.

### Mixed Initiative Interaction

Conversational UIs fall into a subclass of interactive experiences often dubbed [mixed initiative interactions](http://www.cs.utep.edu/novick/papers/mi.aaai.html). Eric Horvitz of Microsoft Research describes them [as follows](ftp://ftp.research.microsoft.com/pub/ejh/mixedin.pdf):

>  … methods that explicitly support an efficient, natural interleaving of contributions by users and automated services aimed at converging on solutions to problems.

Broad, yes. The thing to note is that a conversation is simply a *type* of mixed initiative interaction. Much of the work on mixed initiative interaction thus applies here, and any designer interested in the domain might do well to read up on it. For instance, [this paper](http://www.eecs.tufts.edu/~mpoor01/DiscertationStuff/Tangible%20-%20VR%20-%20Interface%20Styles/mixed-initiative-ieee.pdf)
 poses many interesting questions about conversational UI:

* How do we deal with the varying levels of complexity (like sub-conversations) inherent in these types of systems?
* How do we recognize whose turn it is? When, and how, should the computer potentially interrupt the user?
* How do we accurately recognize intent from potentially ambiguous input?
* How do we avoid ambiguity?
* How do we deal with uncertain, or incomplete, understanding of the user's intent?

And perhaps most interesting, as [poised by Matt Webb](http://interconnected.org/home/2015/06/16/conversational_uis) is the problem of discoverability of what the system can even do:

> … how does a user have a [theory of mind](https://en.wikipedia.org/wiki/Theory_of_mind) about a bot &mdash; a conception of its stance, intentions, domain of knowledge, etc. &mdash; and how is that communicated[?]

This is where things get even more interesting.

### The Problem with Anthropomorphism

One big challenge facing designers of CUIs, and thus intelligent agents as a whole, is the one of [anthropomorphism](https://en.wikipedia.org/wiki/Anthropomorphism). That is, how much anthropomorphism do we want to encourage (or discourage) when interacting with these conversational agents?

Here be dragons.

The topic of anthropomorphism as it relates to intelligent agents has seen more than its fair share of debate. It likely all began around the 1970s when [Joseph Weizenbaum](http://en.wikipedia.org/wiki/Joseph_Weizenbaum) coined the term [ELIZA effect](https://en.wikipedia.org/wiki/ELIZA_effect) after observing anthropomorphic tendencies in users of his famed ELIZA chatbot. But it has since come a long way from there.

Back in graduate school, I wrote [a paper](https://sean.voisen.org/assets/voisen_empathic_agents_120909.pdf) in which I outlined several of the theories behind agent anthropomorphism and came out on the side *against* designing an agent such that it would look and act excessively human. Jeffrey Morgan also [offers an extensive overview](http://usabilityetc.com/articles/anthropomorphism-on-trial/) of the history of debate on anthropomorphism of intelligent agents.

The topic is simply too broad here to cover in much detail. But, the arguments can be roughly summarized as follows:

* Those against encourage anthropomorphism argue that its excessive use can lead users to wrongly attribute human-like attributes and human-like predictability to systems that simply do not operate as such. It can delude the user into projecting a more sophisticated theory of mind on the agent than it actually has. This has both practical and ethical ramifications. Practically, the usability of the agent suffers when the user suddenly realizes that the agent is far less sophisticated than its appearance and behavior intimates. And ethically, when users project more intelligence to a system than it actually has, they may come to trust it beyond reasonable boundaries. Depending on the domain in which the agent operates (healthcare, for instance) this could have disastrous consequences.

* Proponents for anthropomorphism argue that the phenomenon operates more metaphorically than literally. [As cited by Morgan](http://usabilityetc.com/articles/anthropomorphism-on-trial/) Brenda Laurel writes:
  > … when we anthropomorphise a machine or an animal we do not impute human personality in all its subtle complexity; we paint with broad strokes, thinking only of those traits that are useful to us in the particular context.
  The argument here is that anthropomorphism is not as dangerous as its detractors make it sound. Humans are not so easily deluded, and anthropomorphism offers a strong foothold of familiarity that makes it easier for users to understand and use a system.
  
There are some additional considerations to keep in mind. For instance, there&rsquo;s the issue of cultural appropriateness. In Japan &mdash; [uncanny valley](https://en.wikipedia.org/wiki/Uncanny_valley) be damned &mdash; the anthropomorphism of robots and other intelligent agents [is largely expected and encouraged](http://www.mitpressjournals.org/doi/abs/10.1162/LEON_a_00936). In Western cultures, probably not so much. Skeuomorphic interfaces have already largely fallen out of favor, and one could argue that a very human-looking agent is simply another type of skeuomorphism. The idea than an agent embody its own &ldquo;agent-ness&rdquo; &mdash; as opposed to emulating human behavior in every possible way &mdash; feels infinitely more appealing.
  
## Opportunities

Creating tools for the design and prototyping of conversational UI is akin to the task of creating the tools we also desperately need for designing responsive UI. That is, UI design is becoming &mdash; more and more &mdash; an art of creating contextually-responsive systems of rules and behaviors as opposed to static responses to pre-defined flows.

Designing rules and understanding how they will function in all their myriad contextual permutations is *very hard.* The only time-worn and effective method we have for such endeavors is programming (both textual and graphical or node-based). And we know how fraught with error this method has proven to be.

Still herein lies much opportunity. If we get it right, conversing with our machines can be both pleasant, useful and, most importantly, *different* from conversing with other humans. A new type of interaction that feels both natural, familiar and new.

> Men are all alike.<br />
IN WHAT WAY<br />
They&rsquo;re always bugging us about something or other.<br />
CAN YOU THINK OF A SPECIFIC EXAMPLE<br />
Well, my boyfriend made me come here.<br />
YOUR BOYFRIEND MADE YOU COME HERE<br />
He says I'm depressed much of the time.<br />
I AM SORRY TO HEAR YOU ARE DEPRESSED<br />
It&rsquo;s true. I am unhappy.<br />
DO YOU THINK COMING HERE WILL HELP YOU NOT TO BE UNHAPPY<br />
I need some help, that much seems certain.

&mdash; *a conversation with ELIZA, from Joseph Weizenbaum&rsquo;s &ldquo;Computer Power and Human Reason&rdquo;*

