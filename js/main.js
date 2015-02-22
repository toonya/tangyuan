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
			$left.removeClass('animated');
			clearTimeout(timeL);
			$score.text(score++);

			setTimeout(function(){
				$left.addClass('animated');
				init(timeL, $left);
			}, 50)
		})

		$('.game-box .ctr-r').on('touchstart.CTY', function(){
			$right.removeClass('animated');
			clearTimeout(timeR);
			$score.text(score++);

			setTimeout(function(){
				$right.addClass('animated');
				init(timeR, $right);
			}, 50)
		})

		var init = function(timer, target) {
			timer = setTimeout(function(){
				target.removeClass('animated');
			}, 50)
		}
	}

	eat();
})
