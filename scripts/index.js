$(document).ready(function () {
    new WOW({
        animateClass: 'animate__animated',
    }).init();

    // Бургер меню
    $('.burger').click(function () {
        $('.burger__menu').css('display', 'flex');
    });

    $('.burger-menu__close').click(function () {
        $('.burger__menu').css('display', 'none');
    });


    // Поп-ап "Заказать звонок"
    $('.menu__btn').click(function () {
        $('.pop-up').css('display', 'flex');
    });

    $('.pop-up__close').click(function () {
        $('.pop-up').css('display', 'none');
    });


    // Погнали "записываться на консультацию" и "Рассчитывать стоимость" в блок с формой
    $('.hero__btn').click(function () {
        $('.consultation')[0].scrollIntoView({behavior: 'smooth'});
    });

    $('.card__btn').click(function () {
        $('.consultation')[0].scrollIntoView({behavior: 'smooth'});
    });


    // Слайдер "Наши молодожены"
    const portfolioSlider = $('.portfolio__slider-photo');
    const portfolioNumber = $('.portfolio__number');
    const portfolioSliderStep = 6;
    const portfolioSlideWidth = 404;
    let currentSlidePortfolio = 0;

    const portfolioSliderPagination = [
        {
            persons: 'Руслан и Людмила',
            digit: '1 /'
        },
        {
            persons: 'Татьяна и Евгений',
            digit: '2 /'
        },
        {
            persons: 'Андрей и Виктория',
            digit: '3 /'
        },
        {
            persons: 'Григорий и Аксинья',
            digit: '4 /'
        },
        {
            persons: 'Чарли и Алиса',
            digit: '5 /'
        },
        {
            persons: 'Дмитрий и Ксения',
            digit: '6 /'
        }
    ];

    function moveSlider(direction) {
        if (direction > 0) {
            currentSlidePortfolio++;
            if (currentSlidePortfolio >= portfolioSliderStep) {
                currentSlidePortfolio = 0;
            }
            updatePortfolioSlider();
        } else {
            currentSlidePortfolio--;
            if (currentSlidePortfolio < 0) {
                currentSlidePortfolio = portfolioSliderStep - 1;
            }
            updatePortfolioSlider();
        }

        portfolioSlider.css('transform', `translateX(${-currentSlidePortfolio * portfolioSlideWidth}px)`);
    }

    $('.portfolio__right').click(function () {
        moveSlider(1);
    });

    $('.portfolio__left').click(function () {
        moveSlider(0);
    });

    function updatePortfolioSlider() {
        portfolioNumber.text(portfolioSliderPagination[currentSlidePortfolio].digit)
    }

    $('.portfolio__slide').on('click', function () {
        $('.slider-container').css('display', 'flex');
    })

    $('.pop-up-slider__close').on('click', function () {
        $('.slider-container').css('display', 'none');
    })


    // Поп-ап "Наши молодожены"
    const popupSlider = $('.big-container');
    const namePerson = $('.name__person');
    const thumbnailsItem = $('.thumbnails__item')
    const popupSliderStep = 6;
    const popupSlideWidth = 692;
    let currentSlidePopup = 0;

    function scrollSlider(step) {
        if (step > 0) {
            currentSlidePopup++;
            if (currentSlidePopup >= popupSliderStep) {
                currentSlidePopup = 0;
            }
            updatePopupSlider(currentSlidePopup);
        } else {
            currentSlidePopup--;
            if (currentSlidePopup < 0) {
                currentSlidePopup = popupSliderStep;
            }
            updatePopupSlider(currentSlidePopup);
        }

        popupSlider.css('transform', `translateX(${-currentSlidePopup * popupSlideWidth}px)`);
    }

    $('.right-arrow-last').click(function () {
        scrollSlider(1);

        let currentActive = $('.thumbnails__item.active');
        let nextItem = currentActive.next('.thumbnails__item');

        if (nextItem.length === 0) {
            nextItem = $('.thumbnails__item:first');
        }

        thumbnailsItem.removeClass('active');
        nextItem.addClass('active');

        let slideNumber = nextItem.attr('number');
        $('.slider__digit').text(slideNumber + ' / ');
        $('.slider__full-number').text(thumbnailsItem.length);
    });

    $('.left-arrow-last').click(function () {
        scrollSlider(0);

        let currentActive = $('.thumbnails__item.active');
        let prevItem = currentActive.prev('.thumbnails__item');

        if (prevItem.length === 0) {
            prevItem = $('.thumbnails__item:last');
        }

        thumbnailsItem.removeClass('active');
        prevItem.addClass('active');

        // Обновление номера слайда
        let slideNumber = prevItem.attr('number');
        $('.slider__digit').text(slideNumber + ' / ');
        $('.slider__full-number').text(thumbnailsItem.length);
    });

    function updatePopupSlider(currentSlidePopup) {
        namePerson.text(portfolioSliderPagination[currentSlidePopup].persons);
    }


    if ($(window).width() <= 1120) {

        const miniSlider = $('.thumbnails');
        const miniSliderStep = 6;
        const miniSliderWidth = 180;
        let miniSliderCurrent = 0;

        function moveMiniSlider(step) {
            if (step > 0) {
                miniSliderCurrent++;
                if (miniSliderCurrent >= miniSliderStep) {
                    miniSliderCurrent = 0;
                }
            } else {
                miniSliderCurrent--;
                if (miniSliderCurrent < 0) {
                    miniSliderCurrent = miniSliderStep -1;
                }
            }
            miniSlider.css('transform', `translateX(${-miniSliderCurrent * miniSliderWidth}px)`);
        }

        $('.right-arrow-small').click(function () {
            moveMiniSlider(1);
        });

        $('.left-arrow-small').click(function () {
            moveMiniSlider(0);
        });
    }


    // Слайдер в отзывах
    const sliderContainer = $('.slider-img');
    const nameContainer = $('.reviews__name');
    const descriptionContainer = $('.reviews__description');
    const sliderNumber = $('.slider__number');
    const rightArrowReviews = $('.reviews-right');
    const leftArrowReviews = $('.reviews-left');
    let currentSlideReviews = 0;

    const reviewSliders = [
        {
            image: '../images/slider-reviews/images-1.jpg',
            name: 'Ольга и Алексей',
            number: '1 /',
            description: 'Две прекрасные отзывчивые девушки Анастасия и Маргарита помогли найти, сформировать наши желания, а потом и организовать свадьбу мечты. У нас был всего 1 месяц, еще и во время сессии. На свадьбе нам удалось расслабиться и наслаждаться моментом. Место, декор, ведущий всё пело в унисон вместе с нами. Царила атмосфера теплоты, искренности и заводного огонька. Большое спасибо команде'
        },
        {
            image: '../images/slider-reviews/images-2.png',
            name: 'Анна и Николай',
            number: '2 /',
            description: 'Первое агентство с кем начали общение и поняли, что менять ничего не хочется, настолько все было комфортно. Все прошло настолько хорошо, как мы и мечтали) гости довольны, а мы рады взаимодействию с такими профессионалами.'
        },
        {
            image: '../images/slider-reviews/images-3.jpg',
            name: 'Дарья и Кирилл',
            number: '3 /',
            description: 'Хочется выразить огромную благодарность команде! Вы просто супер, была проведена огромная работа и вы все сделали на высшем уровне!! Мы безумно благодарны вам! Я понимаю что подготовка к нашей свадьбе была не из лёгких так как мы живем на другом материке, но вам удалось все организовать и выполнить на высшем уровне, было очень приятно работать с командой профессионалов! Мы очень рады знакомству с Маргаритой и обязательно всем рекомендуем это агенство для организации самых важных для вас праздников! Спасибо вам!'
        },
        {
            image: '../images/slider-reviews/images-4.png',
            name: 'Никита и Екатерина ',
            number: '4 /',
            description: 'С удовольствием хотим сказать огромное спасибо всей команде BestDay. Ребята, благодаря вам, наша свадьба получилась именно такой, какой мы и представляли! Вернее, как только мы к вам обратились, мы не представляли её вообще и не знали с чего начать. С самого начала нашего сотрудничества все было разложено по полочкам, причём не только нам, но и нашим родителям! Все пожелания были учтены. Подготовка прошла душевно, спасибо за ваши ценные советы, за всех рекомендованных вами подрядчиков, за терпение и внимание ко всем деталям! Само мероприятие прошло на высшем уровне, благодаря Насте никакие организационные моменты не отвлекали нас от нашего праздника, которым оставалось только наслаждаться! Не только мы, но и наши гости остались в восторге и до сих пор вспоминают как все прошло! Отдельного спасибо заслуживают фотографии и их автор Сергей! Потрясающий анонс, ждём с нетерпением остальных фото!!! Настя и Сергей, вы занимаетесь самым лучшим делом на свете: дарите улыбки, хорошее настроение и потрясающие праздники! Нам было очень приятно работать с вами! С такой командой и дождь не страшен! Даже его удалось избежать!'
        }
    ];

    rightArrowReviews.click(function () {
        currentSlideReviews++;
        if (currentSlideReviews >= reviewSliders.length) {
            currentSlideReviews = 0;
        }
        updateSlider();
    });

    leftArrowReviews.click(function () {
        currentSlideReviews--;
        if (currentSlideReviews < 0) {
            currentSlideReviews = reviewSliders.length - 1;
        }
        updateSlider();
    });

    $('.reviews__description-link').click(function () {
        descriptionContainer.css('overflow', 'auto');
    })

    function updateSlider() {
        const sliderImage = reviewSliders[currentSlideReviews].image;
        descriptionContainer.css('overflow', 'hidden');

        sliderContainer.attr('src', sliderImage);
        nameContainer.text(reviewSliders[currentSlideReviews].name);
        sliderNumber.text(reviewSliders[currentSlideReviews].number)
        descriptionContainer.css('color', '#FFFFFF').text(reviewSliders[currentSlideReviews].description);
    }

    // Валидация формы "Запишитесь на консультацию"
    $('.on-submit').on('click', function (e) {
        e.preventDefault();

        let hasError = false;

        const name = $('.name');
        const phone = $('.phone');
        const form = $(this).closest('.form');
        const thanks = $('.thanks');
        const formInfo = $('.consultation__form-info');

        phone.keypress(function (event) {
            let number = event.key;
            if (isNaN(number)) {
                event.preventDefault();
            }
        });

        $('.error-input').hide();

        if (!name.val()) {
            name.next().show();
            name.css('border-color', 'red');
            hasError = true;
        } else {
            name.css('border-color', '#FFFFFF');
            name.next().hide();
        }

        if (!phone.val()) {
            phone.next().show();
            phone.css('border-color', 'red');
            hasError = true;
        } else {
            phone.css('border-color', '#FFFFFF');
            phone.next().hide();
        }

        if (!hasError) {
            $.ajax({
                method: 'post',
                url: "http://testologia.ru/checkout",
                data: {name: name.val(), phone: phone.val()}
            })
                .done(function (msg) {
                    if (msg.success === 1) {
                        form.css('display', 'none');
                        formInfo.css('display', 'none');
                        thanks.css('display', 'block');
                        form[0].reset();
                    } else {
                        alert('Возникла ошибка при оформлении заказа, позвоните нам и запишитесь на консультацию');
                    }
                });
        }
        setTimeout(() => {
            thanks.css('display', 'none');
            formInfo.css('display', 'block');
            form.css('display', 'flex');
        }, 5000)
    });

    // Форма в Pop-up
    $('.submit').click(function (e) {
        e.preventDefault();

        let hasErr = false;

        const namePopUp = $('.name-pop-up');
        const phonePopUp = $('.phone-pop-up');
        const formPopUp = $(this).closest('.pop-up__form');
        const thanksPopUp = $('.pop-up__thanks');

        phonePopUp.keypress(function (event) {
            let number = event.key;
            if (isNaN(number)) {
                event.preventDefault();
            }
        });

        $('.error-input').hide();

        if (!namePopUp.val()) {
            namePopUp.next().show();
            namePopUp.css('border-color', 'red');
            hasErr = true;
        } else {
            namePopUp.css('border-color', '#FFFFFF');
            namePopUp.next().hide();
        }

        if (!phonePopUp.val()) {
            phonePopUp.next().show();
            phonePopUp.css('border-color', 'red');
            hasErr = true;
        } else {
            phonePopUp.css('border-color', '#FFFFFF');
            phonePopUp.next().hide();
        }

        if (!hasErr) {
            $.ajax({
                method: 'post',
                url: "http://testologia.ru/checkout",
                data: {name: namePopUp.val(), phone: phonePopUp.val()}
            })
                .done(function (msg) {
                    if (msg.success === 1) {
                        formPopUp.css('display', 'none');
                        thanksPopUp.css('display', 'block');
                        formPopUp[0].reset();
                    } else {
                        alert('Возникла ошибка при оформлении заказа, позвоните нам и запишитесь на консультацию');
                    }
                });
        }
        setTimeout(() => {
            thanksPopUp.css('display', 'none');
            formPopUp.css('display', 'flex');
        }, 5000)

    });
});