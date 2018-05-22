---
layout: post
title: Re-creating the "breathing" LED
---

Perhaps it&rsquo;s not surprising, but Apple has [a patent](http://patft.uspto.gov/netacgi/nph-Parser?Sect1=PTO1&Sect2=HITOFF&d=PALL&p=1&u=%2Fnetahtml%2FPTO%2Fsrchnum.htm&r=1&f=G&l=50&s1=6658577.PN.&OS=PN/6658577&RS=PN/6658577) on the iconic "breathing" pattern used for the sleep indicator LED on all their computers.

Recently &mdash; for a personal project &mdash; I wanted to see if I could replicate this effect. It turns out that I wasn&rsquo;t alone. Ladyada tried to [reverse engineer](http://www.adafruit.com/blog/2010/08/26/reverse-engineering-the-mac-breathing-led-2/) the pattern a few years ago. Unfortunately, she stopped short of providing anything &mdash; like code &mdash; that the lazy web surfing Arduino hacker might use to recreate the effect. That&rsquo;s the purpose of this short tutorial.

Digging Into the Math
---------------------

The Apple patent claims that the breathing pattern is a simple sinusoid, but observation of one&rsquo;s own (heavy) breathing will show that the pattern is a little more complicated than that. Maybe a sine wave works for Apple, but it doesn&rsquo;t look quite right to me. In my own breathing, I tend to ease in to a fast inhale, and stop suddenly before easing out to a fast exhale. Also, the period between inhalation and exhalation happens to be shorter than the period between exhalation and the next inhalation. This is not a simple sinusoid, as the [oscilloscope plot](http://static.flickr.com/62/212611654_4b3106a50b.jpg) from Ladyada&rsquo;s own investigations will attest.

A commenter on Ladyada&rsquo;s blog suggested that the pattern is probably more accurately modeled by f(x) = e<sup>sin(x)</sup>. Plotting this equation gives the following:

<img src="http://sean.voisen.org/images/breathing_pattern_1.gif" alt="Plot of exp(sin(x))" class="framed" />

Compare the curvature characteristics of this plot with the simple sinusoid below:

<img src="http://sean.voisen.org/images/sinusoid.gif" alt="Plot of sin(x)" class="framed" />

The plot of f(x) = e<sup>sin(x)</sup> has wider "troughs" (periods between inhale and exhale) and narrower "peaks" (periods between exhale and inhale), more accurately matching natural breathing patterns. As a simple experiment, try breathing "sinusoidally" and you&rsquo;ll see how unnatural it feels.

Turning it Into Code
--------------------

For my own experimentation, I used the ubiquitous Arduino. The Arduino supports analog output using pulse-width modulation (PWM) mapped to integer values from 0 to 255. To recreate the breathing LED, this means manipulating the original equation f(x) = e<sup>sin(x)</sup> such that the amplitude fits within the PWM range.

I took enough math in school to know that the minima and maxima of any equation occur at critical points in the equation, where the derivative of that equation is either 0 or its not differentiable. Beyond that, I left it to [Wolfram Alpha](http://www.wolframalpha.com) to do the hard work. It turns out that the minimum of the wave occurs at 1 - e, and the maximum at e - 1/e. Using this information to adjust the amplitude of the equation such that it fits within the 0 to 255 range gives the following:

<img src="http://sean.voisen.org/images/breathing_equation.gif" alt="The final equation" />

Swap *x* for the number of seconds that have elapsed, and map the above equation to PWM output on any supported Arduino pin, and you have the beginnings of a breathing pattern. The problem is that the frequency may be too high or low (depending on your preference), and so the breathing will appear fast or slow. Easy enough: Multiply *x* by any value to adjust the frequency. I like &pi;/2.

Finally, 1 - e, and 255/(e - 1/e) are constants, and can be pre-calcuated to reduce overhead. The final Arduino sketch is as follows (with the LED connected to pin 11, a suitable resistor in series, yadda, yadda &hellip;):

<div>
{%highlight c%}
#include <math.h>

void setup()
{
  pinMode(11, OUTPUT);
}

void loop()
{
  float val = (exp(sin(millis()/2000.0*PI)) - 0.36787944)*108.0;
  analogWrite(11, val);
}
{%endhighlight%}
</div>

Gratuitous Video
----------------

And, in case you don&rsquo;t have an Arduino handy, here&rsquo;s a short video of the final effect:

<div class="video">
<iframe src="http://player.vimeo.com/video/31449253?title=0&amp;byline=0&amp;portrait=0&amp;color=cc0000" frameborder="0" webkitAllowFullScreen allowFullScreen></iframe>
</div>

Conclusion
----------

You might be asking: Is it really that big of a difference? Wouldn&rsquo;t a simple sinusoid suffice? To answer the latter question: yes. To answer the former: the difference is noticeable, but only slightly. Steve Jobs was a notorious perfectionist. I like to think that he would&rsquo;ve cared about such things. 
