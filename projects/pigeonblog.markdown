---
layout: project
title: PigeonBlog 2.0
---

PigeonBlog 2.0 is the second iteration of Professor Beatriz da Costa’s [PigeonBlog](http://pigeonblog.mapyourcity.net/) project. As a graduate student researcher, I wrote the firmware and built the hardware for this camera and GPS-enabled bird tracking unit. It was ultimately used by scientists in the field to track the flights and whereabouts of gannets — large seabirds (up to 2 meter wingspan) living off the coast of South Africa.

**Hardware:** The unit consists entirely of off-the-shelf components, including a 3.3V/8MHz Arduino Pro Mini, microSD socket, subminiature GPS unit, COMedia C328R serial camera, and 3.7V lithium-ion battery.

**Software:** As part of this project I developed and released an [open source C++ driver library](http://github.com/svoisen/c328r) for the COMedia C328R camera. The remainder of the code was written using the [Arduino](http://arduino.cc) environment and standard Arduino libraries. The firmware’s behavior is fairly straightforward: Images and GPS coordinates are fetched at regular intervals, then stored on the unit’s microSD card in a proprietary file format. Field researchers can later fetch the data from the device over UART serial using a custom application written in Java.

### Photos

<img src="/images/pigeonblog_1.jpg" alt="Photo 1" class="framed" />
<img src="/images/pigeonblog_2.jpg" alt="Photo 2" class="framed" />
<img src="/images/pigeonblog_3.jpg" alt="Photo 3" class="framed" />
