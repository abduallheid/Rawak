 AOS.init({
 	duration: 800,
 	easing: 'slide'
 });

(function($) {

	"use strict";

	$(window).stellar({
    responsive: true,
    parallaxBackgrounds: true,
    parallaxElements: true,
    horizontalScrolling: false,
    hideDistantElements: false,
    scrollProperty: 'scroll'
  });


	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	// loader
	var loader = function() {
		setTimeout(function() { 
			if($('#ftco-loader').length > 0) {
				$('#ftco-loader').removeClass('show');
			}
		}, 1);
	};
	loader();

	// Scrollax
   $.Scrollax();



   // Burger Menu
	var burgerMenu = function() {

		$('body').on('click', '.js-fh5co-nav-toggle', function(event){

			event.preventDefault();

			if ( $('#ftco-nav').is(':visible') ) {
				$(this).removeClass('active');
			} else {
				$(this).addClass('active');	
			}

			
			
		});

	};
	burgerMenu();


	var onePageClick = function() {


		$(document).on('click', '#ftco-nav a[href^="#"]', function (event) {
	    event.preventDefault();

	    var href = $.attr(this, 'href');

	    $('html, body').animate({
	        scrollTop: $($.attr(this, 'href')).offset().top - 70
	    }, 500, function() {
	    	// window.location.hash = href;
	    });
		});

	};

	onePageClick();
	

	var carousel = function() {
		$('.home-slider').owlCarousel({
	    loop:true,
	    autoplay: true,
	    margin:0,
	    animateOut: 'fadeOut',
	    animateIn: 'fadeIn',
	    nav:false,
	    autoplayHoverPause: false,
	    items: 1,
	    navText : ["<span class='ion-md-arrow-back'></span>","<span class='ion-chevron-right'></span>"],
	    responsive:{
	      0:{
	        items:1
	      },
	      600:{
	        items:1
	      },
	      1000:{
	        items:1
	      }
	    }
		});
	};
	carousel();

	$('nav .dropdown').hover(function(){
		var $this = $(this);
		// 	 timer;
		// clearTimeout(timer);
		$this.addClass('show');
		$this.find('> a').attr('aria-expanded', true);
		// $this.find('.dropdown-menu').addClass('animated-fast fadeInUp show');
		$this.find('.dropdown-menu').addClass('show');
	}, function(){
		var $this = $(this);
			// timer;
		// timer = setTimeout(function(){
			$this.removeClass('show');
			$this.find('> a').attr('aria-expanded', false);
			// $this.find('.dropdown-menu').removeClass('animated-fast fadeInUp show');
			$this.find('.dropdown-menu').removeClass('show');
		// }, 100);
	});


	$('#dropdown04').on('show.bs.dropdown', function () {
	  console.log('show');
	});

	// scroll
	var scrollWindow = function() {
		$(window).scroll(function(){
			var $w = $(this),
					st = $w.scrollTop(),
					navbar = $('.ftco_navbar'),
					sd = $('.js-scroll-wrap');

			if (st > 150) {
				if ( !navbar.hasClass('scrolled') ) {
					navbar.addClass('scrolled');	
				}
			} 
			if (st < 150) {
				if ( navbar.hasClass('scrolled') ) {
					navbar.removeClass('scrolled sleep');
				}
			} 
			if ( st > 350 ) {
				if ( !navbar.hasClass('awake') ) {
					navbar.addClass('awake');	
				}
				
				if(sd.length > 0) {
					sd.addClass('sleep');
				}
			}
			if ( st < 350 ) {
				if ( navbar.hasClass('awake') ) {
					navbar.removeClass('awake');
					navbar.addClass('sleep');
				}
				if(sd.length > 0) {
					sd.removeClass('sleep');
				}
			}
		});
	};
	scrollWindow();

	

	var counter = function() {
		
		$('#section-counter, .hero-wrap, .ftco-counter, .ftco-about').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {

				var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
				$('.number').each(function(){
					var $this = $(this),
						num = $this.data('number');
						console.log(num);
					$this.animateNumber(
					  {
					    number: num,
					    numberStep: comma_separator_number_step
					  }, 7000
					);
				});
				
			}

		} , { offset: '95%' } );

	}
	counter();


	var contentWayPoint = function() {
		var i = 0;
		$('.ftco-animate').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .ftco-animate.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn ftco-animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft ftco-animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight ftco-animated');
							} else {
								el.addClass('fadeInUp ftco-animated');
							}
							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '95%' } );
	};
	contentWayPoint();

	// magnific popup
	$('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
     gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300 // don't foget to change the duration also in CSS
    }
  });

  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false
  });

	// Project Details Modal handling
	$('.project').css('cursor', 'pointer');
	$('.project').on('click', function(e) {
		// Prevent modal if clicking on "Go to App" or "Go to Project" button directly
		if ($(e.target).hasClass('btn') || $(e.target).closest('.btn').length > 0) {
			return; // let it navigate
		}
		e.preventDefault();
		
		var githubLink = $(this).find('h3 a').attr('href');
		var title = $(this).find('h3').text();
		
		if (githubLink && githubLink.includes('github.com')) {
			var urlParts = githubLink.split('github.com/');
			if (urlParts.length > 1) {
				var repoPath = urlParts[1].replace(/\/$/, ''); // Remove trailing slash if any
				var parts = repoPath.split('/');
				if (parts.length >= 2) {
					var owner = parts[0];
					var repo = parts[1];
					
					$('#projectDetailsModalLabel').text(title);
					$('#projectDetailsGithubLink').attr('href', githubLink);
					$('#projectDetailsContent').empty();
					$('#projectDetailsLoader').show();
					$('#projectDetailsModal').modal('show');
					
					$.ajax({
						url: 'https://api.github.com/repos/' + owner + '/' + repo + '/readme',
						headers: {
							'Accept': 'application/vnd.github.v3.html'
						},
						success: function(data) {
							$('#projectDetailsLoader').hide();
							$('#projectDetailsContent').html(data);
							
							// Format images inside markdown so they don't overflow
							$('#projectDetailsContent img').css({
								'max-width': '100%',
								'height': 'auto'
							});
						},
						error: function() {
							$('#projectDetailsLoader').hide();
							$('#projectDetailsContent').html('<p class="text-danger">Failed to load project details from GitHub. The repository might not have a README or the API rate limit was exceeded.</p>');
						}
					});
				} else {
					window.open(githubLink, '_blank');
				}
			} else {
				window.open(githubLink, '_blank');
			}
		} else if (githubLink) {
			window.open(githubLink, '_blank');
		}
	});

	// Services Details Modal handling
	var serviceDetails = {
		'Data Analysis': {
			brief: 'Data analysis involves inspecting, cleansing, transforming, and modeling data with the goal of discovering useful information, informing conclusions, and supporting decision-making. We employ advanced statistical tools and methodologies to turn raw data into actionable business strategies.',
			image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80'
		},
		'Predictive Modeling': {
			brief: 'Predictive modeling uses statistical techniques and machine learning algorithms to predict future outcomes based on historical data. By identifying patterns and trends, we help businesses forecast customer behavior, sales, and market shifts with high accuracy.',
			image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&q=80'
		},
		'Data Visualization': {
			brief: 'Data visualization is the graphical representation of information and data. By using visual elements like charts, graphs, and maps, data visualization tools provide an accessible way to see and understand trends, outliers, and patterns in data.',
			image: 'https://images.unsplash.com/photo-1543286386-2e659306cd6c?w=800&q=80'
		},
		'Data Cleaning and Preprocessing': {
			brief: 'Data cleaning is the process of fixing or removing incorrect, corrupted, incorrectly formatted, duplicate, or incomplete data within a dataset. Preprocessing transforms raw data into an understandable format, which is a crucial step before applying machine learning models.',
			image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80'
		},
		'Feature Engineering': {
			brief: 'Feature engineering is the process of using domain knowledge to extract features from raw data via data mining techniques. These features can be used to improve the performance of machine learning algorithms.',
			image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80'
		},
		'Exploratory Data Analysis (EDA)': {
			brief: 'EDA is an approach to analyzing data sets to summarize their main characteristics, often with visual methods. It helps determine how best to manipulate data sources to get the answers you need, making it easier to discover patterns, spot anomalies, and test hypotheses.',
			image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80'
		},
		'A/B Testing': {
			brief: 'A/B testing is a user experience research methodology. It consists of a randomized experiment with two variants, A and B. It includes application of statistical hypothesis testing or "two-sample hypothesis testing" to determine which variant performs better for a given conversion goal.',
			image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80'
		},
		'Model Evaluation and Validation': {
			brief: 'Model evaluation involves using various metrics to understand a machine learning model\'s performance, as well as its strengths and weaknesses. Validation ensures that the model generalizes well to new, unseen data, preventing overfitting.',
			image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80'
		},
		'Deployment of Models': {
			brief: 'Model deployment is the process of putting machine learning models into production so that they can provide real-time or batch predictions. We ensure models are scalable, reliable, and integrated seamlessly into your existing infrastructure.',
			image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80'
		}
	};

	$('.services-1').css('cursor', 'pointer');
	$('.services-1').on('click', function(e) {
		e.preventDefault();
		var title = $(this).find('h3').text().trim();
		var details = serviceDetails[title];
		
		if (details) {
			$('#serviceDetailsModalLabel').text(title);
			$('#serviceDetailsBrief').text(details.brief);
			$('#serviceDetailsImage').attr('src', details.image).show();
			$('#serviceDetailsModal').modal('show');
		}
	});

})(jQuery);

