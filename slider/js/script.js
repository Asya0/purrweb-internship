let slider = document.getElementById('slider'),
    sliderItems = document.getElementById('slides'),
    prev = document.getElementById('prev'),
    next = document.getElementById('next'),
    dots = document.querySelectorAll('.dots-item');

function slide(wrapper, items, prev, next) {
    let posInitial,
        slides = items.getElementsByClassName('slider-item'),
        slidesLength = slides.length,
        slideSize = items.getElementsByClassName('slider-item')[0].offsetWidth,
        firstSlide = slides[0],
        lastSlide = slides[slidesLength - 1],
        cloneFirst = firstSlide.cloneNode(true),
        cloneLast = lastSlide.cloneNode(true),
        index = 0,
        allowShift = true;

    // Clone first and last slide
    items.appendChild(cloneFirst);
    items.insertBefore(cloneLast, firstSlide);
    wrapper.classList.add('loaded');

    // Click events
    prev.addEventListener('click', function () { shiftSlide(-1) });
    next.addEventListener('click', function () { shiftSlide(1) });
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            if(i == 0) {
                i++;
            }
            if(i == dots.length) {
                i--;
            }
            // index = i;
            shiftSlide(0, i);
        })
    });

    // Transition events
    items.addEventListener('transitionend', checkIndex);

    function shiftSlide(dir, i) {
        items.classList.add('shifting');
      
        if (allowShift) {
            posInitial = items.offsetLeft;
            dots.forEach((dot, dotIndex) => {
                dots[dotIndex].classList.remove('active');
            });
            if (dir == 1) {
                items.style.left = (posInitial - slideSize) + "px";
                dots[index].classList.add('active');
                index++;
            } else if (dir == -1) {
                items.style.left = (posInitial + slideSize) + "px";
                dots[index].classList.add('active');
                index--;
            } else if(dir == 0) {
                items.style.left = -(i * slideSize) + "px";
                dots[i].classList.add('active');
                index = i;
            }
           
        };

        allowShift = false;
    }

    function checkIndex() {
        items.classList.remove('shifting');

        if (index == -1) {
            items.style.left = -(slidesLength * slideSize) + "px";
            index = slidesLength - 1;
        }

        if (index == slidesLength) {
            items.style.left = -(1 * slideSize) + "px";
            index = 0;
        }
        if(index == 0) {
            dots[0].classList.add('active');
        }
        if(index == slidesLength - 1) {
            dots[slidesLength - 1].classList.add('active');
        }

        console.log(index);

        allowShift = true;
    }
    
}

slide(slider, sliderItems, prev, next);