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
	// ! form validate
	// ----------------------------------------
	$(document).on('submit', 'form', function(e){
		var pattern = $(this).find('[pattern]'),
			invalid = $(this).find('[pattern]:invalid').not('[dataCancelValid]');

		if( pattern.val() == "" || invalid.size() > 0 ) {
			e.preventDefault();

			pattern.siblings('.text-danger').removeClass("hide");
			invalid.siblings('.text-danger').removeClass("hide");
		}
	})

	// ----------------------------------------
	// ! eat
	// ----------------------------------------
	var eat = function() {

		if( $('.game-box').size() <= 0 ) return;

		var $left = $('.spoon-l'),
			$right = $('.spoon-r'),
			$score = $('.score'),
			t = $('.game-box').data('totleTime'),
			score = 0,
			timeL, timeR;

		$('.progress .progress-bar')
		.css({
			'-webkit-animation-duration': t+'s',
      		'animation-duration': t+'s',
		})
		.on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(){
			$('.game-box .ctr-l').off('touchstart.CTY');
			$('.game-box .ctr-r').off('touchstart.CTY');
			$left.removeClass('animated');
			$right.removeClass('animated');

			$('.game-box').trigger('gameover', score);
		})

		$('.game-box .ctr-l').on('touchstart.CTY', function(){
			$left.addClass('animated');
			$score.text(score++);	

			setTimeout(function(){
				$left.removeClass('animated');
			}, 100)
		})

		$('.game-box .ctr-r').on('touchstart.CTY', function(){
			$right.addClass('animated');
			$score.text(score++);
			
			setTimeout(function(){
				$right.removeClass('animated');
			}, 100)
		})

		// var init = function(timer, target) {
		// 	timer = setTimeout(function(){
		// 		target.removeClass('animated');
		// 	}, 50)
		// }
	}

	eat();
})
