---
layout: post
title: Up and running with the Sifteo SDK
---

[Sifteo](http://www.sifteo.com) represents an entirely new paradigm for playful learning through physical computing. Recently, Sifteo released the first version of their SDK, allowing outside developers to begin exploring development for the Sifteo platform.

Introduction
------------

Sifteo applications are developed in C# using the open source Mono framework. .NET developers should feel right at home, but developers familiar with Java, C++ or ActionScript should also have little trouble getting started.

As of the time of this writing, the Sifteo SDK is still an alpha release. As such, it is somewhat rough around the edges, with some crucial aspects of the documentation either lacking in necessary detail or missing entirely. This brief tutorial hopes to remedy that situation.

Before diving in, it is worth noting upfront that **you do not need to own Sifteo Cubes to develop applications for them.** The SDK ships with a desktop simulator that allows you to use your mouse to interact with virtual Sifteo cubes on the screen. You will still want real cubes for testing the interaction models of your applications before release (no virtual model can substitute for physical play), but the simulator will at least allow you to get started with no up-front cost.  This simulator, being alpha, is still a bit clunky, but is also a valuable tool for rapid development. Without it, you must install your application on your cubes each time you want to test &mdash; a process that can take 30 seconds, a minute or more.

Getting Started
---------------

To follow along in this tutorial you'll need the following:

* A Mac running OS X 10.5+, or a Windows PC running XP or better
* The [Mono](http://www.mono-project.com) runtime for your OS already installed
* [MonoDevelop](http://www.monodevelop.com), the open source C# and .NET IDE 
* The [Sifteo SDK](http://www.sifteo.com/developers) itself, downloaded and unzipped to the location of your choosing. Throughout this tutorial I will refer to this location as `SDK_HOME`.

Creating a Project
------------------

The first step in creating a Sifteo project requires using the command-line tool `project_gen` from the Sifteo SDK to create a bare bones project structure.

On Mac, the following incantation in the Terminal will create a new project called MyFirstApp in the current directory (make sure you're in a directory where you'd like to store your projects):

<pre>
mono [SDK_HOME]/tools/project_gen/project_gen.exe MyFirstApp

</pre>

On Windows, use a similar command from the Mono command prompt, replacing "/" for "\", etc.

Opening Your Project
--------------------

Once your project has been generated, open the `MyFirstApp.sln` file in MonoDevelop. Before you can build your project, you will need to update the project references to point to the `Sifteo.dll` file in the SDK distribution. Sifteo has unfortunately buried this file deep within the SDK directory hierarchy. To help make it easier to find, here is the location of the file for each operating system:

**Mac:** [SDK_HOME]/Siftdev.app/Contents/Resources/Runtimes/Mono/Current/sifteo/Sifteo.dll
**Windows:** [SDK_HOME]\bin\Runtimes\Mono\Current\sifteo\Sifteo.dll

<img src="http://sean.voisen.local/images/sifteo_setup_1.png" alt="Set references in MonoDevelop" class="framed" />

<img src="http://sean.voisen.local/images/sifteo_setup_2.png" alt="Select Sifteo.dll" class="framed" />

In order to avoid warnings at compile time, be sure to remove the broken reference to the Sifteo .NET assembly file that `project_gen` creates, leaving only the Sifteo.dll and System references.

Using Siftdev and Siftulator
----------------------------

You should now have a working empty application. Open up the Siftdev application from the SDK and select "Load Apps ..." from the Developer menu.

<img src="http://sean.voisen.local/images/sifteo_setup_3.png" alt="Select Load Apps in Siftdev" class="framed" />

Select the root folder of your entire `MyFirstApp` project. The MyFirstApp application should now appear along with the rest of any games you have downloaded from the Sifteo store. 

<img src="http://sean.voisen.local/images/sifteo_setup_4.png" alt="Select the MyFirstApp application" class="framed" />

Select it and launch the Siftulator application from the SDK. Three cubes should show as connected in the status bar of Siftdev. (If you own real cubes, make sure the USB wireless transmitter is NOT connected.)

<img src="http://sean.voisen.local/images/sifteo_setup_5.png" alt="Not connected" class="framed" />

<img src="http://sean.voisen.local/images/sifteo_setup_6.png" alt="Connected" class="framed" />

By default the project is setup to connect to MonoDevelop for debugging. So, before you can play the application you must run the project from within MonoDevelop by selecting "Run" from the "Run" menu. Once you have done so, click Play in Siftdev and the application will begin running in Siftulator. A stream of logging information will appear in the Application Output panel within MonoDevelop.

Congratulations, you've built your first Sifteo application!

Using Sprites and Graphics
--------------------------
