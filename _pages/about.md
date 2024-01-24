---
title: About
description: A little about Sean Voisen.
---

<picture>
<source type="image/webp" srcset="{{ site.url }}/assets/images/sean_voisen@64.webp 64w, {{ site.url }}/assets/images/sean_voisen@128.webp 128w, {{ site.url }}/assets/images/sean_voisen@256.webp 256w">
<img src="/assets/images/svoisen@128.jpg" alt="A photo of the author." class="profile-image">
</picture>

**Hello!** I’m *Sean*. Currently, I'm Director of Design Engineering at <a href="https://adobe.com">Adobe</a>. In the past, I built real-time collaboration and accessibility features for <a href="https://express.adobe.com">Adobe Express</a>, managed layout and accessibility engineering teams working on <a href="https://mozilla.org">Firefox</a>, built web-based tools for making animated VR and AR comics at <a href="https://techcrunch.com/2022/04/29/madefire-shuts-down/">Madefire</a>, and led prototype engineering in Adobe’s <a href="https://adobe.design">Design Studio</a>. 

I’m originally from California, and live with my wife and kids in the San Francisco bay area. I studied computer science at <a href="https://www.ucla.edu">UCLA</a> and at the (radically interdisciplinary and sadly now shuttered) [Arts Computation Engineering](https://www.ics.uci.edu/grad/degrees/degree_ace.php) program at [UC Irvine](https://www.uci.edu).

<hr>

Here are a few links to explore on this site:

* [Writing]({{site.url}}/writing): My blog post archives.
* [Reading]({{site.url}}/reading): Some of my favorite books and papers.

<hr>

If anything I write resonates with you, please feel free to <a href="#" class="eml-protected">send me a note</a>.

Needless to say, *views and opinions expressed on this site are purely my own and not representative of my employer.*

<aside class="footnote">
<h3>Colophon</h3>

This site is built using <a href="https://jekyllrb.com/">Jekyll</a> and deployed on <a href="https://www.netlify.com">Netlify</a>. Color scheme based on <a href="https://meat.io/oksolar">OK Solar</a>. Minimalist site design inspired by <a href="https://stephango.com/">Steph Ango</a>.
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

