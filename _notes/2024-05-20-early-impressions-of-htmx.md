---
title: Some early impressions of HTMX
description: Some early impressions of HTMX
custom_css: notes
---

I'm bullish on HTML-first, JavaScript-light frameworks and libraries gaining more developer mindshare over the coming years. We're seeing more and more developers starting to realize that maybe JavaScript-heavy SPAs are *not the best way* to build many applications.

There are two HTML-first frameworks I'm particularly excited about and have been using in personal projects: [Enhance](http://enhance.dev) and [HTMX](https://htmx.org/). This note is about my early experiences with HTMX, a [hypermedia-based approach](https://hypermedia.systems/) to application architecture. (Hypothetically, you could use Enhance and HTMX together, but I haven't tried that.) Take all this with a grain of salt, I've only been using it a few weeks.

A few nice things about HTMX:
- It's just markup! You write HTML, sprinkle in a few special attributes on any element, and you get a large portion of the AJAX-based dynamic behavior you get in a JavaScript-heavy SPA without all the JavaScript. It's easy, simple, and feels kind of magical the first time you use it.
- The API is pretty damn simple and uniform—just use HTML attributes for specifying nearly all behavior. (You can also use custom response headers on the server side to invoke client-side behavior from the server when you need it.)
- Server-side rendering is the default. Your server needs to respond to HTTP requests with HTML rather than JSON. Admittedly, this is probably better for newer projects that don't have pre-existing JSON APIs. (Though there are extensions to HTMX that allow you to use client-side rendering if you must use JSON). But for me, this way of working feels natural anyway, and harkens back to the days of 2007-2010 or so, when I was writing a lot of Ruby on Rails.

A few challenges I encountered:
- How you handle pure client-side behavior is left as an exercise to the reader. For instance, how do you handle animated modal dialogs and overlays? A server-side rendered modal can be injected on-demand, but there remains a need for client-side scripting to handle transitions, canceling, hiding or removing the dialog, etc. HTMX supports the new [ViewTransition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API), but alas, Firefox does not. Additionally, there are myriad ways of handling pure client-side behavior, some more compatible than others to the HTMX style and ethos. [Alpine.js](https://alpinejs.dev/) perhaps, or maybe [Cami.js](https://github.com/kennyfrc/cami.js)? Both are lightweight libraries that do *just enough*. Personally, I've landed on client-side enhanced web components (really just custom elements that are defined in JavaScript but are server-side rendered), and that has been working pretty well so far.
- Sometimes you do want *some* client-side state, and pure HATEOS feels limiting. For example, handling client-side state based on the current route is not-so-straightforward. If a user clicks a navigation bar, you may wish to both highlight the current location on the navigation bar and re-render section of the page to show the application contents corresponding to that location. In an SPA framework, a client-side router would allow reactive rendering behavior based on the current route. Unfortunately, browsers don't make it easy to observe URL location changes despite the existence of the History API (the newer [Navigation API](https://developer.mozilla.org/en-US/docs/Web/API/Navigation_API) may solve this problem). One solution has been to rely on HTMX events like `htmx:afterSettle` as triggers to check for location changes and handle accordingly.

I'm sure I'm doing some things "wrong." That's OK—it's been fun to just dig in and try.
