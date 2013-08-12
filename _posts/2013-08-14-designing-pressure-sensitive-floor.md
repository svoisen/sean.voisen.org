---
layout: post
title: Designing a pressure-sensitive floor
---

<img src="/images/ccm_activefloor2.jpg" width="620" alt="Photo 1" class="framed" />

An empty room, a cushy budget, and our imaginations: These were the only three things our small team at [Adobe](http://www.adobe.com) started out with when – about a year ago – we were asked to build “something new” for the [Children’s Creativity Museum](http://creativity.org) in San Francisco. 

Several months, and much soldering, coding, hammering, welding, sawing and head-scratching later, our new exhibit – a digital/physical environment for kids called “Sense It” – [is now up and running](http://www.behance.net/gallery/Childrens-Creativity-Museum/9482331). With a 14'x8' touch-enabled LED wall and a 14'x12' pressure-sensitive floor, _Sense It_ is a place for kids to run, jump, play and create in a world of “extra large” digital experiences.

<img src="/images/ccm_activefloor1.jpg" width="620" alt="Photo 2" class="framed" />

As part this project, I was tasked with designing and building the pressure-sensitive electronic floor. I call it the ActiveFloor. At 168 square feet with one pressure sensor per square foot, it is by far the largest electronics project I have worked on to date. The following is a detailed description of its design and function, as well as ideas for improvements in future iterations.

## Overview

The goal behind the design of the ActiveFloor was simple: create a new type of digital input device that could sense and track multiple children running or jumping in the exhibit, thereby allowing games running on the accompanying LED wall to respond appropriately. 

We decided to use a pressure-sensitive floor in lieu of other tracking technologies because of its (perceived) robustness and simplicity. Competing technologies like vision-tracking are computationally complex and often prone to failure when faced with multiple objects (or people) to track. Additionally, 3D cameras would not have provided us with accurate information related to jumping force or weight, both metrics we hoped to use in our exhibit’s programs and games. And of course, building a pressure-sensitive floor also just seemed like a fun challenge. 

<img src="/images/ccm_activefloor8.jpg" width="620" alt="Installation" class="framed" />

To get the type of information we wanted – force, force dispersion, and force position – we knew that we would need a relatively dense grid of sensors. The challenge, as always is the case in any hardware engineering project, was balancing needs and desires with budget. In the end, to simplify construction, we decided to go with an even grid of sensors at 1 per square foot. This turned out to be just about right for our needs, if even a bit too dense.

## Layout and Modularity

The floor consists of twenty-one 2'x4' modular tiles in 3 rows of 7. Each tile contains 8 pressure-sensitive resistors and accompanying electronics. The tiles exist as slave devices on a very long I2C bus connected by Cat5 ethernet cable and controlled by a single master controller (a [Beaglebone](http://beagleboard.org/) in our case).

<img src="/images/ccm_activefloor3.jpg" width="620" alt="Photo 3" class="framed" />

Keeping the floor tiles small made for easy assembly, trouble-shooting and transport to the museum. It also means less hardware to replace in the future should a tile fail or become damaged (kids will always manage to find ways to break things).

<img src="/images/ccm_activefloor4.jpg" width="620" alt="Photo 4" class="framed" />

The tiles themselves are designed as a kind of sandwich. The bottom layer of MDF houses the pressure-sensitive resistors, wiring, and electronics. A series of heavy-duty felt pads that protect the sensors are sandwiched between the MDF and the next layer, a 1/2" piece of chip-board that disperses weight across the assembly. And on top of that lies a layer of protective plastic sheeting followed by 5/8" of soft closed-cell EVA foam. In all, the tile assembly is fairly robust, kid-friendly, and easy to disassemble for maintenance.

## Tile Electronics

The most challenging part of this project was designing and building the circuit to read and relay the data from the pressure sensors. After a bit of testing and comparison with the rest of the Tekscan FlexiForce line, I decided to use the [Tekscan A401 FlexiForce](http://www.tekscan.com/a401-force-sensor-released) pressure-sensitive resistor. The main reasons for this were the sensor’s thin profile and large (1") sensing area, but it’s possible that there were other cheaper, equally-suited alternatives. (Research time was somewhat limited.)

The resistance of a pressure-sensitive resistor is inversely proportional to the force being applied. That is, pressure-sensitive resistors work by decreasing resistance as force is applied across their surface, usually through the compression of some piezoresistive conductive polymer. Unfortunately, the response curve of this decreasing resistance – including that of the A401 – is not linear. See the sample chart below ([source](http://at.or.at/hans/misc/itp/pcomp/fsr.html)):

<img src="/images/force_resistor_1.gif" width="620" alt="Force-sensitive resistor chart" class="framed" />

To compound the challenge, the default force range of the A401 is a mere 0-25 lbs. The average five-year-old may not weigh much, but it’s certainly more than 25 lbs. And we did want our floor to work for (much heavier) parents and kids alike. 

Both the non-linear response curve and default force range of the A401 meant that supporting circuitry would be required to get the measurements we wanted. The circuit I ended up using for linearization and force range adjustment of the A401 is sketched out below:

<img src="/images/ccm_activefloor5.png" width="620" alt="Circuit" class="framed" />

The voltage divider of R1 and R2 sets the baseline or “offset” voltage level of the output on the op-amp, while R3 sets the gain or “sensitivity.” R4 is the pressure-sensitive resistor itself. 

This circuit worked, but did seem prone to noise. If I were more experienced in analog circuit design (I really only know enough about op-amps to be mildly dangerous), I may have come up with something more refined. Nevertheless, this suited our purposes and I managed to smooth out much of the noise in software (described further below).

## Microcontrollers and Analog-to-Digital Conversion

After prototyping the above-mentioned circuit on a breadboard, the next step was determining how to read the resistors and send all of the data to software for processing. Initial explorations looked at external, dedicated analog-to-digital converter chips for low noise and high resolution. They were fun to play with, but proved to be expensive, unnecessary and complicated to integrate. Our floor only needed to know if and where a kid was jumping, sitting or walking, not how much he or she weighed down to the nearest ounce. So we really didn‘t require anything beyond the 10-bit resolution already provided by the built-in ADCs of most microcontrollers. 

As such, I decided to use the venerable [ATtiny84](http://www.atmel.com/devices/attiny84.aspx). I was already very familiar with Atmel microcontrollers, and it was cheap, readily available, and had just the right number of pins for the application. Though the ATtiny84 does have 8 single-ended ADC channels, most of these pins ended up being used for other applications. As a result, I used only 1 ADC and added a [74HC4051](http://www.nxp.com/documents/data_sheet/74HC_HCT4051.pdf) multiplexer for selecting sensor input. This worked surprisingly well.

Though sacrilige to some, to simplify development and make use of some handy existing code, I decided to use the [Arduino libraries and bootloader on the ATtiny84](http://hlt.media.mit.edu/?p=1695). This was primarily so I could use the [TinyWire I2C library](https://github.com/rambo/TinyWire), since the ATtiny84 does not have hardware support for I2C. Unfortunately, at the time I started, TinyWire only supported the ATtiny85, so I had to modify it to include support for the 84. (My patch is now in the mainline on GitHub.)

As it was, the software requirements for the sensor reading and transmission was quite minimal, using only 3Kb of the available 8Kb, even with the Arduino code.

Using perf board and through-hole components, I built a couple prototype floor tiles to prove that everything worked before moving on to the next phase.

## PCB Design and Assembly

After I was happy with the performance of the code and prototype, I designed the final PCB in Eagle CAD. [Sparkfun](http://www.sparkfun.com) provides a [handy library of pre-made component footprints](https://github.com/sparkfun/SparkFun-Eagle-Libraries) for Eagle, of which I used quite liberally. I still had to make several custom footprints, namely for my chosen RJ-45 ethernet connector and the ATtiny, but kudos to Sparkfun for releasing this library.

<img src="/images/ccm_activefloor6.jpg" width="620" alt="PCB design" class="framed" />

To reduce some of the noise when reading the ADC, I attempted to separate the analog and digital componentry as much as possible by cordoning off their respective ground planes and connecting them with a few thin traces. (I also unsuccessfully tried to read the ADCs of the ATtinys in ADC-noise-reduction mode, but this seemed to make it impossible to allow the necessary interrupts for I2C communication.)

<img src="/images/ccm_activefloor10.jpg" width="620" alt="PCB assembly" class="framed" />

This project was my first foray into a designing with only surface-mount components, and when it came time to assemble, I was happy I made this decision. With 21 boards to assemble, and no Foxconn at our disposal, surface-mount proved to be substantial time-saver. Using lead-free solder paste, a professionally cut solder stencil, a hot air reflow station, and some steady tweezer precision, I was able to knock out the boards over a couple of Saturdays. Still, to call the work tedious would be generous at best. I did stay with 0805-size resistors and capacitors in an attempt to keep my sanity. For hand-assembly, I don’t think I’d want anything smaller without a microscope and serious patience.

<img src="/images/ccm_activefloor7.jpg" width="620" alt="PCBs soldered" class="framed" />

## The Master Controller

For the floor’s master controller, I decided to use a Beaglebone, even though it was probably overkill as far as processing requirements. The main reason for this was that we wanted to send the floor data over ethernet as UDP so that it could act as a completely decoupled system from the rest of the room. This had the bonus effect of making it very easy to re-route data to other computers for debugging without having to do things like unplug USB cables. We could have used an Arduino with ethernet shield with similar affect, but the Beaglebone seemed like the simpler solution.

I wrote the master controller in C using the Beaglebone’s built-in kernel support for read/write to I2C via file I/O. (It always helps to have a [handy tutorial](http://makingaquadrotor.wordpress.com/2012/07/08/i2c-on-the-beaglebone/).) This code runs as a daemon on startup with optional configuration for parameters like UDP port, IP, number of sensors to poll, I2C slave address range, etc. The daemon continously polls each of the floor tiles sequentially, stores the data, then spits it out as a UDP packet to the receiving computer.

Given some of the baseline noise from the sensors when they are unweighted, the master controller also uses a [Savitsky-Golay convolution filter](http://en.wikipedia.org/wiki/Savitzky%E2%80%93Golay_filter_for_smoothing_and_differentiation) to smooth the data before sending.

## The Bus

Each floor tile was designed with 2 RJ-45 ethernet jacks so that it could be daisy-chained with it’s adjacent neighbors in a single bus on Cat5 ethernet cable. To minimize wiring, the bus itself was designed to use the I2C protocol, requiring only 2 signal lines: one for the clock (SCL) and one for the data (SDA). I knew the tiles would have extremely low power requirements (~10mA), so I decided to power them through the bus as well. All told, this meant using only four of the eight available lines on the ethernet cable: power, ground, SCL and SDA. 

<img src="/images/ccm_activefloor11.jpg" width="620" alt="Beaglebone" class="framed" />

At first, the bus design seemed quite straightforward, but I made a few key mistakes here: First with only four lines needed, I should have used one twisted pair for each of the four signals, thus further minimizing noise and the possibility of shorting (easy to do with a bad ethernet crimp job). Second, I designed my slave boards to run on 5V (8mHz on the ATtiny), while my master controller (the Beaglebone) ran on 3.3V. This meant the additional complexity of an I2C logic-level converter (I used the [PCA9306](http://www.nxp.com/documents/data_sheet/PCA9306.pdf)). Finally, while I knew I would run into issues with I2C bus length, I hoped I could avoid them by tweaking the I2C pull-up resistor values on the bus accordingly (I could not).

The logic-level converter was a non-issue, but the bus length proved to be a significant hurdle. I2C bus lines are open-drain, meaning that in their default state they are pulled high using pull-up resistors, and data is transferred by either the master or slave pulling the lines low. (Only the master controls the clock or SCL line).

Standard I2C bus speed is 100 kbit/s, but speeds up to 3.4 Mbit/s are possible with supporting devices. For our needs, 100 kbit/s was more than adequate. Unfortunately, bus speed is directly affected by bus length. As the length of an I2C bus increases, so does its capacitance, which in turn limits the speed. The reason for this is that the pull-up resistors in addition to the bus capacitance (and stray capacitance on connected devices) have an RC time constant. This RC time constant limits the possible signal rise time on the bus. Under high frequencies, a long rise time may mean that the line may not rise to logical high before being pulled low again, thus incapacitating (no pun intended) the bus.

I2C was designed for inter-chip communication over short distances. Per specifications, the total capacitance of the bus must be under 400pF. The capacitance of Cat5 can be around 50-70pF per foot, thus limiting the bus length to under 7 feet in good conditions. With low-value pull-up resistors, I found I could get about 12 feet of bus length before failure, but knew I would need about 40 feet for the entire floor!

The solution to this problem was the [P82B715 bus extender](http://www.nxp.com/documents/data_sheet/P82B715.pdf). The bus extender splits the bus into buffered and non-buffered sections, decreasing the cable load by a factor of 10, and thus allowing for significantly longer connections. Using three sets of extenders in a radial configuration, I split the bus into three sections, one for each row of seven floor tiles. Like magic, my floor tile bus woes disappeared!

## Conclusion

I couldn’t have built this floor without significant help from a few Adobe contributors who volunteered to spend their weekends tediously routing wood and soldering sensors to wires. Thanks to all involved in helping with design and construction. The smiles of the kids (and adults) who have been able to play in the new exhibit have made all of the work well worth it.

<img src="/images/ccm_activefloor9.jpg" width="620" alt="Playing" class="framed" />
