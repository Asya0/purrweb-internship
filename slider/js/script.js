let slider = document.getElementById('slider'),
	sliderItems = document.getElementById('slides'),
	prev = document.getElementById('prev'),
	next = document.getElementById('next'),
	dots = document.querySelectorAll('.dot-item');

function slide(wrapper, items, prev, next, animationTime) {
	let posInitial,
		slides = items.getElementsByClassName('slider-item'),
		slidesLength = slides.length,
		slideSize = items.getElementsByClassName('slider-item')[0].offsetWidth,
		firstSlide = slides[0],
		lastSlide = slides[slidesLength - 1],
		cloneFirst = firstSlide.cloneNode(true),
		cloneLast = lastSlide.cloneNode(true),
		index = 0,
		allowMove = true,
		autoPlayTime = animationTime ? animationTime : 5000;

	// Clone first and last slide
	cloneFirst.classList.add('cloned');
	cloneLast.classList.add('cloned');
	items.appendChild(cloneFirst);
	items.insertBefore(cloneLast, firstSlide);
	wrapper.classList.add('loaded');

	// Click events
	prev.addEventListener('click', function () {
		moveSlide('prev');
	});
	next.addEventListener('click', function () {
		moveSlide('next');
	});
	dots.forEach((dot, i) => {
		dot.addEventListener('click', () => {
			moveSlide('dots', i);
		})
	});

	let playAutoId = setTimeout(function playAuto() {
		moveSlide('next');
		playAutoId = setTimeout(playAuto, autoPlayTime);
	}, autoPlayTime);

	// Transition events
	items.addEventListener('transitionend', checkIndex);

	function moveSlide(action, i) {
	
		items.classList.add('sliding');

		if (allowMove) {

			posInitial = items.offsetLeft;

			dots.forEach((dot, dotIndex) => {
				dots[dotIndex].classList.remove('active');
			});

			if (action == 'next') {
				items.style.left = (posInitial - slideSize) + "px";
				index++;
			} else if (action == 'prev') {
				items.style.left = (posInitial + slideSize) + "px";
				index--;
			} else if (action == 'dots') {
				index = i;
				items.style.left = -((i + 1) * slideSize) + "px";
			}

			if (index != -1 && index != slidesLength) {
				dots[index].classList.add('active');
			}

		}

		allowMove = false;
		clearTimeout(playAutoId)
	}

	function checkIndex() {
		items.classList.remove('sliding');

		if (index == -1) {
			items.style.left = -(slidesLength * slideSize) + "px";
			index = slidesLength - 1;
		}

		if (index == slidesLength) {
			items.style.left = -(1 * slideSize) + "px";
			index = 0;
		}

		if (index == 0) {
			dots[0].classList.add('active');
		}

		if (index == slidesLength - 1) {
			dots[slidesLength - 1].classList.add('active');
		}

		allowMove = true;
	}
	
}

slide(slider, sliderItems, prev, next, 3000);
