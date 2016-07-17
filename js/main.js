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

		var $fish = $('.center-obj .fish'),
		$crab = $('.center-obj .crab'),
		$shrimp = $('.center-obj .shrimp'),
		$score = $('.score'),
		t = $('.game-box').data('totleTime'),
		score = 0,
		timeL, timeR;

		$('.progress .progress-bar')
		.on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(){
			$('.game-box .ctr-l').off('touchstart.CTY');
			$('.game-box .ctr-r').off('touchstart.CTY');
			$fish.removeClass('animated');
			$crab.removeClass('animated');
			$shrimp.removeClass('animated');

			$('.game-box').trigger('gameover', score);
		});

		var getRandomAnimal = function () {
			var range = Math.floor( Math.random() * 100 ) + 1,
			animal = null;

			$.each( gameOptions.gameAnimals, function (i, _animal) {
				if ( _animal.range[0] <= range && range <= _animal.range[1] ) {
					animal = _animal;
				}
			} )
			console.log(range);
			return animal;
		}

		var bindDom = function () {
			$.each( gameOptions.gameAnimals, function (i, _animal) {
				switch (_animal.name) {
					case 'fish':
					_animal.dom = $fish;
					break;
					case 'crab':
					_animal.dom = $crab;
					break;
					case 'shrimp':
					_animal.dom = $shrimp;
					break;
					default:
					break;
				}
			} )
		}

		var game_touch = function () {
			var animal = getRandomAnimal();
			console.log(animal);
			score = score + animal.score/1;
			$score.text(score);

			animal.dom.addClass('animated');

			setTimeout(function(){
				animal.dom.removeClass('animated');
			}, 100)
		}

		var start = function () {
			// .css 代码和 .on touchstart代码
			$('.daojishi-layer').remove();
			$('.progress .progress-bar').addClass('animated');
			// .css({
			// 	'-webkit-animation-duration': t+'s',
			// 	'animation-duration': t+'s',
			// })

			$('.game-box .ctr-l').on('touchstart.CTY', function(){
				game_touch();
			})

			$('.game-box .ctr-r').on('touchstart.CTY', function(){
				game_touch();
			})
		}

		var countdown = 4;
		var daojishi = function(){
			countdown--;
			if(countdown<1) {
				bindDom();
				start();
				console.log(gameOptions);
				return;
			}
			$("#countdown").text(countdown);
			setTimeout(function(){
				//
				daojishi();
			}, 1000)
		}

		daojishi();

		// var init = function(timer, target) {
		// 	timer = setTimeout(function(){
		// 		target.removeClass('animated');
		// 	}, 50)
		// }
	}

	eat();
})
