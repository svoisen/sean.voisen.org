---
layout: post
title: Next steps in Sifteo development
---

_This is a [follow-up to previous tutorial](http://sean.voisen.org/blog/2011/10/up-and-running-with-sifteo-sdk/) on getting started with the Sifteo SDK. If you haven't at least managed to get the example applications from the SDK running, I suggest you start there first._

Introduction
------------

Once you have the Sifteo SDK installed and working on your system, and you're ready to build your first game, you may find yourself asking: "What next? Where do I go from here?"

Moving from "Hello, World!" to real-life application development on a new platform is always a daunting task. To add to the challenge, consider the uniqueness and idiosyncrasies of the Sifteo platform:

1. **The cubes are multi-faceted.** Traditionally, software developers are accustomed to handling mouse clicks and keyboard input.  A Sifteo cube is an entirely new I/O device with its own strengths, weaknesses, and quirks. The multi-faceted nature of the cube, for instance, means that not only must you account for the four different sides of the cube, but also (depending on the complexity of your application) orientation, tilt, and adjacency to other cubes.

2. **Communication with the cubes is wireless.** The wireless connection is low-latency, but not zero-latency. Every command you send to the cubes (for instance, to draw a rectangle or paint an image) costs time, and too many commands can reduce the framerate and introduce flicker.  Furthermore, because the cubes are wirelessly connected, you must also account for any unexpected connectivity events that may happen. That is, cubes may be introduced to or removed from game play at any time.

3. **Everything image displayed on the cubes is a raster graphic.** All imagery, including text, that appears on the cubes must be an image or computationally drawn using the `Cube.FillRect` or `Cube.FillScreen` methods. Vectors don't exist, and there is no drawing API. Arbitrary text rendering is a particular challenge, and must be accomplished by generating sprite sheets of font glyphs and manually placing those glyphs to create words or sentences.

Diving In
---------

Lingua (above) is my first Sifteo game. It is a relatively simple game designed to aid in the learning of foreign languages &mdash; presently just French and English. In the process of developing Lingua, I've accumulated a small set of practices, tips and techniques, the bulk of which I share here.

Architecture: Using MVC
-----------------------

Certainly, there is no "one best way" to architect a Sifteo game, but there are good and bad ways. A bad way, of course, would be to shove everything in a single application class. A good way would involve developing a reasonable architecture on an established design pattern. I like MVC.

### Controllers

The Sifteo SDK includes `Sifteo.Util.StateMachine`, a handy class for managing control flow state that also happens to make it easy to assign controller classes to each state in your application. Notice that most games already in the Sifteo store proceed through a series of discrete states: title screen, options screen, a variety of game screens, possibly a pause or return to main menu screen, and so on. Using the `StateMachine` class, every screen can be a state, and every state can have its own controller.

Consider a simple sorting game with three states as an example. You might set up the state machine in the main application class as follows:

{% highlight csharp %}
StateMachine sm = new StateMachine();
sm.State("Title", titleController);
sm.State("Menu", menuController);
sm.State("Game", gameController);

sm.Transition("Title", "TitleToMenu", "Menu");
sm.Transition("Menu", "MenuToGame", "Game");
sm.Transition("Game", "GameToMenu", "Menu");

{% endhighlight %}

This results in a small state machine that allows you to move from title screen to menu, and back and forth between the menu and game states. This is, of course, a simplistic example &mdash; string literals should be made constants, etc. &mdash; but this should illustrate the basic idea.

A few things to note about the `StateMachine` class: 

* Every controller must implement the `IStateController` interface. 
* The `OnTick` and `OnPaint` methods in the controllers will not be called unless you call the `Tick` and `Paint` methods on the StateMachine itself.
* Calling `Tick` on the StateMachine will call `OnTick` in every controller, whether it is the controller that currently owns control flow or not.

### Models

There's little to say about models except the fact that every application should have at least one. Because Sifteo games tend to be small, most data models will likely not be very complex, but your needs here will vary. I tend to have a main application model, and sub-models for each state, and maybe even a model for each cube.

### Views

A common pattern in many of the examples included in the SDK is to "wrap" each `Cube` instance in a kind of wrapper class. The wrapper contains the `Cube` through composition, and adds a reference to itself on the `userData` property of the cube itself. Cubes are wrapped on setup, or whenever they are discovered as the result of a `CubeSet.NewCubeEvent`.

I like to think of these "wrappers" as view classes, and push all of my image manipulation and painting code to the wrappers. This way, each wrapped cube is responsible for painting itself when commanded by the controller, and view code stays out of the controller itself. Here's an example:

{% highlight csharp %}
public class CubeWrapper
{
  public CubeWrapper(Cube cube)
  {
    Cube = cube;
  }

  public Cube Cube
  {
    get{ return cube; }

    set
    {
      cube = value;
      cube.userData = this;
    }
  }

  public void Paint()
  {
    // Painting code goes here
  }
}

{% endhighlight %}
