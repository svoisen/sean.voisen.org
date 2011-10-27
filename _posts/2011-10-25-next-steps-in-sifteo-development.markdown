---
layout: post
title: Next steps in Sifteo development with MVC and Ninject
---

_This is a [follow-up to previous tutorial](http://sean.voisen.org/blog/2011/10/up-and-running-with-sifteo-sdk/) on getting started with the Sifteo SDK. If you haven't at least managed to get the example applications from the SDK running, I suggest you start there first._

Introduction
------------

Once you have the Sifteo SDK installed and working on your system, and you're ready to build your first game, you may find yourself asking: "Where do I go from here?"

Moving from "Hello, World!" to real-life application development on a new platform is always a daunting task. To add to the challenge, consider the uniqueness and idiosyncrasies of the Sifteo platform:

1. **The cubes are multi-faceted.** Traditionally, software developers are accustomed to handling mouse clicks and keyboard input.  A Sifteo cube is an entirely new I/O device with its own strengths, weaknesses, and quirks. The multi-faceted nature of the cube, for instance, means that not only must you account for the four different sides of the cube, but also (depending on the complexity of your application) orientation, tilt, and adjacency to other cubes.

2. **Communication with the cubes is wireless.** The wireless connection is low-latency, but not zero-latency. Every command you send to the cubes (for instance, to draw a rectangle or paint an image) costs time, and too many commands can reduce the framerate and introduce flicker.  Furthermore, because the cubes are wirelessly connected, you must also account for any unexpected connectivity events that may happen. That is, cubes may be introduced to or removed from game play at any time.

3. **Everything image displayed on the cubes is a raster graphic.** All imagery, including text, that appears on the cubes must be an image or computationally drawn using the `Cube.FillRect` or `Cube.FillScreen` methods. Vectors don't exist, and there is no drawing API. Arbitrary text rendering is a particular challenge, and must be accomplished by generating sprite sheets of font glyphs and manually placing those glyphs to create words or sentences.

Diving In
---------

Lingua (above) is my first Sifteo game. It is a relatively simple game designed to aid in the learning of foreign languages &mdash; presently just French and English. In the process of developing Lingua, I've accumulated a small set of practices, tips and techniques, the bulk of which I share here.

Architecture: Basic MVC
-----------------------

Certainly, there is no "one best way" to architect a Sifteo game, but there are good and bad ways. A bad way, of course, would be to shove everything in a single application class. A good way would involve developing a reasonable architecture on an established design pattern. I like MVC.

### Controllers

The Sifteo SDK includes `Sifteo.Util.StateMachine`, a handy class for managing control flow state that also happens to make it easy to assign controller classes to each state in your application. Notice that most games already in the Sifteo store proceed through a series of discrete states: title screen, options screen, a variety of game screens, possibly a pause or return to main menu screen, and so on. Using the `StateMachine` class, every screen can be a state, and every state can have its own controller. This is perhaps the easiest way to break up the logic of a game into discrete classes.

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

This results in a small state machine that allows you to move from title screen to menu, and back and forth between the menu and game states. This is, of course, a simplistic example &mdash; string literals should be made constants, the StateMachine should be a field, etc. &mdash; but this should illustrate the basic idea.

A few things to note about the `StateMachine` class: 

* Every controller must implement the `IStateController` interface. 
* The `OnTick` and `OnPaint` methods in the controllers will not be called unless you call the `Tick` and `Paint` methods on the StateMachine itself.
* Calling `Tick` on the StateMachine will call `OnTick` in every controller, whether it is the controller that currently owns control flow or not.

### Models

There's little to say about models except the fact that every application should have at least one. Because Sifteo games tend to be small, most data models will likely not be very complex. I tend to have a main application model, and sub-models for each state, and maybe even a model for each cube. Your milage may vary.

### Views

A common pattern found in many of the examples included in the SDK is to "wrap" each `Cube` instance in a kind of wrapper class. The wrapper contains the `Cube` through composition, and adds a reference to itself on the `userData` property of the cube itself. Cubes are wrapped on setup, or whenever they are discovered as the result of a `CubeSet.NewCubeEvent`.

I like to think of these "wrappers" as view classes, and push all of my image manipulation and painting code to the wrappers themselves. This way, each wrapped cube is responsible for painting itself when commanded by the controller, and view code stays out of the controller. Here's an example:

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

  private Cube cube;
}

{% endhighlight %}

It's possible, and likely, that different game states will have different painting code, in which case it's best to wrap and unwrap the cubes in the `OnSetup` and `OnDispose` methods in the controllers, respectively.

Architecture: Wiring It Together with Ninject
---------------------------------------------

In any MVC architecture, controllers will need access to models and views, and views will likely need access to models. There are myriad ways of resolving these dependency requirements &mdash; I prefer automated dependency injection. [Ninject](http://www.ninject.org) is a light-weight, open-source dependency injector for .NET that seems well-suited for small-scale applications like Sifteo games. To get started with Ninject, simply [download the Ninject.dll](http://ninject.org/download) and add it to the list of project references (just like the Sifteo.dll).

Next, create (at least one) "module" that defines the main dependencies for your application. These may include not only models and controllers, but also any services and frequently-used helper classes. Continuing with the simple sorting game example, a module might look as follows:

{% highlight csharp %}
public class SortingGameModule : NinjectModule
{
  public override void Load()
  {
    Bind<SortingGame>().ToSelf().InSingletonScope();

    Bind<GameModel>().ToSelf().InSingletonScope();
    Bind<ILetterService>().To<LetterService>().InSingletonScope();

    Bind<TitleController>().ToSelf().InTransientScope();
    Bind<MenuController>().ToSelf().InTransientScope();
    Bind<GameController>().ToSelf().InTransientScope();
  }
}

{% endhighlight %}

And setup the `Main` function for your application like so:

{% highlight csharp %}
public static void Main(string[] args)
{
  Kernel = new StandardKernel(new SortingGameModule());
  Kernel.Get<SortingGame>().Run();
}

public IKernel Kernel
{
  get; set;
}

{% endhighlight %}

From this point forward, any depenencies defined in the `SortingGameModule` will be made available either through the `Kernel.Get` function, or &mdash; and more importantly &mdash; through the `[Inject]` attribute.

For instance, you can inject the singleton `GameModel` into the `GameController` using constructor injection without ever passing an instance of the model into the controller manually:

{% highlight csharp %}
public class GameController : IStateController
{
  [Inject]
  public GameController(GameModel model)
  {
    GameModel = model;
  }

  private GameModel GameModel
  {
    get; set;
  }
}

{% endhighlight %}

Ninject also supports other injection patterns, like property and method injection, though these practices are generally discouraged. For more information on using Ninject, try the [Ninject wiki](https://github.com/ninject/ninject/wiki).

Other Helpful Tips
------------------

### State Machine Locking

{% highlight csharp %}
public class StateMachineLock
{
  public StateMachineLock(StateMachine stateMachine)
  {
    StateMachine = stateMachine;
    unlockAt = -1;
  }
  
  public StateMachine StateMachine
  {
    get; set;
  }
  
  public bool Locked
  {
    get { return unlockAt > -1; }
  }
  
  public void LockForTickCount(int numTicks)
  {
    stateMachineLock = StateMachine.AquireLock();
    unlockAt = numTicks;
    tickCount = 0;
  }
  
  public void Tick()
  {
    if (!Locked)
      return;
      
    tickCount++;
      
    if (tickCount >= unlockAt)
      Unlock();
  }
  
  public void Unlock()
  {
    if (stateMachineLock != null)
    {
      stateMachineLock.Dispose();
      unlockAt = -1;
    }
  }
        
  private IDisposable stateMachineLock;
  private int tickCount;
  private int unlockAt;
}

{% endhighlight %}

