$(document).ready(function () {
    const formEndpoint = window.BEST_DAY_FORM_ENDPOINT || '';

    new WOW({
        animateClass: 'animate__animated',
    }).init();

    // Бургер-меню и модальные окна
    const $body = $('body');
    let lastFocusedElement = null;

    function setModalState($modal, isOpen) {
        $modal.css('display', isOpen ? 'flex' : 'none');
        $modal.attr('aria-hidden', String(!isOpen));
        $body.toggleClass('modal-open', isOpen);

        if (isOpen) {
            lastFocusedElement = document.activeElement;
            $modal.find('button, a, input, [tabindex]:not([tabindex="-1"])').first().trigger('focus');
        } else if (lastFocusedElement) {
            $(lastFocusedElement).trigger('focus');
            lastFocusedElement = null;
        }
    }

    function closeAllModals() {
        setModalState($('.burger__menu'), false);
        setModalState($('.pop-up'), false);
        setModalState($('.slider-container'), false);
    }

    $('.burger').on('click', function () {
        const $menu = $('.burger__menu');
        const isOpen = $menu.attr('aria-hidden') !== 'true';
        setModalState($menu, !isOpen);
        $(this).attr('aria-expanded', String(!isOpen));
    });

    $('.burger-menu__close').on('click', function () {
        setModalState($('.burger__menu'), false);
        $('.burger').attr('aria-expanded', 'false').trigger('focus');
    });

    $('.burger__menu .menu__link').on('click', function () {
        setModalState($('.burger__menu'), false);
        $('.burger').attr('aria-expanded', 'false');
    });

    $('.menu__btn').on('click', function () {
        setModalState($('.pop-up'), true);
    });

    $('.pop-up__close').on('click', function () {
        setModalState($('.pop-up'), false);
    });

    $('.pop-up, .slider-container').on('click', function (event) {
        if (event.target === this) {
            setModalState($(this), false);
        }
    });

    $(document).on('keydown', function (event) {
        const $openModal = $('.burger__menu:visible, .pop-up:visible, .slider-container:visible').last();

        if (!$openModal.length) {
            return;
        }

        if (event.key === 'Escape') {
            closeAllModals();
            $('.burger').attr('aria-expanded', 'false');
            return;
        }

        if (event.key === 'Tab') {
            const $focusable = $openModal.find('button, a, input, [tabindex]:not([tabindex="-1"])').filter(':visible:not(:disabled)');
            if (!$focusable.length) {
                return;
            }

            const first = $focusable[0];
            const last = $focusable[$focusable.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }
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
    const portfolioSliderStep = portfolioSlider.children().length;
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

        const slideWidth = portfolioSlider.children().first().outerWidth(true) || 0;
        portfolioSlider.css('transform', 'translateX(' + (-currentSlidePortfolio * slideWidth) + 'px)');
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
        currentSlidePopup = $(this).index();
        updatePopupSlider(currentSlidePopup);
        updatePopupCounter();
        setModalState($('.slider-container'), true);
    });

    $('.pop-up-slider__close').on('click', function () {
        setModalState($('.slider-container'), false);
    })


    // Поп-ап "Наши молодожены"
    const popupSlider = $('.big-container');
    const namePerson = $('.name__person');
    const thumbnailsItem = $('.thumbnails__item')
    const popupSliderStep = popupSlider.children().length;
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

        const slideWidth = popupSlider.children().first().outerWidth(true) || 0;
        popupSlider.css('transform', 'translateX(' + (-currentSlidePopup * slideWidth) + 'px)');
        updatePopupCounter();
    }

    function updatePopupCounter() {
        const $active = thumbnailsItem.eq(currentSlidePopup);
        thumbnailsItem.removeClass('active');
        $active.addClass('active');
        $('.slider__digit').text((currentSlidePopup + 1) + ' / ');
        $('.slider__full-number').text(thumbnailsItem.length);
        updatePopupSlider(currentSlidePopup);
    }

    $('.right-arrow-last').on('click', function () {
        scrollSlider(1);
    });

    $('.left-arrow-last').on('click', function () {
        scrollSlider(0);
    });

    function updatePopupSlider(currentSlidePopup) {
        const slide = portfolioSliderPagination[currentSlidePopup];
        if (slide) {
            namePerson.text(slide.persons);
        }
    }


    if ($(window).width() <= 1120) {

        const miniSlider = $('.thumbnails');
        const miniSliderStep = miniSlider.children().length;
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
            const thumbnailWidth = miniSlider.children().first().outerWidth(true) || 0;
            miniSlider.css('transform', 'translateX(' + (-miniSliderCurrent * thumbnailWidth) + 'px)');
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

    // Валидация и отправка форм
    function validateForm($form, nameSelector, phoneSelector, errorSelector) {
        const $name = $form.find(nameSelector);
        const $phone = $form.find(phoneSelector);
        let hasError = false;

        $form.find(errorSelector).hide();
        $name.removeAttr('aria-invalid').css('border-color', '#FFFFFF');
        $phone.removeAttr('aria-invalid').css('border-color', '#FFFFFF');

        if (!$name.val().trim()) {
            $name.attr('aria-invalid', 'true').css('border-color', 'red');
            $name.next(errorSelector).show();
            hasError = true;
        }

        const phoneValue = $phone.val().trim();
        const phoneDigits = phoneValue.replace(/\D/g, '');

        if (!phoneValue) {
            $phone.attr('aria-invalid', 'true').css('border-color', 'red');
            $phone.next(errorSelector).text('Введите ваш телефон').show();
            hasError = true;
        } else if (phoneDigits.length < 7) {
            $phone.attr('aria-invalid', 'true').css('border-color', 'red');
            $phone.next(errorSelector).text('Введите корректный телефон').show();
            hasError = true;
        }

        return hasError;
    }

    function submitForm($form, $button, selectors) {
        if (validateForm($form, selectors.name, selectors.phone, selectors.error)) {
            return;
        }

        if (!formEndpoint) {
            const $status = $form.find('.form-request-error');

            if ($status.length) {
                $status.text('Форма пока не подключена к рабочему каналу отправки. Пожалуйста, свяжитесь с нами по телефону.');
            } else {
                $('<div class="form-request-error" role="alert">Форма пока не подключена к рабочему каналу отправки. Пожалуйста, свяжитесь с нами по телефону.</div>').insertAfter($button);
            }

            return;
        }

        $button.prop('disabled', true).attr('aria-busy', 'true');

        $.ajax({
            method: 'post',
            url: formEndpoint,
            data: {
                name: $form.find(selectors.name).val().trim(),
                phone: $form.find(selectors.phone).val().trim()
            }
        })
            .done(function (msg) {
                if (msg && msg.success === 1) {
                    $form.hide();
                    $form.siblings(selectors.thanks).show();
                    $form[0].reset();
                    window.setTimeout(function () {
                        $form.siblings(selectors.thanks).hide();
                        $form.css('display', 'flex');
                    }, 5000);
                } else {
                    alert('Не удалось отправить заявку. Пожалуйста, попробуйте ещё раз или свяжитесь с нами по телефону.');
                }
            })
            .fail(function () {
                alert('Не удалось отправить заявку из-за ошибки соединения. Пожалуйста, попробуйте ещё раз или свяжитесь с нами по телефону.');
            })
            .always(function () {
                $button.prop('disabled', false).removeAttr('aria-busy');
            });
    }

    $('.consultation__form').on('submit', function (event) {
        event.preventDefault();
        submitForm($(this), $(this).find('.on-submit'), {
            name: '.name',
            phone: '.phone',
            error: '.error-input',
            thanks: '.thanks'
        });
    });

    $('.pop-up__form').on('submit', function (event) {
        event.preventDefault();
        submitForm($(this), $(this).find('.submit'), {
            name: '.name-pop-up',
            phone: '.phone-pop-up',
            error: '.error-input-popup',
            thanks: '.pop-up__thanks'
        });
    });

    $('.portfolio__right, .portfolio__left, .right-arrow-last, .left-arrow-last, .right-arrow-small, .left-arrow-small, .right-arrow, .left-arrow, .right-arrow-big, .left-arrow-big').each(function () {
        const $control = $(this);
        let label = 'Переключить слайд';

        if ($control.hasClass('left-arrow') || $control.hasClass('left-arrow-big')) {
            label = 'Предыдущий слайд';
        }

        if ($control.hasClass('right-arrow') || $control.hasClass('right-arrow-big')) {
            label = 'Следующий слайд';
        }

        $control.attr({
            role: 'button',
            tabindex: '0',
            'aria-label': label
        });
    });

    $(document).on('keydown', '[role="button"]', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            $(this).trigger('click');
        }
    });
});
