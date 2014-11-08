var offalApp = {};

// WHERE TO APPEND SEARCH RESULTS 
offalApp.searchResults = $('.results').find('ul');

// YUMMLY API AUTHORIZATION INFO
offalApp.apiId = '14f4d8e5';
offalApp.apiKey = '5e222f130215043a2133fcb7e77788b6';

// INIT
offalApp.init = function(){	
	offalApp.filterParts(); // FILTER OFFAL OPTIONS DEPENDING ON ANIMAL SELECTED
	// WHEN SEARCH BUTTON IS CLICKED...
	$('#searchButton').on('click', function(e){
		e.preventDefault();
		$('#results').fadeIn(400); // SEARCH RESULTS FADE IN
		var selectedAnimal = offalApp.getAnimal(); // FIND AND STORE SELECTED ANIMAL
		var selectedPart = offalApp.getPart(); // FIND AND STORE SELECTED OFFAL

		if (selectedAnimal && selectedPart){ // IF USER SELECTED AN ANIMAL AND OFFAL
			offalApp.searchResults.empty(); 
			offalApp.getSearchResults(selectedAnimal, selectedPart);
			// GET RID OF ANY PREVIOUS ALERT MESSAGES
			$('#chooseAnimal').css('border','none').find('h2').text('Step 1: Choose an Animal').removeClass('alert').remove('i.fa-exclamation-circle');
			$('#choosePart').css('border','none').find('h2').text('Step 2: Pick your offal').removeClass('alert').remove('i.fa-exclamation-circle');
			// DISABLE ANY CURRENT FILTERS
			$('button.rated, button.quickest, button.meaty').removeClass('currentFilter');
			// SHOW ALL RESULTS
			$('button.all').addClass('currentFilter');
			// SCROLL TO SEARCH RESULTS
			$.smoothScroll({
					scrollTarget: '#results',
					speed: 800,
				});
			// FILTERS LIST BECOMES FIXED
			$(document).scroll(function(){
				var y = $(this).scrollTop();
				var x = $('#results').position();
				if (y > (x.top - 50)) {
					$('#filters').addClass('fixed');
				}else{
					$('#filters').removeClass('fixed');
				}
			});
			
		 // IF USER SELECTS ANIMAL BUT NOT OFFAL
		}else if (selectedAnimal && !selectedPart) {
			// ALERT MESSAGE
			$('#choosePart').css('border','5px solid #a50000').find('h2').text('Don\'t forget the offal').addClass('alert').prepend($('<i class="fa fa-exclamation-circle"></i>').addClass('alert').css({'position': 'relative','left':'-20px'}));
			// SCROLL TO OFFAL OPTIONS
			$.smoothScroll({
				scrollTarget: '#choosePart',
				speed: 400,
				offset: -20
			});
			// KEEP SEARCH RESULTS SECTION HIDDEN
			$('#results').hide();
		}else {
			// IF USER CHOSE NEITHER AN ANIMAL NOR OFFAL, SHOW ALERT MESSAGE
			$('#chooseAnimal').css('border','5px solid #a50000').find('h2').text('Choose an animal').addClass('alert').prepend($('<i class="fa fa-exclamation-circle"></i>').addClass('alert').css({'position': 'relative','left':'-20px'}));
			// SCROLL TO ANIMAL OPTIONS
			$.smoothScroll({
				scrollTarget: '#chooseAnimal',
				speed: 400,
				offset: -20
			});
			// KEEP SEARCH RESULTS SECTION HIDDEN
			$('#results').hide();
		}
	});
	
};

// RADIO BUTTON CONTROLS: Change offal options depending on animal selected
offalApp.filterParts = function(){
	
	$('input[value=chicken]').on('click', function(){
		$('.choosePart').find('label, input, p').css('display','none');
		$('label.heart, label.liver, label.feet, label.gizzard').css({'display':'block', 'width': '21%'});
		$.smoothScroll({
			scrollTarget: '#choosePart',
			speed: 900,
		});
	});
	$('input[value=beef]').on('click', function(){
		$('.choosePart').find('label, input, p').css('display','none');
		$('label.liver, label.tripe, label.marrow').css({'display':'block', 'width': '29.3333%'});
		$.smoothScroll({
			scrollTarget: '#choosePart',
			speed: 900,
		});
	});
	$('input[value=lamb]').on('click', function(){
		$('.choosePart').find('label, input, p').css('display','none');
		$('label.liver, label.brain').css({'display':'block', 'width': '46%'});
		$.smoothScroll({
			scrollTarget: '#choosePart',
			speed: 900,
		});
	});
	$('input[value=pig]').on('click', function(){
		$('.choosePart').find('label, input, p').css('display','none');
		$('label.tail, label.feet, label.ear').css({'display':'block', 'width': '29.3333%'});
		$.smoothScroll({
			scrollTarget: '#choosePart',
			speed: 900,
		});
	});
};

// RETRIEVE THE USER'S CHOICES
// 1) Which animal was selected?
	offalApp.getAnimal = function(){
		var selectedAnimal = $('fieldset#chooseAnimal').find(':checked').val();
			console.log(selectedAnimal);
			return selectedAnimal;	
	};
	// 2) Which body part was selected?
	offalApp.getPart = function(){
			var selectedPart = $('fieldset#choosePart').find(':checked').val();
			console.log(selectedPart);
			return selectedPart;
	};

// GET RECIPES
offalApp.getSearchResults = function(animal, part){
	var query = '';
	var ingredient = '';
	if(animal=='lamb'&&part=='brain'){
		$.ajax({
		url: 'https://api.yummly.com/v1/api/recipes',
		type: 'GET',
		dataType: 'jsonp',
		data: {
			format: 'jsonp',
			_app_id: offalApp.apiId,
			_app_key: offalApp.apiKey,
			// SEARCH PHRASE
			q: 'lamb brain'
		},
		success: function(result){
			console.log(result);
			offalApp.displaySearchResults(result.matches);
		}
	});
	}else if (animal=='beef'&&part=='tripe'){
		$.ajax({
		url: 'https://api.yummly.com/v1/api/recipes',
		type: 'GET',
		dataType: 'jsonp',
		data: {
			format: 'jsonp',
			_app_id: offalApp.apiId,
			_app_key: offalApp.apiKey,
			// SEARCH PHRASE
			q: 'beef tripe'
		},
		success: function(result){
			console.log(result);
			offalApp.displaySearchResults(result.matches);

		}
	});
	}else if (animal=='beef'&&part=='marrow'){
		$.ajax({
		url: 'https://api.yummly.com/v1/api/recipes',
		type: 'GET',
		dataType: 'jsonp',
		data: {
			format: 'jsonp',
			_app_id: offalApp.apiId,
			_app_key: offalApp.apiKey,
			// SEARCH PHRASE
			q: 'beef marrow'
		},
		success: function(result){
			console.log(result);
			offalApp.displaySearchResults(result.matches);
		}
	});
	}else{
	$.ajax({
		url: 'https://api.yummly.com/v1/api/recipes',
		type: 'GET',
		dataType: 'jsonp',
		data: {
			format: 'jsonp',
			_app_id: offalApp.apiId,
			_app_key: offalApp.apiKey,
			// SEARCH PHRASE
			q: animal+'+'+part,
			// // RECIPES MUST HAVE THIS INGREDIENT
			allowedIngredient: animal+' '+part
		},
		success: function(result, recipeID){
			console.log(result);
			offalApp.searchResults.empty();
			offalApp.displaySearchResults(result.matches);
		}
	});
};
	};

// UPDATE DOM
offalApp.displaySearchResults = function(result){
	
	$.each(result, function(i,item){	
		// RETRIEVE AND STORE RECIPE ID (REQUIRED FOR URL AND SECOND ENDPOINT)
		var recipeID = item.id; 

		// CREATE HTML ELEMENTS 
		var recipeName = $('<h3>').text(item.recipeName);
		console.log(item.recipeName);
		var recipeSource = $('<h4>').text('Recipe from '+item.sourceDisplayName);
		console.log(item.sourceDisplayName);
		var recipeRating = $('<h5>').text('Rating: '+item.rating+'/5');
		console.log(item.rating);	

		// CALCULATE AND DISPLAY TOTAL TIME
		var totalSeconds = item.totalTimeInSeconds;
		if (totalSeconds/60 > 100){
			var recipeTime =  $('<h5>').text('Ready in '+Math.round((totalSeconds/60)/60)+' hours');
		}else if(totalSeconds/60==0){
			var recipeTime = '';
		}else{
			var recipeTime =  $('<h5>').text('Ready in '+totalSeconds/60+' minutes');
		}
		console.log(recipeTime);

		// CREATE ANCHOR TAG FOR INDIVIDUAL RECIPES
		var recipeURL = $('<a>').attr({'href':'http://www.yummly.com/recipe/'+recipeID, 'target':'_blank'});
	
		// RETRIEVE "MEATY" INDEX OF RECIPE
		var flavors = item.flavors;
		if (item.flavors) {
			var recipeMeaty = item.flavors['meaty']
		};
	
		// APPEND METHODS
		// 1) Append recipe name and source to span.primary
		var primaryDetails = $('<span>').addClass('primary').append(recipeName, recipeSource);
		// 2) Append recipe time and rating to span.secondary
		var secondaryDetails = $('<span>').addClass('secondary').append( recipeTime, recipeRating);
		// 3) HACK ALERT: Remove default sizing on thumbnail image if provided by API
		if (item.hasOwnProperty('smallImageUrls')){
			var imgSrc = item.smallImageUrls.toString().replace('=s90', ''); 
			console.log(imgSrc);
			var recipeImage = $('<img>').attr('src', imgSrc);
		// 3.a) If the recipe does not come with an image, insert placeholder instead
		} else {
			var recipeImage = $('<img>').attr('src', 'assets/images/noImage.png');
		};
		// 4) Put image in a container that determines its dimensions
		var recipeImageContainer = $('<div>').addClass('recipeImage').append(recipeImage);
		// 5) Nest the image, primary details, and secondar details in the anchor tag
		var recipeDetails = recipeURL.append(recipeImageContainer,primaryDetails, secondaryDetails);
		// 6) Append <a> to <li>
		var recipe = $('<li>').addClass('recipe clearfix').append(recipeDetails);
		// 7) Add information for filters
		// 7.a) Mark recipes with a that are rated at least 4/5
		if (item.rating >= 4) {
			recipe.addClass('highestRated');
		}
		// 7.b) Mark recipes with that take 30 minutes or less to make
		if ((totalSeconds/60) <= 30) {
			recipe.addClass('quick');
		}
		// 7.c) Mark recipes with a "meaty" index that is greater than 0.16666
		if (recipeMeaty>0.1666){
			recipe.addClass('meaty');
		}
		// 5) append <li> to <ul>
		offalApp.searchResults.append(recipe);

	});
	// SHOW THE FOOTER
	$('footer').show();
};


// DOC READY
$(function(){
	// RESET FORMS
	document.forms["userOptions"].reset();
	// CALL INIT
	offalApp.init();

	// HIDE EVERYTHING EXCEPT HEADER

	$('footer').hide();

	var toTop = function(){
		$('html,body').animate({scrollTop:0},800);
	};

	var showOptions = function(){
		$('#userOptions').animate({opacity:'toggle'},1300);
	}
	$('div.resultsBkg').height($(this).innerHeight());
	$('.recipeImage').height($('.recipeImage').width()*0.6666);
	$(window).resize(function(){	
		$('div.resultsBkg').height($(this).innerHeight());
		var w = $('.recipeImage').width();
		$('.recipeImage').height(w*0.6666);
	});

	// SCROLL TO FORM WHEN USER CLICKS "GET RECIPES" BUTTON
	$('#showOptions').on('click', function(){
		$('header').animate({opacity:'toggle'},800,toTop(),showOptions());

	});

	$('#home').on('click',function(e){
		$('#userOptions').animate({opacity:'toggle'},800,toTop());
		$('header').delay(400).fadeIn(800);
		
	});

	$('a#showFilters').on('click', function(){
		$('.filterOptions').slideToggle(500, function(){
			$('i').toggleClass('fa-chevron-up');
			$('i').toggleClass('fa-chevron-down');
		});
	});

	// SEARCH RESULT FILTERS 	
	$('#filters button').on('click', function(e){
		e.preventDefault();
	});
	$('button.rated').on('click', function(e){
		$(this).toggleClass('currentFilter');
		$('.results li:not(.highestRated)').toggle();
		$('button.all').removeClass('currentFilter');
	});
	$('button.quickest').on('click', function(e){
		$(this).toggleClass('currentFilter');
		$('.results li:not(.quick)').toggle();
		$('button.all').removeClass('currentFilter');
	});
	$('button.meaty').on('click', function(e){
		$(this).toggleClass('currentFilter');
		$('.results li:not(.meaty)').toggle();
		$('button.all').removeClass('currentFilter');
	});
	$('button.all').on('click', function(e){
		$(this).toggleClass('currentFilter');
		$('button.rated, button.quickest, button.meaty').removeClass('currentFilter');
		$('.results li').show();
	});
	$('#scrollToFirst').on('click', function(e){
		$.smoothScroll({
			scrollTarget: '#results',
			speed: 600
		});
	});
	$('#newSearch').on('click', function(e){
		$('button.rated, button.quickest, button.meaty').removeClass('currentFilter');
		document.forms["userOptions"].reset();
		$.smoothScroll({
			scrollTarget: '#userOptions',
			speed: 600,
			offset: 130
		});
	});

});


// ----- HOW TO ACCESS SECOND ENDPOINT TO RETRIEVE ADDITIONAL INFO ------
	
// offalApp.getRecipeImage = function(recipeID){
// 	$.ajax({
// 		url: 'http://api.yummly.com/v1/api/recipe/'+recipeID,
// 		type: 'GET',
// 		dataType: 'jsonp',
// 		data: {
// 			format: 'jsonp',
// 			_app_id: offalApp.apiId,
// 			_app_key: offalApp.apiKey
// 		},
// 		success: function(result){
// 			console.log(result);
// 			if (result.images[0].hasOwnProperty('hostedMediumUrl')){
// 				var src = result.images[0]['hostedMediumUrl'];
// 			};
// 			return src;
// 			// return recipeTime;
// 		}
// 	});
// };