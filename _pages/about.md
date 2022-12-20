---
layout: page
title: About
---

<img src="/assets/images/svoisen_dither.png" width="128" height="128" alt="A photo of the author." class="profile-image">

**Hello!** I’m Sean. I’m a software engineering leader with an interest in _making computing better for creative thinking and expression._

Currently, I'm Director of Design Engineering at <a href="https://adobe.com">Adobe</a>. In the past, I worked as an engineer on <a href="https://express.adobe.com">Adobe Express</a>, managed layout and accessibility engineering teams working on <a href="https://mozilla.org">Firefox</a>, built web-based tools for making animated VR and AR comics at <a href="https://techcrunch.com/2022/04/29/madefire-shuts-down/">Madefire</a>, and led prototype engineering in Adobe’s <a href="https://adobe.design">Design Studio</a>. 

I’m originally from California, and live with my wife and kids in the San Francisco bay area. I studied computer science at <a href="https://www.ucla.edu">UCLA</a> and at the (radically interdisciplinary and sadly now shuttered) [Arts Computation Engineering](https://www.ics.uci.edu/grad/degrees/degree_ace.php) program at [UC Irvine](https://www.uci.edu).

<hr>

On this site I share insights from my research and reading related to software design and development. These questions help guide my explorations:

* <em>How do we build better tools for augmenting human creativity</em>? What are the design principles for these tools?
* How might we <em>build open-ended, convivial platforms</em> for end-users to build their own creative tools?
* How can we use software to better understand, reason about, and design solutions for <em>complex problems?</em>
* How do we make <em>better decisions about what technology we allow into our lives?</em> How do we make better decisions about what computing tools we should build? What values should these tools promote? To what types of problems should software be applied? To what types of problems should software <em>not</em> be applied?

If anything I write resonates with you, please feel free to <a href="#" class="eml-protected">send me a note</a> or <a href="https://front-end.social/@svoisen" title="My Mastodon profile.">find me on Mastodon</a>.

Needless to say, views and opinions expressed on this site are purely my own and not representative of my employer.

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

