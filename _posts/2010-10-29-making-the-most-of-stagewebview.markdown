---
layout: post
title: Making the most of StageWebView
---

<script type="text/javascript" src="/scripts/shCore.js"></script>
<script type="text/javascript" src="/scripts/shBrushAS3.js"></script>

With the introduction of Adobe AIR 2.5 and AIR for Android, the AIR API gains a new class: [StageWebView](http://help.adobe.com/en_US/FlashPlatform/beta/reference/actionscript/3/flash/media/StageWebView.html). StageWebView can best be described as HTMLLoader’s younger and less-capable step-brother, designed for mobile devices (though it also works in desktop AIR). Like HTMLLoader, StageWebView provides developers with a means to display HTML content — both local and remote — in an AIR application. Unlike HTMLLoader, however, developers cannot add StageWebView instances to the display list. Instead, StageWebView literally draws an instance of the device’s native WebView on top of the stage using designated viewport coordinates and boundary dimensions. This means that, at least presently, developers cannot draw or otherwise place display list objects on top of a StageWebView instance, and animating StageWebView instances proves difficult and exhibits fairly poor performance. StageWebView also does not offer alpha channel support. Nor does it offer a straightforward JavaScript to ActionScript communications bridge. Finally, because HTMLLoader is not supported on Android devices, as AIR developers working with HTML content on Android, we are stuck with StageWebView’s limitations. At least for AIR 2.5.

At first glance, the situation thus seems a bit grim. There are a variety of reasons why AIR for Android does not currently support HTMLLoader, probably none of which I am at liberty to discuss here. But, suffice it to say that Adobe is working on improving the situation.

And in the interim, all is not lost. For many use cases, StageWebView probably already suits most developers’ needs. And there are some things you can do with StageWebView that you simply cannot with HTMLLoader. For instance, because StageWebView employs the native Android WebKit under the hood, in most cases CSS 3 <code>@font-face</code> is supported out of the box (with TTF and OTF). This is something you currently don’t get with HTMLLoader on the desktop (which uses AIR’s own bundled WebKit).

Finally, albeit the fact that bi-directional ActionScript/JavaScript communication is difficult, it is not impossible. This is a useful feature that may be non-obvious to some developers (it was to me!) so I will document it here:

### ActionScript &rarr; JavaScript

ActionScript to JavaScript communication is fairly straightforward. Simply use the “javascript:” protocol. For instance:

<pre class="brush: as3">
swv.loadURL("javascript:myJSFunctionName()");
</pre>

This will invoke the function <code>myJSFunctionName</code> on the JavaScript side, assuming that the function exists and the page is fully loaded. If the function does not exist, no error will be thrown so use with care.

One of the more interesting side-effects of the “javascript:” protocol is that you can also use it to perform JavaScript injection on any web content displayed in the StageWebView. For instance, to inject a new function called <code>myFunction</code> into a loaded page:

<pre class="brush: as3">
swv.loadURL("javascript:var myFunction="
  + "function(){alert('Hello world!');}");
</pre>

### JavaScript &rarr; ActionScript

JavaScript to ActionScript communication requires a bit more hacking. Presently, the best means of passing data from JavaScript to ActionScript is through encoded strings in the StageWebView’s location. Using JavaScript to set <code>document.location</code> will cause the StageWebView to dispatch a <code>LocationChangeEvent.LOCATION_CHANGING</code>. From here, we can use preventDefault() on the event to prevent the location from actually changing, while still extracting the data from the location. I typically use JSON as the data format, and make use of [as3corelib](http://github.com/mikechambers/as3corelib)‘s JSON deserialization methods to handle the data on the ActionScript side. For instance, to get the HTML content width and height inside a StageWebView instance, on the JavaScript side you can use:

<pre class="brush: as3">
document.location=JSON.stringify(
{width:document.body.scrollWidth, height:document.body.scrollHeight});
</pre>

And on the ActionScript side:

<pre class="brush: as3">
swv.addEventListener( LocationChangeEvent.LOCATION_CHANGING,
  handleLocationChanging );
 
function handleLocationChanging( event:LocationChangeEvent ):void
{
  event.preventDefault();
  var data:Object = JSON.decode( event.location );
  trace( "Width: " + data.width + ", Height: " + data.height );
}
</pre>

### Debugging

Finally, it may be useful to know that any calls to <code>console.log()</code> in JavaScript in a StageWebView instance will show up in the Android debugger through “adb logcat”.

And that’s it! Hopefully this will help a few developers who are getting started with AIR for Android and need to work with advanced HTML content.


<script type="text/javascript">
  SyntaxHighlighter.all();
</script>
