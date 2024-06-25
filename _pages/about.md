---
title: About
description: A little about Sean Voisen.
hide_subscribe: true
---

<picture>
<source type="image/webp" srcset="{{ site.url }}/assets/images/sean_voisen_wide@480.webp 480w, {{ site.url }}/assets/images/sean_voisen_wide@960.webp 960w, {{ site.url }}/assets/images/sean_voisen_wide@1920.webp 1920w">
<img src="/assets/images/sean_voisen_wide@960.jpg" style="aspect-ratio: 16/9" alt="A photo of the author.">
</picture>

**Hello!** I’m *Sean*. 

My professional mission is to *make computing better for human creativity*. I'm deeply interested in, and often write about, issues related to creative tools, tools for thought, the open web, designer-developer workflows, human-computer interaction, and anything related to making computing more inclusive, empowering, creative and convivial.

---

Currently, I'm the Director of Design Engineering at [Adobe](https://adobe.com), where I have the privilege of leading teams of design engineers who prototype new product experiences and build Adobe's design system, [Spectrum](https://spectrum.adobe.com). 

In the past I have:

* Built real-time collaboration and accessibility features for [Adobe Express](https://express.adobe.com)
* Managed layout and accessibility engineering teams working on [Firefox](https://mozilla.org)
* Built web-based tools for making animated VR and AR comics at [Madefire](https://techcrunch.com/2022/04/29/madefire-shuts-down/)
* Led prototype engineering inside [Adobe’s Design Studio](https://adobe.design)
* Developed chat and instant messaging applications at [AOL Userplane](https://en.wikipedia.org/wiki/Userplane)

I’m originally from California, and live with my wife and kids in the San Francisco bay area. I studied computer science at [UCLA](https://www.ucla.edu) and at the (radically interdisciplinary and sadly now shuttered) [Arts Computation Engineering](https://www.ics.uci.edu/grad/degrees/degree_ace.php) program at [UC Irvine](https://www.uci.edu).

<hr>

Here are a few links to explore on this site:

* [Writing]({{site.url}}/writing): My blog post archives.
* [Reading]({{site.url}}/reading): Some of my favorite books and papers.

<hr>

If anything I write resonates with you, please feel free to <a href="#" class="eml-protected">send me a note</a>. You can also <a href="{{ site.url }}/subscribe">subscribe</a> for regular updates or <a href="https://front-end.social/@svoisen">find me on Mastodon</a>.

Needless to say, *views and opinions expressed on this site are purely my own and not representative of my employer.*

<aside class="footnote">
<h3>Colophon</h3>

This site is built using <a href="https://jekyllrb.com/">Jekyll</a> and deployed on <a href="https://www.netlify.com">Netlify</a>. Minimalist site design inspired by <a href="https://stephango.com/">Steph Ango</a> and <a href="https://macwright.com">Tom MacWright</a>.
</aside>

<script>
    function decode(encodedString) {
        var email = ''; 
        var keyInHex = encodedString.substr(0, 2);
        var key = parseInt(keyInHex, 16);
        for (var n = 2; n < encodedString.length; n += 2) {
            var charInHex = encodedString.substr(n, 2)
            var char = parseInt(charInHex, 16);
            var output = char ^ key;
            email += String.fromCharCode(output);
        }

        return email;
    }

    window.addEventListener('DOMContentLoaded', function() {
        const allElements = document.getElementsByClassName('eml-protected');
        const eml = decode('582b3d3936182e37312b3d3676372a3f');
        for (let i = 0; i < allElements.length; i++) {
            allElements[i].href = 'mailto:' + eml;
        }
    });
</script>

