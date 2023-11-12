# Frontend Mentor - Interactive pricing component solution

This is a solution to the [Interactive pricing component challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-pricing-component-t0m8PIyY8). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Use the slider and toggle to see prices for different page view numbers

### Screenshot

![screenshot](./images/screenshot.PNG "screenshot")

### Links

- Solution URL: [Github]()
- Live Site URL: [Live Github]()

## My process

### Built with

- Semantic HTML5 markup
- Bootstrap
- Sass/SCSS
- Mobile-first workflow


### What I learned

- I decided to try without my now usual Boostrap container and row-*s and col-*s, and that was just as easy. In fact this project would not have made sense using the 
  Boostrap container as there are no distinguishable grid sections to this page.
- I could re-use , with some alterations because I'm using SCSS instead of CSS, my toggle switch code from my pricing-component-with-toggle-master project.
- I was looking at coding the slider using jQuery ui slider, but opted for html/css instead.
- I couldn't create the same slider look with html/css as I saw in the design(different color before the slider thumb).
  I had this html code:
  ```
        <div class="slider outer__second text-center">
			<input id='views' type="range" step='10' min="10" max="250" value="125">
			<label class="sr-only" for="views">Select number of page views</label>
		</div> 
  ```
  and this scss code :
  ```
      &__second{
	      /*the slider section*/
		  width: 100%;
		  position: relative;
          margin: 1rem;
		  
	      input[type="range"] {
	         /*removes browsers default appearance*/
             @include track;
			 /*
			 &::-ms-fill-lower{
			     /*corresponds to values lower than the value currently selected by the thumb.*/
			     background-color: map-get($colors,Strong Cyan);
			 }
			 &::-webkit-slider-thumb {
			    /*the part of the slider used to slide*/
			    -webkit-appearance: none;
                appearance: none;
                width: 35px;
                height: 35px;
				position:relative;
				bottom:10px;
                border-radius: 50%;
			    background-image:url(./images/icon-slider.svg);
				background-size: contain;
				background-position: center center;
				background-repeat: no-repeat;
				background-color: map-get($colors,Strong Cyan);
				
			 }
			 &::-webkit-slider-runnable-track{
			    /*Chrome, Safari, Opera, and Edge Chromium */
				height: 10px;
                -webkit-appearance: none;
                margin-top: -1px;
			 }
			 &::-moz-range-thumb {
			    /*still to do*/
			 }
			 &::-moz-range-track{
			    /*firefox*/
				background: map-get($colors,Light Grayish Blue);
                height: 0.5rem;
				width:100%;
			 }
			 
			 @media screen and(min-width:$container__form-xxl * 1px){
			    width: 730px;
			 }
          }
	   }
  ```
  Without this scss code applied I got a default blue color before the thumb part, but I could not get it work with this code.
  I then tried with a box-shadow applied to the thumb part of the code as read in the stackoverflow post (see link)
  ```
    input[type="range"] {
	     /*Safari, Edge, Opera, Brave,Chrome removes browsers default appearance with -webkit*/
             overflow: hidden;
             width: 255px;
            -webkit-appearance: none;
             background-color:map-get($colors, Light Grayish Blue);
	     &::-webkit-slider-runnable-track{
	        -webkit-appearance: none;
            height: 0.5rem;
	        margin-top:-1px;
	      }
	      &::-webkit-slider-thumb {
	         -webkit-appearance: none;
             appearance: none;
             width: 35px;
             height: 35px;
             border: 0;
             border-radius: 50%;
		     position:relative;
		     bottom:15px;
	         background-image:url(./images/icon-slider.svg);
		     background-size: contain;
		     background-position: center center;
		     background-repeat: no-repeat;
		     background-color:map-get($colors,Soft Cyan);
		     box-shadow: -500px 0 0 500px map-get($colors,Soft Cyan);
	 }
			 
  ```
  But this cut of the thumb part (due to overflow:hidden) and that had to be there because of the box-shadow used.
  This code could not work for my purpose.
  
  Then I read on a stackoverflow post about ```accent-color:#343434;``` (see link) and tried with that.
  So this was my applied scss code then:
  ```
    input[type="range"] {
	         /*Safari, Edge, Opera, Brave,Chrome removes browsers default appearance with -webkit*/
             //webkit-appearance: none;
             //appearance: none;
             cursor: pointer;
			 width: 200px;
			 background-color:map-get($colors,Light Grayish Blue);
			 accent-color: map-get($colors,Strong Cyan);
			 &::-webkit-slider-runnable-track{
			    webkit-appearance: none;
				color: map-get($colors,Light Grayish Blue);
                height: 0.5rem;
				margin-top:-1px;
			 }
			 &::-webkit-slider-thumb {
			    -webkit-appearance: none;
                appearance: none;
                width: 50px;
                height: 50px;
                border: 0;
                border-radius: 50%;
				position:relative;
				bottom:0;
			    background-image:url(./images/icon-slider.svg);
				background-size: contain;
				background-position: center center;
				background-repeat: no-repeat;
				background-color: map-get($colors,Strong Cyan);
			 }
			 ...
		}
  ```
  And that did have the change of color before the thumb, but the thumb image is not visible and the part after the 
  thumb is black by browser default due to accessbility reasons.  So this was not workable code.
  I then finally tried with the JS code in the same stackoverflow post and that worked.
  I know you're supposed to keep styling and functionality separate , but in this case with the function names it is obviously for styling.
- When it came to the different shades of slider track , when the user is moving the slider , or when the slider is in a certain position, it 
  was a bit uncertain what the idea was in the design. 
  Was it the idea that the slider track was blue before the thumb everytime the slider is moved/paused, 
  or was it the idea that the slider track is light gray when moving and blue when immobile?
  My section of code for the first scenario:
  ```
      const slider = document.getElementById("views");
      const min = slider.min;
      const max = slider.max;
      const value = slider.value;
	  slider.style.background = `linear-gradient(to right, cyan 0%, cyan ${(value-min)/(max-min)*100}%, #DEE2E6 ${(value-min)/(max-min)*100}%, #DEE2E6 100%)`;
	  
	  slider.oninput = function() {
		  //dragging  		  
          this.style.background = `linear-gradient(to right, cyan 0%, cyan ${(this.value-this.min)/(this.max-this.min)*100}%, #DEE2E6 ${(this.value-this.min)/(this.max-this.min)*100}%, #DEE2E6 100%)`;
	      this.style.cursor='grabbing';
	  };
  ```
  I went with the second scenario in my code. 
- The next tricky issue was the changing color for the svg rects when sliding the slider.
  As I had to use the `::-webkit-slider-thumb` to change the appearance of the input slider, I did not 
  see a way to use the SVG image with the input slider (and alter the rect selector in scss). I did manage to apply a css contrast filter function to make the difference in 
  colors for the rect obvious when sliding vs when not sliding.
  ```
    &:not(:active){
	   filter: contrast(200%);
	}
  ```
- I could not change the button color with this code : `@include bg-color(darken(map-get($colors,Dark Desaturated Blue),4),nth($fallback-colors,11));`
  When I removed the map-get part and replaced it with the hsl value only it worked, I've applied this code before and then it worked, I'm unsure why it didn't now.
  It was the same when I tried to use `@include font-color(grayscale(map-get($colors,Dark Desaturated Blue)),nth($fallback-colors,11));` 
- I also made sure to focus on slider/toggle accessibility. 

### Continued development

- Daily tutorials and projects in HTML5, CSS3, Javascript, Bootstrap, Sass/SCSS, some jQuery. For now, in time I will go re-learn React ect.

###useful-resources

[How to style html5 range to have different color before/after thumb](https://stackoverflow.com/questions/18389224/how-to-style-html5-range-input-to-have-different-color-before-and-after-slider)

## Author

- Website - [One of my latest codepens](https://codepen.io/cynthiab72/pen/oNybYON)
- Frontend Mentor - [@cmb347827](https://www.frontendmentor.io/profile/cmb347827)
