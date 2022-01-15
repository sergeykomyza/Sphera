const contactsPage = window.location.pathname == '/contacts.html'
const body = document.querySelector('body');

if (!body.querySelector('.home')) {
    if (document.documentElement.clientWidth < 992) {
        body.style.padding = '3em 0 0 0';
    }
}

// ================================================== параллакс и слайдер на первом экране
document.addEventListener('DOMContentLoaded', function () {

    if (body.querySelector('.home')) {

        $('.swiper-wrapper').slick({
            fade: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false
        });

        $(".prev").on("click", function () { $('.swiper-wrapper').slick("slickPrev") });
        $(".next").on("click", function () { $('.swiper-wrapper').slick("slickNext") });

        let curSlide = document.querySelector('.slick-active').getAttribute('data-name');
        const prevInnerText = document.querySelector('.prev__name'); // левое поле с подписью
        const nextInnerText = document.querySelector('.next__name'); // правое поле с подписью
        const slides = document.querySelectorAll('.slick-slide'); // перебираем все слайды

        let countCur = document.querySelector('.count__cur'),
            countAll = document.querySelector('.count__all');
        countAll.innerText = slides.length;
        countCur.innerText = parseInt(document.querySelector('.slick-active').getAttribute('data-slick-index')) + 1;

        $(".next").on("click", function () {
            let curSlideIndex = parseInt(document.querySelector('.slick-active').getAttribute('data-slick-index')); // определяем значение атрибута 'data-slick-index' у активного слайда
            let nextSlide = document.querySelector('.slick-active').nextElementSibling; // определяем след. слайд после активного
            let lastSlideIndex = slides.length - 1; // индекс последнего слайда в массиве
            let lastSlide = slides[lastSlideIndex]; // последний слайд
            let firstSlide = slides[0]; // первый слайд

            countCur.innerText = curSlideIndex + 1;
            prevInnerText.innerHTML = curSlide; // в левое поле записываем значение активного слайда которое было до клика
            curSlide = document.querySelector('.slick-active').getAttribute('data-name'); // сразу же обновляем значение
            if (curSlideIndex + 1 > lastSlideIndex) { // вычисляем конец массива слайдов
                nextInnerText.innerHTML = firstSlide.getAttribute('data-name') // если конец, то в правое поле записываем записываем значение первого слайда
            } else {
                nextInnerText.innerHTML = nextSlide.getAttribute('data-name') // иначе записываем значение след. слайда после активного
            }
            countAll.innerText = slides.length;
            countCur.innerText = parseInt(document.querySelector('.slick-active').getAttribute('data-slick-index')) + 1;
        })
        $(".prev").on("click", function () {
            let curSlideIndex = parseInt(document.querySelector('.slick-active').getAttribute('data-slick-index')); // определяем значение атрибута 'data-slick-index' у активного слайда
            let prevSlide = document.querySelector('.slick-active').previousElementSibling; // определяем след. слайд после активного
            let lastSlideIndex = slides.length - 1; // индекс последнего слайда в массиве
            let lastSlide = slides[lastSlideIndex]; // последний слайд
            let firstSlide = slides[0]; // первый слайд

            nextInnerText.innerHTML = curSlide
            curSlide = document.querySelector('.slick-active').getAttribute('data-name'); // сразу же обновляем значение

            if (curSlideIndex == lastSlideIndex) { // вычисляем конец массива слайдов
                prevInnerText.innerHTML = lastSlide.previousElementSibling.getAttribute('data-name')
            } else if (curSlideIndex == 0) {
                prevInnerText.innerHTML = lastSlide.getAttribute('data-name')
            } else {
                prevInnerText.innerHTML = prevSlide.getAttribute('data-name')
            }
            countAll.innerText = slides.length;
            countCur.innerText = parseInt(document.querySelector('.slick-active').getAttribute('data-slick-index')) + 1;
        })
        // /////////////////////////////////////////////////////////////////////////
        // ============================== нижний блок наезжает на первый экран при скролле
        const home = document.querySelector('.home');
        function repaint() {
            requestAnimationFrame(() => {
                let rect = home.getBoundingClientRect()
                home.style.transform = (rect.top < 0 && rect.bottom > 0) ? 'translateY(' + (-rect.top / 2) + 'px)' : ''
            })
        }
        document.addEventListener('scroll', repaint);

    }

})

// ================================================== header
document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('.header');
    if (body.querySelector('.home')) {
        window.addEventListener('scroll', function () {
            window.pageYOffset > 10 ? header.classList.add('header--active') : header.classList.remove('header--active')
        });
    }
    // ============================= mobile menu
    const menu = document.querySelector('.header__menu');
    const gamburger = document.querySelector('.open-menu');
    const firstLine = gamburger.querySelectorAll('span')[0];
    const middleLine = gamburger.querySelectorAll('span')[1];
    const lastLine = gamburger.querySelectorAll('span')[2];
    $(gamburger).on('click', function () {
        $(middleLine).toggleClass('open');
        $(firstLine).toggleClass('open');
        $(lastLine).toggleClass('open');
        $(menu).toggleClass('header__menu--active');
    });
})

// ================================================== animation
document.addEventListener('DOMContentLoaded', function () {

    if (body.querySelector('.home')) {
        window.addEventListener('scroll', function () {
            const aboutImg = document.querySelector('.about__img')
            const scrolling = window.pageYOffset
            if (scrolling > 200) {
                aboutImg.classList.add('animate__fadeInLeft')
                aboutImg.style.opacity = 1
            } else {
                aboutImg.classList.remove('animate__fadeInLeft')
                aboutImg.style.opacity = 0
            }
        })
    } else if (body.querySelector('.about') ) {
        const aboutImg = document.querySelector('.about__img')
        aboutImg.classList.add('animate__fadeInLeft')
        aboutImg.style.opacity = 1
    }

    // ////////////////////////////////////////////////////////////////////

    if (body.querySelector('.home')) {
        window.addEventListener('scroll', function () {
            const sectionPress = document.querySelector('.press')
            const sectionPressTrigger = window.pageYOffset + sectionPress.getBoundingClientRect().top - 700
            const pressItems = document.querySelectorAll('.press__item')
            const scrolling = window.pageYOffset

            if (sectionPressTrigger <= scrolling) {
                let time = 500
                pressItems.forEach(item => {
                    setTimeout(function () {
                        item.classList.add('animate__fadeInLeft')
                        item.style.opacity = 1
                    }, time)
                    time += 300
                })
            } else {
                pressItems.forEach(item => {
                    time = 500
                    item.classList.remove('animate__fadeInLeft')
                    item.style.opacity = 0
                })
            }
        })
    } else if (body.querySelector('.press')) {
        let time = 500
        const pressItems = document.querySelectorAll('.press__item')
        pressItems.forEach(item => {
            setTimeout(function () {
                item.classList.add('animate__fadeInLeft')
                item.style.opacity = 1
            }, time)
            time += 300
        })
    }

    // ///////////////////////////////////////////////////////
    if (!contactsPage) {
        window.addEventListener('scroll', function () {
            const sectionContacts = document.querySelector('.contacts')
            const sectionContactsTrigger = window.pageYOffset + sectionContacts.getBoundingClientRect().top - 700
            const formBlock = document.querySelector('.contacts__form')
            const scrolling = window.pageYOffset
            if (sectionContactsTrigger <= scrolling) {
                formBlock.classList.add('animate__fadeInRight')
                formBlock.style.opacity = 1
            } else {
                formBlock.classList.remove('animate__fadeInRight')
                formBlock.style.opacity = 0
            }
        });
    } else if (contactsPage) {
        const formBlock = document.querySelector('.contacts__form')
        formBlock.classList.add('animate__fadeInRight')
        formBlock.style.opacity = 1
    }

})

// ================================================== article page
document.addEventListener('DOMContentLoaded', function () {
    if (body.querySelector('.article') && document.documentElement.clientWidth > 992) {
        
        window.addEventListener('scroll', function () {
            const articleDate = document.querySelector('.article__date');
            const articleContent = document.querySelector('.article__content');
            const topTrigger = window.pageYOffset + document.querySelector('.article__box').getBoundingClientRect().top;
            const viewportTopBorder = window.pageYOffset;
            if(viewportTopBorder >= 100 && viewportTopBorder <= articleContent.scrollHeight){
                articleDate.classList.add('active');
            } else{
                articleDate.classList.remove('active');
            }
            if(viewportTopBorder >= articleContent.scrollHeight){
                articleDate.classList.add('active-bottom');
            } else{
                articleDate.classList.remove('active-bottom');
            }
        });
    }

});

// ================================================== map
document.addEventListener('DOMContentLoaded', function () {

    ymaps.ready(function () {
        var myMap = new ymaps.Map('map', {
            center: [55.718359, 37.646839],
            zoom: 16
        }, {
            searchControlProvider: 'yandex#search'
        }),
            // Создаём макет содержимого.
            MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
            ),
            myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
                hintContent: 'г. Москва, ул. Дербеневская, 24',
                balloonContent: 'г. Москва, ул. Дербеневская, 24'
            }, {
                iconLayout: 'default#image',
                iconImageSize: [40, 45],
                iconImageOffset: [-5, -38]
            })
        myMap.geoObjects
            .add(myPlacemark)
    })

})



