---
layout: project
title: The Uncanny Dream Machine &raquo; Technical Docs
---

[The Uncanny Dream Machine](/projects/uncanny-dream-machine/) consists of two main components: an artifcial intelligence (AI) server running “behind the scenes,” and the machine itself, a customized 1940 Philco radio. The AI server is programmed using the Ruby programming language, and employs the [Princeton University Wordnet database](http://wordnet.princeton.edu/), the [University of South Florida Free Association Norms database](http://web.usf.edu/FreeAssociation/), a database of my own dream transcripts (55 different recorded dreams), and a variety of artifcial intelligence and natural language processing algorithms to weave its sometimes bizarre, sometimes mundane dreamlike creations. Once a dream text has been created, the system uses the [Cepstral](http://www.cepstral.com/) text-to-speech and [LAME MP3](http://lame.sourceforge.net/) encoding software to render the audio output. Finally, the audio is then streamed to the radio over 802.11 wifi, and played back using the mpd music player daemon running on [OpenWrt Linux](http://openwrt.org/) in the radio itself.

<img src="/images/uncanny_dream_photo5.jpg" alt="Photo 1" class="framed" />

### The Radio

The radio is a 1940 Philco radio; I am unsure of the exact model. It was acquired in a non-functioning state from a seller on eBay, so I didn’t feel too bad gutting it. This list of hardware inside the radio consists of the following:

* ASUS WL-520GU wireless router running OpenWrt
* Miscellaneous Dell computer speaker + amplifier from my wife’s old desktop machine
* SYBA USB sound card
* 3 10K potentiometers, filed down to fit the original bakelite knobs
* BlinkM MaxM RGB blaster — a blindingly bright RGB LED unit
* 3.3V 8Mhz Arduino Pro Mini
* DS2003CN darlington array (for controlling RGB LED)
* LM6041 op-amp running single-sided

I am greatly indebted to the [MightyOhm wifi radio tutorial](http://mightyohm.com/blog/2008/10/building-a-wifi-radio-part-1-introduction/) for its aid in creating this project. I followed these instructions almost exclusively, with only a few modifications. Perhaps the most significant modification is the colored light audio visualization. The Uncanny Dream Machine displays channel selections and volume levels via colored light (red for angry dreams, green for nightmares, etc.), using an op-amp to translate the -1V to 1V fluctuating audio signal to a 0 to 3.3V range for the Arduino’s ADC.

<img src="/images/uncanny_dream_photo4.jpg" alt="Photo 2" class="framed" />
<img src="/images/uncanny_dream_photo6.jpg" alt="Photo 3" class="framed" />
<img src="/images/uncanny_dream_photo7.jpg" alt="Photo 4" class="framed" />

### The AI

The artificial intelligence server is a Ruby on Rails application running on Mongrel. Over a period of several months I recorded 55 dreams (as many as I could remember upon waking), transcribing them and storing them in the server’s database.

Each dream transcript is then parsed and tagged using a Brill part-of-speech tagger. Nouns are lemmatized and sorted roughly into categories of person (actor), place or thing using the Princeton Wordnet database as the guiding ontology. Afterwards, the system uses the Ruby Graph Library and Wordnet to perform semantic graph analysis on each transcript, attempting to extrapolate the main concepts represented therein (i.e. love, mayhem, motherhood, shopping, etc.) This proved to be only marginally useful, as dreams often are composed of many disparate concepts and thus don’t lend themselves to semantic analysis of this kind.

Each concept and word is then stored individually in the database, and its usage frequency across all transcripts is recorded. The more frequently a word or concept is used (for instance: flying) the more frequently it will appear in the generated dreams. After all this is said and done, I personally hand-tag each transcript with a major emotional category, such as fear, embarrassment or anger.

To generate the dreams the system uses a collection of recursive transition networks (a.k.a context-free grammars), several for each emotion. Concepts associated with a given emotion are chosen at random according to their frequency, as are actors, places and things that will appear in the dream. The Wordnet and USF Free Association Norms databases are used to both add variety to dreams (by looking up synonyms, hypernyms and hyponyms of words or concepts) as well as to imbue with AI with some very basic “common sense” (i.e. a taxi cab is a kind of car, dogs can bark and run, etc.). This proved to be marginally effective, resulting sometimes in some very humorous and non-sensical dreams. Fortunately, real dreams are often non-sensical anyway!

Finally, the Cepstral text-to-speech software reads the output of the recursive transition network, rendering it out to a standard WAV file. The server uses the LAME MP3 encoder to convert the WAV to MP3, and streams it on request to the radio. Because dream generation is fairly CPU intensive, as one dream is streaming the server uses BackgroundRb to generate a new one and store it in a queue. This ensures relatively instantaneous playback for dream channel surfers.

<img src="/images/uncanny_dream_photo8.jpg" alt="Photo 5" class="framed" />
