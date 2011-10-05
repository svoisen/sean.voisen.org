---
layout: post
title: Up and running with the Sifteo SDK
---

I&rsquo;m pretty excited about [Sifteo](http://www.sifteo.com) cubes. I&rsquo;m even more excited about developing for them. 

If you&rsquo;re unfamiliar with Sifteo I recommend checking out the 2009 [TED Talk](http://www.ted.com/talks/david_merrill_demos_siftables_the_smart_blocks.html) where early prototypes of Sifteo cubes were first introduced to the mainstream. Sifteo cubes represent an entirely new paradigm for playful learning through physical computing. They bring physicality and kinesthetic reasoning to educational gaming in a way that few other platforms can match. 

Recently, Sifteo released the first version of their SDK, allowing outside developers to begin exploring development for the Sifteo platform. As of the time of this writing, the Sifteo SDK is still an alpha release. As such, it is somewhat rough around the edges, with some crucial aspects of the documentation either lacking in necessary detail or missing entirely. This brief tutorial hopes to remedy that situation.

Introduction
------------

Sifteo applications are developed in C# using the open source Mono framework. .NET developers should feel right at home, but developers familiar with Java, C++ or ActionScript should also have little trouble getting started.

Before diving in, it is worth noting upfront that **you do not need to own Sifteo Cubes to develop applications for them.** The SDK ships with a desktop simulator called &ldquo;Siftulator&rdquo; that allows you to use your mouse to interact with virtual Sifteo cubes on the screen. You will still want real cubes for testing the interaction models of your applications (no virtual model can substitute for physical play), but the simulator will at least allow you to get started with no up-front cost.  This simulator, being alpha, is still a bit clunky, but is also a valuable tool for rapid development. Without it, you must install your application on your physical cubes each time you want to test &mdash; a process that can take 30 seconds, a minute or more.

Getting Started
---------------

To follow along in this tutorial you&rsquo;ll need the following:

* A Mac running OS X 10.5+, or a Windows PC running XP or better
* The [Mono](http://www.mono-project.com) runtime for your OS already installed
* [MonoDevelop](http://www.monodevelop.com), the open source C# and .NET IDE 
* The [Sifteo SDK](http://www.sifteo.com/developers) itself, downloaded and unzipped to the location of your choosing. Throughout this tutorial I will refer to this location as `SDK_HOME`.

Creating a Project
------------------

The first step in creating a Sifteo project requires using the command-line tool `project_gen` from the Sifteo SDK to create a bare bones project structure.

On Mac, the following incantation in the Terminal will create a new project called &ldquo;MyFirstApp&rdquo; in the current directory (make sure you&rsquo;re in a directory where you&rsquo;d like to store your projects):

<pre>
mono [SDK_HOME]/tools/project_gen/project_gen.exe MyFirstApp

</pre>

On Windows, use a similar command from the Mono command prompt, replacing &ldquo;/&rdquo; with &ldquo;\\&rdquo;, etc.

Opening Your Project
--------------------

Once your project has been generated, open the `MyFirstApp.sln` file in MonoDevelop. Before you can build your project, you will need to update the project references to point to the `Sifteo.dll` file in the SDK distribution. Sifteo has unfortunately buried this file deep within the SDK directory hierarchy. To help make it easier to find, here is the location of the file for each operating system:

**Mac:** [SDK_HOME]/Siftdev.app/Contents/Resources/Runtimes/Mono/Current/sifteo/Sifteo.dll
**Windows:** [SDK_HOME]\bin\Runtimes\Mono\Current\sifteo\Sifteo.dll

<img src="http://sean.voisen.org/images/sifteo_setup_1.png" alt="Set references in MonoDevelop" class="framed" />

<img src="http://sean.voisen.org/images/sifteo_setup_2.png" alt="Select Sifteo.dll" class="framed" />

In order to avoid warnings at compile time, be sure to remove the broken reference to the Sifteo .NET assembly file that `project_gen` creates, leaving only the Sifteo.dll and System references.

Using Siftdev and Siftulator
----------------------------

You should now have a working empty application. Open up the Siftdev application from the SDK and select &ldquo;Load Apps ...&rdquo; from the Developer menu.

<img src="http://sean.voisen.org/images/sifteo_setup_3.png" alt="Select Load Apps in Siftdev" class="framed" />

Select the root folder of your entire `MyFirstApp` project. The MyFirstApp application should now appear along with the rest of any games you have downloaded from the Sifteo store. 

<img src="http://sean.voisen.org/images/sifteo_setup_4.png" alt="Select the MyFirstApp application" class="framed" />

Select it and launch the Siftulator application from the SDK. Three cubes should show as connected in the status bar of Siftdev. (If you own real cubes, make sure the USB wireless transmitter is NOT connected, otherwise it will attempt to connect to your real cubes.)

<img src="http://sean.voisen.org/images/sifteo_setup_5.png" alt="Not connected" class="framed" />

<img src="http://sean.voisen.org/images/sifteo_setup_6.png" alt="Connected" class="framed" />

By default the project is setup to connect to MonoDevelop for debugging. So, before you can play the application you must run the project from within MonoDevelop by selecting &ldquo;Run&rdquo; from the &ldquo;Run&rdquo; menu. Once you have done so, click Play in Siftdev and the application will begin running in Siftulator. A stream of logging information will appear in the Application Output panel within MonoDevelop.

That&rsquo;s it! You&rsquo;ve built your first Sifteo application! 

Using Sprites and Graphics
--------------------------

Getting graphics to work in the Siftulator requires a little more work. Note the following information from the API documentation: 

> Graphics on Sifteo cubes use an 8-bit color space of format RRRGGGBB. This color space maps to a fixed 256-color palette ... One color is reserved for the transparency key: RGB 72, 255, 170.

This means that any graphics you create for Sifteo must be converted to the proper color space and in the proper format.

Siftdev includes a tool for exactly this purpose.  It is called &ldquo;Image Helper&rdquo; and can be found under the Developer menu. Image Helper will convert images in PNG or JPEG format to the required .siftimg and .sftbndl formats in 8-bit color. As an example, download the following PNG strip of three 128x128px sprites. We will use it to display the letters ABC on three cubes, one letter per cube:

<img src="http://sean.voisen.org/images/LetterSprites.png" alt="Sample sprite strip" class="framed" />

Create a folder `assets/images` within your MyFirstApp project and save the above PNG to that folder. Open Image Helper and select the PNG file using the &ldquo;Select File ...&rdquo; button. Then, click &ldquo;Convert.&rdquo; This will create a new file, `LetterSprites.siftimg` in `assets/images`. Next, click &ldquo;Select Folder ...&rdquo; and select the same `assets/images` folder, and under &ldquo;Save As&rdquo; give the new bundle the name &ldquo;Sprites.&rdquo; Finally, click &ldquo;Convert All.&rdquo; 

<img src="http://sean.voisen.org/images/sifteo_setup_8.png" alt="Create a bundle" class="framed" />

The `assets/images` folder should now contain four files in total:

* LetterSprites.png
* LetterSprites.siftimg
* Sprites_siftbndl_index.txt
* Sprites.sftbndl

Modify the `Setup` function in `MyFirstApp.cs` and add the following code:

{% highlight csharp %}
override public void Setup ()
{
  Log.Debug ("Setup()");
            
  int spriteYPos = 0;
  foreach (Cube cube in CubeSet) {
    cube.FillRect (new Color (0, 0, 255), 0, 0, 
      Cube.SCREEN_WIDTH, Cube.SCREEN_HEIGHT);
    cube.Image ("LetterSprites", 0, 0, 0, spriteYPos, 
      Cube.SCREEN_WIDTH, Cube.SCREEN_HEIGHT, 0, 0);
    cube.Paint ();
               
    spriteYPos += Cube.SCREEN_HEIGHT;
  }
}
{% endhighlight %}

Everything should now run as expected on real cubes. For Siftulator to correctly display the sprite images, however, it needs to be directed to the location of the folder containing the individual .siftimg files. Select the second-to-last button in Siftulator toolbar and select the `assets/images` folder in your project. Finally, run your project in Siftulator (you may need to reload the application in Siftdev from the developer menu). The output should look something like the following:

<img src="http://sean.voisen.org/images/sifteo_setup_9.png" alt="Final application" class="framed" />

Conclusion
----------

This is, of course, the bare-bones minimum a developer needs to know to start creating games and applications for Sifteo. But hopefully it will help the few early adopters out there who struggled, as I did, to fill in some of the holes in the existing SDK documentation on how to set up your development environment. 

The SDK does include in-depth API documentation, as well as a few examples coded in [literate programming](http://en.wikipedia.org/wiki/Literate_programming) style, that are certainly worth exploring for information on sound, the event architecture, persisting data, and more. 

Happy sifting :) 
