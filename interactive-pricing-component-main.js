'use strict'; 

const colors ={
	'Almost White': 'hsl(0, 0%, 98%)',
	'Lighter Gray': 'hsl(11, 2%, 95%)',
	'Overlay': 'hsla(8, 24%, 2%, 0.5)',
	'Strong Cyan': 'hsl(174, 86%, 45%)',
	'Light Grayish Blue': 'hsl(223, 50%, 87%)',
};
const priceViews = {'10':7,'20':8,'30':9,'40':10,'50':11,'60':12,
 '70':13,'80':14,'90':15,'100':16,'110':17,'120':18,'130':19,'140':20,
 '150':21,'160':22,'170':23,'180':24,'190':25,'200':26,'210':27,'220':28,
'230':29,'240':30,'250':31};

$(window).resize(function(){
	location.reload();
});
const onChange = (selector, handler) => {
  document.querySelector(selector).addEventListener('change', handler);
};


const updatePrice =(selectorSlider,selectorDisplay,selectorPrice)=>{
	//updates the visual price at the top of the form when the user slides the slider
	const sliderValue= document.querySelector(selectorSlider).value;
	const pageViews = document.querySelector(selectorDisplay);
	const price = document.querySelector(selectorPrice);
	for(const views in priceViews) {
	   if(sliderValue === views){
		   if(document.querySelector('#monthly').checked){
		      pageViews.innerText = `${views}K`;
		      price.innerText=`$${priceViews[views]}.00`;
		   }else if(document.querySelector('#annual').checked){
              pageViews.innerText = `${views}K`;
		      price.innerText=`$${priceViews[views] * 12 * 0.75}.00`;			  
		   }
	   }
    };
};
const whichPeriod =(selectorMonth,selectorYear,displayIt)=>{
	const month= document.querySelector(selectorMonth);
	const year= document.querySelector(selectorYear);
	const where = document.querySelector(displayIt);
	if(month.checked){
		where.innerText = 'Month';
	}else if(year.checked){
		where.innerText = 'Year';
		
		/*let valueArray = Object.values(priceViews);
		let total = valueArray.reduce(function(subtotal,value){
			 return subtotal + value;
		});
		console.log(total);*/
		
	}
};

const sliderStyling = ()=>{
	//adds the color before the thumb as the user slides the slider
	const slider = document.getElementById("views");
    const min = slider.min;
    const max = slider.max;
    const value = slider.value;
	//slider.style.background = `linear-gradient(to right, cyan 0%, cyan ${(value-min)/(max-min)*100}%, #DEE2E6 ${(value-min)/(max-min)*100}%, #DEE2E6 100%)`;
	slider.onchange = function(){
	   this.style.background = `linear-gradient(to right, cyan 0%, cyan ${(this.value-min)/(this.max-min)*100}%, #DEE2E6 ${(this.value-min)/(this.max-min)*100}%, #DEE2E6 100%)`;
	   this.style.cursor = 'pointer';
	};
	slider.oninput = function() {
	   //drag,apply cursor  		  
       //this.style.background = `linear-gradient(to right, cyan 0%, cyan ${(this.value-this.min)/(this.max-this.min)*100}%, #DEE2E6 ${(this.value-this.min)/(this.max-this.min)*100}%, #DEE2E6 100%)`;
	   this.style.cursor='grabbing';
	};
}
const toggleStyling =()=>{
	$('input[type="radio"]').on('mouseover',function(){
		this.style.cursor='pointer';
		$('.toggle__wrapper').css('backgroundColor','Cyan');
	});
    $('input[type="radio"]').on('mouseout',function(){
		$('.toggle__wrapper').css('backgroundColor',colors['Light Grayish Blue']);
	});
	$('input[type="radio"]').on('focus',function(){
		$('.toggle__wrapper').css('border','2px solid orange');
	});
	$('input[type="radio"]').on('focusout',function(){
		$('.toggle__wrapper').css('border','0');
	});
}

$(window).on('load',function(){
	  sliderStyling();
	  toggleStyling();
      const width = window.innerWidth;
	  if(width <= 1439){
	    updatePrice('#views','#pageviews','#mobile-price');
	    whichPeriod('#monthly','#annual','#mobile-monthyear');
	 
	    onChange('#views',function() {
          updatePrice('#views','#pageviews','#mobile-price');
        }, false);
	    onChange('.toggle',function(){
		  whichPeriod('#monthly','#annual','#mobile-monthyear');
		  updatePrice('#views','#pageviews','#mobile-price');
	    },false);
	  } else{
		 updatePrice('#views','#pageviews','#desktop-price');
	    whichPeriod('#monthly','#annual','#desktop-monthyear');
	 
	    onChange('#views',function() {
          updatePrice('#views','#pageviews','#desktop-price');
        }, false);
	    onChange('.toggle',function(){
		  whichPeriod('#monthly','#annual','#desktop-monthyear');
		  updatePrice('#views','#pageviews','#desktop-price');
	    },false);
	  }
});


