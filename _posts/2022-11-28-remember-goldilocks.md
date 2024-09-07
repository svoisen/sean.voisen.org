---
title: When software tools get too big, remember Goldilocks
description: If we want more convivial software tools, let's disincentivize them from getting too big for their own good.
category: blog
image:
    path: /assets/images/mountain_cabin_george_luks_1928@1200x630.jpg
    width: 1200
    height: 630
---

{% include picture.html filename="mountain_cabin_george_luks_1928" aspect_ratio="1.21" caption="Mountain cabin by George Luks (1928)." %}

The “Goldilocks model” offers a lens for examining how the benefits of a technology balance against the harms that same technology may also cause if it is left unchecked. Like the folktale from which the name derives, it’s about finding _just the right_ amount of a technology to apply to a given situation. Too little and the technology may be ineffectual. Too much and there’s risk of exacerbating the problem one was trying to solve. 

I’m mostly interested in software, where bloat (features, size, complexity, centralization) is forever problematic (i.e. “Papa Bear” problems), but first a brief digression into medicine. 

---

In [Tools for Conviviality](https://en.wikipedia.org/wiki/Tools_for_Conviviality), Ivan Illich writes:

> The year 1913 marks a watershed in the history of modern medicine. Around that year a patient began to have more than a fifty-fifty chance that a graduate of a medical school would provide him with a specifically effective treatment.

I don’t know his exact sources—the year 1913 sounds a perhaps too “on-the-nose” for me—but the level of precision here is irrelevant for our purposes. Whenever it was exactly, this watershed moment marks the threshold in which the practice of modern medicine transitions from marginally useful or even occasionally harmful to having a significant and increasingly positive impact on humans. Much of this was due, unsurprisingly, to a confluence of scientific advances:

> Germ-free water reduced infant mortality related to diarrhea, aspirin reduced the pain of rheumatism, and malaria could easily be controlled by quinine … People begin to understand the relationship between health and a balanced diet, fresh air, calisthenics, pure water and soap.

It’s worth noting that around this time, medicine was still not fully professionalized. People could take advantage of this scientific knowledge and these medical technologies without engaging with a medical institution. They could act with autonomy without complete dependence on doctors or hospitals.

But, Illich argues, there is a problem. In the succeeding decades, the practice of modern medicine continues on its rapid growth trajectory, becoming an institution, a bona-fide profession increasingly exclusive to all but a few trained medical elite. This institutionalization of medicine marks a second watershed, around 1955, when “the marginal utility of further professionalization declined” and the practice of institutionalized medicine began to cause societal harm. People became increasingly reliant on institutions for their care and often at great financial expense, institutions that are incentivized by capitalism not to prevent or cure disease, but to simply _treat_ it instead. 

Ironically, this crossing of the second threshold is not perceived by society as harmful but rather as beneficial, because the institutions of medicine have by this time amassed enough status and clout to define their own metrics for success. Big medicine is seen as a good thing, despite its cost or decreasing marginal utility.

It’s at this point that medicine leaves the Goldilocks zone and becomes—as Illich would claim—too big for its own good. It’s practices no longer accessible to the average person, no longer empowering or encouraging of autonomy, no longer increasingly beneficial, no longer _convivial_.

---

It might help here to give a very abbreviated primer on conviviality in the Illich-ian sense. According to Illich, _convivial_ tools are those tools which *afford their users the greatest autonomy and empowerment with minimal to no dependence on industry or elites.* From "Tools for Conviviality":

> Tools are intrinsic to social relationships. An individual relates himself in action to his society through the use of tools that he actively masters, or by which he is passively acted upon. To the degree that he masters his tools, he can invest the world with his meaning; to the degree that he is mastered by his tools, the shape of the tool determines his own self-image. Convivial tools are those which give each person who uses them the greatest opportunity to enrich the environment with the fruits of his or her vision.

---

What does this all have to do with software?

As [Musk continues to dismantle Twitter](https://www.newyorker.com/news/daily-comment/why-i-quit-elon-musks-twitter), fracturing a system many relied upon as a kind of virtual public commons, I found myself pondering the sheer size of this critical technical infrastructure compared to its upstart, decentralized competitor: [Mastodon](https://joinmastodon.org). Where do these two sit on the Goldilocks spectrum of conviviality?

Mastodon is clearly the more convivial tool. It is small. It is open source and standards-based. People with even moderate technical ability can setup and run their own Mastodon instance within minutes or hours. It offers some opportunity for [credible exit](https://subconscious.substack.com/p/credible-exit).

Twitter is not convivial. It is big, centralized, industrial. And its dismantling is already causing visible harm through ongoing failures of moderation.

I suspect that the metrics we use to measure software project success often draw us beyond the second threshold and out of the Goldilocks zone. We have a tendency to build systems that are big, complex, and challenging to maintain without a large, dedicated staff of software professionals to keep them running. As an industry, we are incentivized to do so. Financial rewards tend to gravitate towards the stewards of the biggest, most complicated, centralized systems—systems that operate at massive scale, but often at great cost. The venture capital system ensures that this is so.

But this tendency towards largeness is true even in open source, where the projects with the biggest communities and greatest code churn are most prone to "corporate capture." As Stephen Kell writes in [Convivial Design Heuristics for Software Systems](https://www.researchgate.net/publication/343435014_Convivial_design_heuristics_for_software_systems):

> … perhaps we should start to recognise software projects not only on their quality or completeness, but on their tractability to individual contributors and customisers. This tractability is likely to be correlated inversely with the rate of code churn and size of community—two metrics commonly associated, sometimes perversely, with the health of a project.

I like this notion of tractability as a metric. Kell, of course, is referring to the tractability of the code itself, but could we broaden this definition to include the system as a whole? 

Tractability implies malleability and controllability—systems that are understandable and easier-to-maintain. Small systems are de facto more malleable, convivial, _tractable_. Let's incentivize that! Let's focus on recognizing when the marginal utility of continuing to grow a software system or application is causing more harm than good. Let's stay in the Goldilocks zone.
