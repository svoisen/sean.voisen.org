---
layout: page_grid
title: About
description: A little about Sean Voisen.
hide_description: true
---

**Hello!** I’m *Sean*. 

{% include picture.html class="wide" filename="sean_voisen_wide" caption="" aspect_ratio="" %}

My professional mission is to *make computing better for human creativity*. I'm a software developer who is deeply interested in creative tools, tools for thought, the open web, human-computer interaction, low-tech and sustainable solutions, and anything else related to making computing more inclusive, empowering, and [convivial](https://archive.org/details/illich-conviviality).

Currently, I lead teams of front-end and design engineers building new user experiences for web, mobile and desktop.

I’m originally from California, and live with my wife and kids in the San Francisco bay area. I studied computer science at [UCLA](https://www.ucla.edu) and at the (radically interdisciplinary and sadly now shuttered) Arts Computation Engineering program at [UC Irvine](https://www.uci.edu).

---

If anything I write resonates with you, please feel free to <a href="#" class="eml-protected">send me a note</a>. You can also <a href="{{ site.url }}/subscribe">subscribe</a> for regular updates or [find me on Mastodon](https://front-end.social/@svoisen).

*Views and opinions expressed on this site are purely my own and not representative of my employer.*

<aside class="footnote">
<h3>Colophon</h3>

This site is built using <a href="https://jekyllrb.com/">Jekyll</a> and deployed on <a href="https://www.netlify.com">Netlify</a>. Text is set in <a href="https://fonts.google.com/specimen/Alegreya">Alegraya</a> and <a href="https://fonts.google.com/specimen/Alegreya+Sans">Alegraya Sans</a>.
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
