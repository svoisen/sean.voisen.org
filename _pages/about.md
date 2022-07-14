---
layout: page
title: About
---

<img src="/assets/images/svoisen_dither.png" width="128" height="128" alt="A photo of the author." class="profile">

**Hello!** I'm Sean. I'm a software engineer with an interest in _making computing better for creative thinking and expression._

Currently, I'm helping build new web-based creative tools at <a href="https://adobe.com">Adobe</a>. In the past, I managed engineering teams while working on Firefox at <a href="https://mozilla.org">Mozilla</a>, built web-based tools for making animated VR comics at <a href="https://techcrunch.com/2021/04/29/madefire-shuts-down/">Madefire</a>, and led prototype engineering in Adobe's <a href="https://adobe.design">Design Studio</a>. I also spent a few years designing and facilitating leadership workshops as a management consultant.

I’m originally from California, and live with my wife and kids in the San Francisco bay area. I have a B.S. in computer science from <a href="https://www.ucla.edu">UCLA</a> and an M.S. in information and computer science from the Arts Computation Engineering program at [UC Irvine](https://www.uci.edu).

<hr>

On this site I share insights and learnings from my research and reading related to software design, development, and leadership. The following questions guide much of my research:

* <em>How do we build better tools for augmenting human intelligence and creativity,</em> both at individual and organizational scales? What are the design principles for these tools? What characteristics do they need to have?
* How can we use software to better understand, reason about, and design solutions for <em>complex problems?</em>
* How do we make <em>better decisions about what technology we allow into our lives?</em> How do we make better decisions about what computing tools we should build? What values should these tools promote? To what types of problems should software be applied? To what types of problems should software <em>not</em> be applied?

If anything I write resonates with you, please feel free to <a href="#" class="eml-protected">send me a note</a> or <a href="https://twitter.com/svoisen" title="My Twitter profile.">find me on Twitter</a>.

<aside class="footnote">
<h2>Colophon</h2>

This site is set in <a href="https://fonts.google.com/specimen/Newsreader">Newsreader</a> and <a href="https://rsms.me/inter/">Inter</a>, built using <a href="https://jekyllrb.com/">Jekyll</a>, and deployed on <a href="https://www.netlify.com">Netlify</a>. Minimalist design inspired by <a href="https://paco.me">Paco Coursey</a>.
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