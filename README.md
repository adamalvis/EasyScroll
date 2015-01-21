# EasyScroll
A simple module for making scrolling features easy to implement

***

## ScrollEvents
Allows any function to be triggered when selected element enters the targeted area of the viewport

To create an event simply call the scrollEvents() function on the target element and pass in a callback function:

```
$('SOME_ELEMENT').scrollEvent(function () {
	// Event to trigger
});
```

You can further customize your event triggers by passing in some parameters.

```
section2.scrollEvent({
	func: function () {
		// Function to be triggered when element is in view
	},
	reset: function () {
		// Function to be triggered when user scrolls back up past the element
	},
	centered: true, // Sets function to trigger when element is in center of viewport
	offset: 100px // Number of pixels to move trigger from original point
);
```

## ScrollTo
Easily allows smooth scrolling to any element.

First initialize ScrollTo

```
ScrollTo.init();
```

Then you can create a smooth scroll link by adding the 'scrollto' class and pointing the href attribute to the element you wish to scroll to

```
<a class="scrollto" href="#some_element">Scroll Down</a>
```

Scroll to also has a few options that can be edited by passing in some parameters to the init function

```
ScrollTo.init({
	speed: 500, // sets scroll speed in ms
	offset: 200, // sets endpoint offset in px
	linkClass: '.new-class' // Changes the class of scrollto links
});
```