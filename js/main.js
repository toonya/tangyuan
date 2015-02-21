$(function() {

	"use strict";

	// ----------------------------------------
	// ! scroll
	// ----------------------------------------
	$('body.static').on('touchmove', function (event) {
	    event.preventDefault();
	});

	// ----------------------------------------
	// ! share
	// ----------------------------------------
	$("[data-toggle]").on('click', function(e){
		e.preventDefault();

		$($(this).data('toggle')).toggleClass('hide');
	})	

	$('.mb-modal').on('click', function(e){
		$(this).addClass('hide');
	})

	// ----------------------------------------
	// ! eat
	// ----------------------------------------
	var eat = function() {
		var $left = $('.spoon-l'),
			$right = $('.spoon-r'),
			timeL, timeR;

		$('.game-box .ctr-l').on('touchstart', function(){
			$left.removeClass('animated');
			clearTimeout(timeL);

			setTimeout(function(){
				$left.addClass('animated');
				init(timeL, $left);
			}, 100)
		})

		$('.game-box .ctr-r').on('touchstart', function(){
			$right.removeClass('animated');
			clearTimeout(timeR);

			setTimeout(function(){
				$right.addClass('animated');
				init(timeR, $right);
			}, 100)
		})

		var init = function(timer, target) {
			timer = setTimeout(function(){
				target.removeClass('animated');
			}, 500)
		}
	}

	eat();
})
