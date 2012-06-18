---
layout: project
title: Invaders Generator
---

<script type="text/javascript" src="js/Three.js"></script>
<script type="text/javascript" src="js/Invaders.js"></script>

A translation to WebGL of a sketch I originally made using Papervision3D and ActionScript, the Invaders Generator mimics an algorithm first demonstrated by Jared Tarbell as part of his [Invader Fractal](http://www.complexification.net/gallery/machines/invaderfractal/). The algorithm randomly generates &ldquo;space invader&rdquo;-like shapes by filling a 5x5 grid in a vertically symmetric fashion.

<div id="sketch" class="sketch framed" style="margin-bottom:1em;"></div>

<script type="text/javascript">
  startInvaders(document.getElementById("sketch"));
</script>

**Instructions:** Hit your space bar and watch the invaders explode!

[View source on Github.](https://github.com/svoisen/webgl_sketches/tree/master/invaders)
