---
layout: post
title: Rendering images with Emscripten, WASM and OpenGL
---
> TL;DR - The source for the demo application documented in this post is [available on GitHub](https://github.com/svoisen/wasm-imageviewer/).

After joining [Madefire](http://www.madefire.com) in September of last year, one of my first goals was to get our Motion Book rendering engine – a C++ and OpenGL application – running on the web using [WebAssembly](http://webassembly.org/). While I knew this could theoretically be accomplished by using [Emscripten](https://kripken.github.io/emscripten-site) – particularly after hearing about how the team at [Figma](https://www.figma.com/) [used it to compile their renderer](https://blog.figma.com/building-a-professional-design-tool-on-the-web-6332ed4f1fcc) – I'd never actually tried Emscripten myself.

After diving head-long into the project, I quickly discovered that while the Emscripten toolchain has [ample documentation](https://kripken.github.io/emscripten-site/docs/getting_started/index.html), there seems to be a lack of practical examples on how to effectively use an Emscripten-compiled module within the context of a larger, "real-world" JavaScript application. In particular, while Emscripten provides sophisticated binding mechanisms like [Embind](https://kripken.github.io/emscripten-site/docs/porting/connecting_cpp_and_javascript/embind.html) to aid in marshaling data to and from a C module, it also offers a host of other lower-level options for JavaScript/C/C++ interop. Learning which to use when – and how! – required a fair bit of research, poring through forums, [Stack Overflow](https://stackoverflow.com/) questions, and even the occasional GitHub issue.

## The OpenGL Image Viewer
I find that reading through examples, then building my own practical mini-applications to be one of the best ways to get up to speed with a new technology. Early in my learning process I stumbled upon [this excellent example](http://blog.scottlogic.com/2014/03/12/native-code-emscripten-webgl-simmer-gently.html) on how to build a simple OpenGL-based web application using Emscripten, C++ and TypeScript. It demonstrates how one might use OpenGL and C++ to render a simple triangle in a browser canvas using a procedural texture. But it also goes beyond this, illustrating some of the compiler options needed to make C++ functions visible in the module interface, as well as some of the tools available for debugging (yes, debugging!) C++ code in the browser.

Inspired, I got to work. Madefire is, at heart, a visual storytelling company, so images here are everything, and while rendering an image in OpenGL is quite straightforward, figuring out how to get that image from a JavaScript application _into_ a C++ renderer (and in the most performant way) was not.

One result of my tinkering is a [small image viewer application that I've made available on GitHub](https://github.com/svoisen/wasm-imageviewer). Written in C++ and JavaScript, the image viewer compiles to WebAssembly. If you're reading this blog post on a browser that supports HTML5 drag-and-drop and WebAssembly (any recent version of Firefox or Chrome for instance), feel free to [give the live example a try](https://svoisen.github.io/wasm-imageviewer/). Simply drag and drop an JPEG image onto the page to view it on the canvas. While most of the C++ code is the standard, run-of-the-mill OpenGL ES 3.0 boilerplate for compiling shaders and rendering a texture to a quad, I do make use of the excellent [stb](https://github.com/nothings/stb) C++ library to decode the actual JPEG data.

## Passing Large Data Buffers into an Emscripten-compiled Module
Once I had a C++ and OpenGL texture renderer that functioned (at least in theory), the crux of my problem to making it run was figuring out use image data coming from JavaScript (via HTML5 drag-and-drop and the `FileReader` API). Doing so involved learning a little bit about how memory, as well as interop between JavaScript and compiled code, works in the Emscripten runtime.

Emscripten supports direct marshaling of most kinds of JavaScript primitives using its [`ccall` and `cwrap`](https://kripken.github.io/emscripten-site/docs/porting/connecting_cpp_and_javascript/Interacting-with-code.html#interacting-with-code-ccall-cwrap) functions. This includes strings, numbers, arrays, and so forth. Thus, the simplest – though most naive – approach to getting an image from JavaScript to C++ would be to pass the data buffer for the image as an array parameter on the stack. From a JavaScript developer's perspective, this might sound fine, because in JavaScript one never has to think about "low-level" issues like pointers and memory management. In fact, for very small images, passing data on the stack might work, but you will quickly find yourself running out of stack memory for an image of significant size.

The "proper" way to do things replicates how you would accomplish the same task in C or C++. Namely, allocate memory on the heap, fill the allocated space with the image data, and pass a pointer to that data to your function. If you have a typed array (say a `Uint8Array`) with your image data (called `imageData`), the boilerplate for such an operation might look as follows:

{% highlight javascript %}
const numBytes = imageData.length * imageData.BYTES_PER_ELEMENT;
const ptr = Module._malloc(numBytes);
const imageOnHeap = new Uint8Array(Module.HEAPU8.buffer, ptr, numBytes);
imageOnHeap.set(imageData);
Module.someImageFunction(imageOnHeap.byteOffset, imageData.length);
Module._free(ptr);
{% endhighlight %}

You can [see this at work](https://github.com/svoisen/wasm-imageviewer/blob/master/main.js#L65) as part of my example application in `main.js`.

In Emscripten, the heap is just a giant `ArrayBuffer` with various typed array "views" onto that buffer made available through the constants: `HEAP8`, `HEAPU8`, `HEAP16`, `HEAPU16` and [so forth and so on, up to 64 bits](https://kripken.github.io/emscripten-site/docs/api_reference/preamble.js.html#type-accessors-for-the-memory-model).

Here, we use `Module._malloc` – similar to C's `malloc` – to allocate space for 8-bit unsigned data on the array buffer. The "pointer" we get back from `Module._malloc` is just an integer offset into the buffer. With it we can create a typed array backed by the heap at the offset, and fill it with the image data. From there we simply pass the "pointer" – aka the buffer offset – to our C function and do with it what we will. Finally, we clean up after ourselves using `Module._free` (similar to C `free`).

If you don't need a new typed array view onto the heap data (and in this example we don't), the code above can be simplified to:

{% highlight javascript %}
const numBytes = imageData.length * imageData.BYTES_PER_ELEMENT;
const ptr = Module._malloc(numBytes);
Module.HEAPU8.set(imageData);
Module.someImageFunction(ptr, imageData.length);
Module._free(ptr);
{% endhighlight %}

## A Note About Performance
The use of `set` in the boilerplate above is rather unfortunate, because it means that we are _copying_ data into the Emscripten heap rather than writing to it directly. This copy happens on the main JavaScript thread, and, for large images, can take a noticeable length of time.

Unfortunately, at least for my example application, the `FileReader` API does not allow you to read a file directly into a pre-allocated buffer. So, I have no choice, and must do the copy. But, if you have the opportunity to do so, it would be far better to write your data directly into the allocated space on the heap.

Alternatively, for the adventurous, Emscripten offers a [split memory](https://github.com/kripken/emscripten/wiki/Split-Memory) compilation mode that could theoretically allow you to use an existing buffer (via `allocateSplitChunk`) as part of Emscripten's heap. Given the warnings and performance implications of this mode, I did not explore it here and, as they say, leave it up as an exercise to the reader.

## Making Things Nicer with `ccall`
If you happen to be building a module intended for consumption by other JavaScript developers who may not be familiar with the nuances of C/C++ memory management, an API that forces them to use functions like `malloc` and `free` is less than ideal. Fortunately, you can hide these pesky implementation details.

One option is to use the `--post-js` compiler option to provide a JavaScript interface to your module that takes care of the memory management, and then uses `ccall` to call the compiled C code. The `--post-js` compiler option simply extends the compiled C module with the provided JavaScript code _after_ the module has been compiled, but _before_ optimization takes place. For instance, your "post JS" extension might consist of a single JavaScript file that looks like the following:

{% highlight javascript %}
Module['someImageFunction'] = function(imageData) {
	const numBytes = imageData.length * imageData.BYTES_PER_ELEMENT;
	const ptr = Module._malloc(numBytes);
	Module.HEAPU8.set(imageData);
	Module.ccall(
		'someImageFunction',
		'void', // return type
		['number', 'number'], // argument types
		[ptr, imageData.length] // arguments
	);
	Module._free(ptr);
}
{% endhighlight %}

This code will get appended to your module during compilation and exposed as `someImageFunction` directly on the module.

Given the code above, you might be wondering if the C function, `someImageFunction`, might get overwritten in the module by the JavaScript function of the same name. However, the Emscripten compiler always exposes C/C++ functions that have been exported using an underscore prefix, which allows us to avoid the name collision. If you look at the [`makefile`](https://github.com/svoisen/wasm-imageviewer/blob/master/makefile) in my example, you will see that the native `EXPORTED_FUNCTIONS` all begin with an underscore. Note that setting the list of `EXPORTED_FUNCTIONS` – which are specified as C `extern` – is _required_, else the compiler will optimize them away if they aren't used by any C code.

## Getting Tricky with Embind
If you're already using [Embind](https://kripken.github.io/emscripten-site/docs/porting/connecting_cpp_and_javascript/embind.html#embind) to expose a richer C++ API, you can also use the [`emscripten::val`](https://kripken.github.io/emscripten-site/docs/porting/connecting_cpp_and_javascript/embind.html#using-val-to-transliterate-javascript-to-c) class to hide the memory management details using C++, in lieu of JavaScript. This can come in handy if you are passing or returning Embind-bound classes or other objects to or from your method because you can write all your binding code in one place.

With this technique, you pass the JavaScript typed array directly to your Embind-exposed C++ function, which should accept it as a reference to an `emscripten::val` class. For instance:

{% highlight c++ %}
void someImageFunction(const emscripten::val& typedArray) {
    unsigned int length = typedArray["length"].as<unsigned int>();
    emscripten::val memory = emscripten::val::module_property("buffer");
    uint8_t* buffer = (uint8_t*)malloc(length);
    emscripten::val memoryView = typedArray["constructor"].new_(memory, reinterpret_cast<uintptr_t>(buffer), length);
    memoryView.call<void>("set", typedArray);
    // and now the image data is in the buffer
}
{% endhighlight %}

The code above accomplishes the same task as before, namely fetching the length of the typed array, allocating space on the heap, creating a new typed array that is a "view" onto the heap memory, then copying the typed array onto the heap using `set`.

## Wrapping Up
If this isn't enough, the folks at Figma have graciously provided a small library, [IndirectBuffer](https://github.com/evanw/indirectbuffer), which allows for access of out-of-heap memory in Emscripten. I haven't yet tried this myself, but plan to do so very soon. It looks promising, particularly if you're trying to target a wide range of browsers on a wide range of platforms.

The API surface for the Emscripten run-time is rather large – covering everything everything from networking to filesystems to I/O to runloop considerations. This small example only scratches the surface of what's possible, and for a very limited use case, but hopefully some of you will have found it valuable as a means for getting started in porting – or using – C code on the web using WebAssembly.